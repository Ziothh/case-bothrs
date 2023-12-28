import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AppConfig, tRPC } from "../modules";

export default tRPC.router({
  getOne: tRPC.procedure.public
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.db.tip.findFirst({
      where: input,
    })),
  getAll: tRPC.procedure.public
    .query(({ ctx }) => ctx.db.tip.findMany({ include: { category: true } })),
  search: tRPC.procedure.public
    .input(z.object({
      search: z.string().transform(str => str === '' ? null : str).nullable(),
      timeSpan: z.enum(['year', 'month', 'week', 'day'])
    }))
    .query(async ({ ctx, input }) => {
      const searchParts = input.search?.split(' ').map(x => x.toLowerCase()) ?? null;

      let date = new Date(Date.now());


      switch (input.timeSpan) {
        case "year":
          date.setFullYear(
            date.getFullYear() - 1,
            date.getMonth(),
            date.getDate()
          );
          break;
        case "month":
          date.setMonth(
            date.getMonth() === 0
              ? 11
              : date.getMonth() - 1
          );
          break;
        case "week":
          const day = date.getDate()

          if (day - 7 < 0) {
            date.setMonth(
              date.getMonth() === 0
                ? 11
                : date.getMonth() - 1,
              30 - 7
            );
          } else {
            date.setDate(day - 7);
          }

          break;
        case "day":
          const d = date.getDate()
          if (d - 1 < 0) {
            date.setMonth(
              date.getMonth() === 0
                ? 11
                : date.getMonth() - 1,
              30 - 1
            );
          } else {
            date.setDate(d - 1);
          }
          break;
      }

      return ctx.db.tip
        .findMany({
          where: {
            createdAt: { gte: date }
          },
          include: { category: true }
        })
        .then(
          x => searchParts === null
            ? x
            : x.map(tip => {
              const searchStr = [
                tip.title,
                tip.text,
                tip.category?.name ?? '',
              ].join(' ').toLowerCase();

              return {
                tip,
                matches: searchParts.reduce(
                  (acc, part) => acc + (searchStr.includes(part) ? 1 : 0),
                  0
                )
              }
            })
              .filter(x => x.matches !== 0)
              .sort((a, b) => a.matches - b.matches)
              .map(x => x.tip)
        );
    }),
  insert: tRPC.procedure.retool
    .input(z.object({
      title: z.string(),
      text: z.string(),
      categoryId: z.string().nullish(),
      imageUrl: z.union([
        z.string().url(),
        z.string().startsWith('/')
      ]),
      externalLink: z.string().url().nullish(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.db.tip.create({
        data: input
      });
    }),
  categories: tRPC.router({
    getAll: tRPC.procedure.retool
      .query(({ ctx }) => ctx.db.tipCategory.findMany()),
  }),

  tipOfDay: tRPC.router({
    set: tRPC.procedure.retool
      .input(z.object({ tipID: z.string().nullable() }))
      .mutation(async ({ ctx, input }) => {
        if (input.tipID !== null) {
          const tip = await ctx.db.tip.findFirst({ where: { id: input.tipID } });

          if (tip === null) throw new TRPCError({
            message: `Tip with id "${input.tipID}" does not exist.`,
            code: 'NOT_FOUND',
            cause: 'input.tipID'
          });
        }

        const data = await AppConfig.set('tip.tipOfTheDay', input.tipID);

        return {
          ok: true,
          data,
        };
      }),
    get: tRPC.procedure.public
      .query(async ({ ctx }) => {
        const config = await AppConfig.getValidated(
          'tip.tipOfTheDay',
          z.string().min(1).nullable(),
        );

        if (!config.ok) throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: config.errorKind === 'ZOD_ERROR'
            ? config.error.toString()
            : (config.error?.toString?.() ?? JSON.stringify(config.error))
        });
        if (config.value === null) return null;

        return await ctx.db.tip.findFirst({
          where: { id: config.value }
        });
      }),
  }),
});

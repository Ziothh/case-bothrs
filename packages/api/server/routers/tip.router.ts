import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AppConfig, tRPC } from "../modules";

export default tRPC.router({
  getAll: tRPC.procedure.public
    .query(({ ctx }) => ctx.db.tip.findMany({ include: { category: true }})),
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
      .query(({ ctx }) => ctx.db.tipCategory.findMany())
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

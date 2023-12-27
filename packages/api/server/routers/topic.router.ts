import { z } from "zod";
import { tRPC } from "../modules";

export default tRPC.router({
  create: tRPC.procedure.public
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return null
    }),

  getLatest: tRPC.procedure.public.query(({ ctx }) => {
    const oneWeekBefore = 1000 * 60 * 60 * 24;
    const minDate = new Date(Date.now() - oneWeekBefore);

    return ctx.db.topic.findMany({
      where: { createdAt: { gt: minDate }},
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }),
});

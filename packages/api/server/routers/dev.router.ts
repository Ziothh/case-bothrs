import { tRPC } from "../modules";

export default tRPC.router({
  hello: tRPC.procedure.dev
  .query(() => "Hello World"),
  seedTopics: tRPC.procedure.dev
  .query(async ({ ctx }) => {
    // if ((await ctx.db.topic.count()) === 0) {
    //   return { ok: false };
    // }
    //
    return false;
    // const user = await ctx.db.user.findFirstOrThrow();
    //
    // const SEED_DATA = {
    //   title: 'My MG experience',
    //   text: 'This is a sharing about my recovery from Myasthenia Gravis (MG). This disease started initially from my jaw. When I ate or chew something, I would feel tired soon and then had to stop chewing because I had no strength to do it...',
    //   userId: user.id,
    // } satisfies Partial<Topic>;
    //
    //
    // return ctx.db.topic.createMany({
    //   data: (new Array(5).fill(SEED_DATA) as Array<typeof SEED_DATA>)
    // });
  })
});

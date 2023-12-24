import { tRPC } from "../modules";

const userRouter = tRPC.router({
  getAll: tRPC.procedure.retool
    .query(({ ctx }) => ctx.db.user.findMany())
});

export default userRouter;

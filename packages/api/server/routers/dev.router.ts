import { tRPC } from "../modules";

export default tRPC.router({
  hello: tRPC.procedure.dev
  .query(() => "Hello World"),
});

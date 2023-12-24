import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { tRPC } from '../modules';
import tipRouter from './tip.router';
import topicRouter from './topic.router';
import userRouter from './user.router';
import devRouter from './dev.router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const API_ROUTER = tRPC.router({
  topic: topicRouter,
  user: userRouter,
  tip: tipRouter,
  /** DEV-only procedures */
  dev: devRouter,
  hello: tRPC.procedure.public
    .query(() => 'Hello world!'),
  health: tRPC.procedure.public
    .query(() => ({
      ok: true,
    })),
});



/** Types and utilities related to the `API_ROUTER` */
export namespace APIRouter {
  export type Type = typeof API_ROUTER;

  /**
   * Inference helper for inputs.
   *
   * @example type HelloInput = RouterInputs['example']['hello']
   */
  export type Inputs = inferRouterInputs<APIRouter.Type>;

  /**
   * Inference helper for outputs.
   *
   * @example type HelloOutput = RouterOutputs['example']['hello']
   */
  export type Outputs = inferRouterOutputs<APIRouter.Type>;
}

/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "./db";
import env from "./env";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
  req: CreateNextContextOptions['req']
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    ...opts,
    db,
  } as const;
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * NOTE: should only be used when creating handlers, etc.
 *
 * @see https://trpc.io/docs/context
 */
export const _createContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({
    req: opts.req,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof _createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

export const procedure = {
  /**
   * Public (unauthenticated) procedure
   *
   * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
   * guarantee that a user querying is authorized, but you can still access user session data if they
   * are logged in.
   */
  public: t.procedure,
  /** Ensures that the request is only allowed to come from Retool */
  retool: t.procedure.use(({ ctx, meta, next }) => {
    // TODO: validate if it is a request from Retool
    // Ensure your resource has allow-listed all IPs in this CIDR range: 3.77.79.248/30 
    
    return next({
      ctx: {
        ...ctx,
        /** Set to true if the request is comming from Retool */
        isRetool: true
      } as const
    });
  }),
  dev: t.procedure.use(({ ctx, next }) => {
    if (env.NODE_ENV !== 'development') throw new TRPCError({
      code: 'UNAUTHORIZED',
      cause: 'NODE_ENV',
      message: 'This procedure is only allowed to be called in development',
    });

    return next({ ctx });
  }),
} as const;

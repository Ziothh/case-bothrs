import { createNextApiHandler } from "@trpc/server/adapters/next";
import { API_ROUTER } from "./routers";
import { env, tRPC } from "./modules";

export namespace APIHandlers {
  /** Creates a Next.js API endpoint handler */
  export const createNextAPI = () => createNextApiHandler({
    router: API_ROUTER,
    createContext: tRPC._createContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
        : undefined,
  });

}


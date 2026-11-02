// TanStack Start server-route option types.
// The `server` handlers block is declared by @tanstack/start-client-core via
// module augmentation, but that augmentation does not merge into the program
// under the project's TypeScript setup, so we re-declare it here. Types are
// imported from the same package, so handler context (request/params) stays
// fully typed. Remove this file if a future version bump fixes the merge.
import type { AnyContext, AnyRoute } from "@tanstack/router-core";
import type { RouteServerOptions } from "@tanstack/start-client-core";

declare module "@tanstack/router-core" {
  interface FilebaseRouteOptionsInterface<
    TRegister,
    TParentRoute extends AnyRoute = AnyRoute,
    TId extends string = string,
    TPath extends string = string,
    TSearchValidator = undefined,
    TParams = {},
    TLoaderDeps extends Record<string, any> = {},
    TLoaderFn = undefined,
    TRouterContext = {},
    TRouteContextFn = AnyContext,
    TBeforeLoadFn = AnyContext,
    TRemountDepsFn = AnyContext,
    TSSR = unknown,
    TServerMiddlewares = unknown,
    THandlers = undefined,
  > {
    server?: RouteServerOptions<
      TRegister,
      TParentRoute,
      TPath,
      TParams,
      TLoaderDeps,
      TLoaderFn,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TServerMiddlewares,
      THandlers
    >;
  }
}

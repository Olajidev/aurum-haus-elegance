# Project Notes

Server routes (`src/routes/api/**`, `sitemap[.]xml.ts`) rely on `src/tanstack-server-route.d.ts`: the `server` handlers option is re-declared there because @tanstack/start-client-core's own module augmentation does not merge into the program under this TypeScript setup; remove the file only when a version bump fixes the merge.

## Build tooling
- Keep `@tanstack/react-start` on the `^1.168.57` line. `@lovable.dev/vite-tanstack-config` (the harness's build wrapper) is built against it; newer versions (1.169+) silently skip the Start vite plugin and the build fails with `Could not resolve entry module "index.html"`. Bump it only together with a `@lovable.dev/vite-tanstack-config` upgrade.
- Server functions use `.validator()` (`.inputValidator` no longer exists on the installed `ServerFnBuilder`).
- `errorComponent` handlers must type `error` as `unknown` (TanStack Router's `ErrorComponentProps.error` is `unknown`).

# Project Notes

## Build tooling
- Keep `@tanstack/react-start` on the `^1.168.57` line. `@lovable.dev/vite-tanstack-config` (the harness's build wrapper) is built against it; newer versions (1.169+) silently skip the Start vite plugin and the build fails with `Could not resolve entry module "index.html"`. Bump it only together with a `@lovable.dev/vite-tanstack-config` upgrade.
- Server functions use `.validator()` (`.inputValidator` no longer exists on the installed `ServerFnBuilder`).
- `errorComponent` handlers must type `error` as `unknown` (TanStack Router's `ErrorComponentProps.error` is `unknown`).

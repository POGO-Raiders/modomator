# Modomator

Small React app for composing Pokémon Showdown moderation messages (warn / mute / kick / ban) and copying them to the clipboard.

## Scripts

| Command                                | Purpose                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `npm start`                            | Vite dev server — open **[http://localhost:3000/modomator/](http://localhost:3000/modomator/)** (subpath matches production) |
| `npm test`                             | Vitest in watch mode                                                                                                         |
| `npm run test:ci`                      | Vitest once (CI / pre-push)                                                                                                  |
| `npm run lint`                         | ESLint across all source files                                                                                               |
| `npm run format`                       | Prettier — rewrite all files in place                                                                                        |
| `npm run format:check`                 | Prettier — check formatting without writing (used in CI)                                                                     |
| `npm run build`                        | Production bundle in `build/` (Vite)                                                                                         |
| `npm run preview`                      | Preview production build locally                                                                                             |
| `npm run predeploy` / `npm run deploy` | Build and publish to GitHub Pages (`homepage` in `package.json`)                                                             |
| `npm run ftpDeploy`                    | Upload `build/` to the configured FTP server (`DeployToFtp.mjs`)                                                             |

## Layout

- `src/moderation/` — domain types, maps, preview text, clipboard helpers
- `src/hooks/` — moderation preview and form-related hooks
  - `useLocalStorage.ts` — internal typed hook replacing the removed `use-local-storage` package
  - `useModerationFormPreview.ts` — derives preview state from a single `Form.useWatch([], form)` call
  - `useModFormClear.ts` — resets the form while re-applying URL id and defaults

The app is hosted under a subpath (`basename` / `homepage`). Local dev typically uses `/`; production matches the GitHub Pages URL.

## TypeScript

Unit tests live next to sources as `*.test.ts` / `*.test.tsx`. `tsconfig.json` excludes `**/*.spec.ts` so Playwright-style spec files are not pulled into the main TS project by mistake.

## Notable removals / replacements

- **`web-vitals`** removed — `reportWebVitals` was a no-op (no callback passed); the dependency and the file have been deleted.
- **`use-local-storage`** replaced — the external package has been replaced by `src/hooks/useLocalStorage.ts`, a tiny internal hook with the same `[T, setter]` API, cross-tab sync via `StorageEvent`, and malformed-JSON resilience.
- **`DeployToFtp.js`** converted to `DeployToFtp.mjs` — the CommonJS deploy script was rewritten as ESM to match the rest of the project.

## Before upgrading dependencies

Run this checklist before bumping any major versions (React, Vite, Vitest, Router, TS):

- [ ] `npm run lint` — zero errors
- [ ] `npm run format:check` — no formatting drift
- [ ] `npm run test:ci` — all tests green
- [ ] `npm run build` — build succeeds with no TS errors
- [ ] Manual smoke test: open the app, copy a Warning and a Ban in both dark and light mode, verify the text is correct and Discord opens (if enabled)

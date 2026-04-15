# Modomator

Small React app for composing Pokémon Showdown moderation messages (warn / mute / kick / ban) and copying them to the clipboard.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm start` | Vite dev server — open **[http://localhost:3000/modomator/](http://localhost:3000/modomator/)** (subpath matches production) |
| `npm test` | Vitest in watch mode |
| `npm run test:ci` | Vitest once (CI / pre-push) |
| `npm run build` | Production bundle in `build/` (Vite) |
| `npm run preview` | Preview production build locally |
| `npm run predeploy` / `npm run deploy` | Build and publish to GitHub Pages (`homepage` in `package.json`) |

## Layout

- `src/moderation/` — domain types, maps, preview text, clipboard helpers
- `src/hooks/` — moderation preview and form-related hooks

The app is hosted under a subpath (`basename` / `homepage`). Local dev typically uses `/`; production matches the GitHub Pages URL.

## TypeScript

Unit tests live next to sources as `*.test.ts` / `*.test.tsx`. `tsconfig.json` excludes `**/*.spec.ts` so Playwright-style spec files are not pulled into the main TS project by mistake.

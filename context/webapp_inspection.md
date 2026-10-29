# WebApp inspection notes

## Project inspected

- App location: `WebApp/` (separate from the Next.js files at the workspace root).
- Structure: Bun workspace/monorepo with the web app in `WebApp/apps/web/`.
- Stack: React 19, React Router 8 (SSR enabled), Vite 8, TypeScript, and Tailwind CSS.
- Main routes: `/`, `/partijos/:partyId`, `/pazadai`, and `/pazadai/:promiseId`; also includes health/API, sitemap, robots, and not-found routes.
- The main content is currently local data in `WebApp/apps/web/src/data/politten.ts`: 9 party entries and 36 generated promise examples, marked `fictional: true` in the data.
- The app's dev server is configured for port 3000. Its web package loads `WebApp/apps/web/.env` if present; do not copy its values into notes.
- There is no README in `WebApp/` and no existing workspace `context/` directory at inspection time.

## Start the web app locally

From the `WebApp/` directory, install dependencies and start the development server:

```sh
bun install
bun run dev
```

Then open <http://localhost:3000>. The root `dev` script delegates to `npm run dev --prefix apps/web`.

If Bun is unavailable, use Node/npm from `WebApp/` instead:

```sh
npm install --no-package-lock
npm run dev
```

The npm install command uses the workspace manifests and avoids creating an npm lockfile alongside `bun.lock`.

## Workspace and chat context

- This chat requested inspection only (no WebApp source/config changes), a context folder for retaining chat findings, and local startup instructions.
- No new feature-scope decisions were made in this chat.
- Existing remembered convention points Politten v1 feature-list decisions to `context/v1_feature_list.md`; that file was not present during this inspection, so no feature list was reconstructed or assumed.
- At inspection time, Git showed tracked files at the workspace root (including the earlier Next.js app) as deleted, while `WebApp/` and root `node_modules/` / `.next/` were untracked. These appeared before this note was created; preserve and review that existing state separately.

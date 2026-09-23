# Repository Guidelines

## Project Structure & Module Organization

This repository contains two applications:

- `Frontend/` is a Next.js App Router client. Routes live in `src/app/`, reusable UI in `src/components/`, state and RTK Query services in `src/redux/`, shared types in `src/types/`, and static assets in `public/`.
- `Backend/` is an Express API. Keep HTTP wiring in `src/routes/`, request logic in `src/controllers/`, Mongoose schemas in `src/models/`, and cross-cutting logic in `src/middleware/`. Uploaded product images are served from `uploads/product/`.

Use the `#/*` alias for frontend imports from `Frontend/src/`. Keep feature-specific code near its route.

## Build, Test, and Development Commands

Run `npm install` in both application directories, then start them in separate terminals:

```bash
cd Backend && npm run dev     # Express API; defaults to port 5000
cd Frontend && npm run dev    # Next.js development server on port 3000
```

From `Frontend/`, use `npm run lint` for ESLint, `npm run build` for a production build, and `npm start` to serve it. Backend `npm test` is a placeholder that exits with an error.

## Coding Style & Naming Conventions

Frontend code uses strict TypeScript, two-space indentation, semicolons, and functional components. Name component files in PascalCase (`ProductCard.tsx`), hooks with `use...`, and Redux modules with a `Slice` or `Api` suffix. Backend ES modules use names such as `product.controller.js`, `product.model.js`, and `product.routes.js`. Follow nearby style when editing legacy JavaScript. ESLint extends `next/core-web-vitals` and `next/typescript`.

## Testing Guidelines

No automated tests or coverage threshold are configured. Before opening a PR, run frontend lint and build, then manually exercise the changed UI and API flow with both services running. If adding tests, colocate frontend tests as `*.test.ts(x)` and place backend integration tests under `Backend/tests/`; add the corresponding runnable script to `package.json`.

## Commit & Pull Request Guidelines

History currently mixes free-form Vietnamese/English messages with occasional Conventional Commits. Use concise English Conventional Commits going forward, for example `feat(cart): add quantity validation` or `fix(api): reject invalid order ids`. Keep each commit focused.

PRs should explain the change and motivation, list verification commands and manual checks, link relevant issues, and include screenshots for visible UI changes. Call out schema, API contract, or environment-variable changes explicitly.

## Security & Configuration

Copy each `.env.example` to a local `.env` and never commit MongoDB, JWT, or Firebase credentials. Keep `NEXT_PUBLIC_API_URL` aligned with the backend and review CORS origins when adding deployment environments.

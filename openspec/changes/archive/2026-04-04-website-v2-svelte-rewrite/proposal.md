## Why

The current site is a plain HTML/CSS/JS static site built on jQuery 1.9.1 and Bootstrap 4 with all libraries vendored — it has no build tooling, no tests, no type safety, and no automated dependency management beyond GitHub Actions versions. Rebuilding in SvelteKit with modern tooling brings a maintainable, testable, type-safe codebase with a proper dev/build pipeline, while preserving all existing Polish-language content and improving the visual style.

## What Changes

- **BREAKING**: Replace entire `src/` directory (plain HTML/CSS/JS) with a SvelteKit application
- **BREAKING**: Remove vendored jQuery, Bootstrap 4, Slick, Magnific Popup, Easing, SinglePageNav — all replaced by native Svelte 5 + Tailwind CSS v4
- **BREAKING**: Remove embedded Google Maps iframe from the contact section (map removed per requirement)
- Introduce `pnpm` as the package manager (no `npm` or `yarn`)
- Introduce `vite` (via SvelteKit) as the build tool with TypeScript support
- Modernise visual style: Tailwind CSS v4 with `@theme` design tokens, scroll-snap layout, glass card components, dark mode support — keeping the same section structure and Polish text content
- Add unit tests via Vitest + Testing Library
- Update `Dockerfile` to use a multi-stage build: `node` build stage → `nginxinc/nginx-unprivileged` serve stage
- Update `docker-compose.yaml` / `docker-compose.dev.yaml` for the new build
- Configure Renovate to manage npm/pnpm dependencies with automerge for patch/minor updates
- Enforce TypeScript throughout — no `any`, `strict: true`
- Add ESLint (with Svelte + TypeScript plugins) and Prettier for consistent code style

## Capabilities

### New Capabilities

- `svelte-app`: The SvelteKit application — single-route layout with scroll-snap sections, all page components (split into `sections/` and `ui/` subdirectories), TypeScript config (`strict: true`), Vite config, pnpm workspace. Legal acts served via a native `<dialog>` (no separate `/akty` route).
- `design-system`: Tailwind CSS v4 with `@theme` design tokens, global CSS classes (`.snap-root`, `.snap-section`, `.inner-scroll`, `.glass-card`), typography (Raleway + Inter), dark mode via `prefers-color-scheme`, responsive mobile-first layout
- `code-quality`: ESLint flat config (svelte + typescript plugins), Prettier config (tabs, singleQuote, no trailing commas), `.editorconfig`, shared lint/format scripts in `package.json`
- `unit-tests`: Vitest setup, component unit tests for shared UI components
- `renovate-config`: Updated `renovate.json` extending `config:recommended` with automerge for patch/minor updates

### Modified Capabilities

_(none — no existing openspec specs to modify)_

## Impact

- **Deleted**: `src/index.html`, `src/akty.html`, `src/css/`, `src/js/`, `src/fontawesome-free-6.1.1-web/`, `src/slick/`, `src/magnific-popup/`
- **Kept**: `src/img/` — all images reused as static assets in `static/img/`
- **Modified**: `Dockerfile` — multi-stage build added
- **Modified**: `docker-compose.yaml`, `docker-compose.dev.yaml` — updated for new build context
- **Modified**: `nginx.conf` — adjusted for SvelteKit static adapter output
- **Modified**: `renovate.json` — extended for npm/pnpm ecosystem with automerge
- **New**: `package.json`, `pnpm-lock.yaml`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `.editorconfig`, `src/app.css`, `src/app.html`, `src/routes/+layout.svelte`, `src/routes/+layout.ts`, `src/routes/+page.svelte`, `src/lib/components/sections/*.svelte`, `src/lib/components/ui/*.svelte`, `src/lib/sections.ts`, `src/setupTests.ts`
- **Dependencies (production)**: none (SvelteKit adapter-static output is pure static HTML/CSS/JS)
- **Dependencies (dev)**: `@sveltejs/kit`, `@sveltejs/adapter-static`, `svelte`, `vite`, `typescript`, `tailwindcss`, `@tailwindcss/vite`, `lucide-svelte`, `vitest`, `@testing-library/svelte`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`, `eslint`, `prettier`, `eslint-plugin-svelte`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `globals`, `svelte-check`, `prettier-plugin-svelte`
- **No external API changes** — contact details, phone, email, address remain identical
- **SEO**: all section `id` anchors preserved; `<title>` and `<meta>` tags reproduced; Polish `lang="pl"` retained

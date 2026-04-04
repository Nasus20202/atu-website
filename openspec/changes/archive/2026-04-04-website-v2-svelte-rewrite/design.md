## Context

The current site (`src/`) is a zero-build, zero-dependency-management plain HTML/CSS/JS site using jQuery 1.9.1, Bootstrap 4, and a collection of vendored jQuery plugins. It has no tests, no TypeScript, no linting, and no automated dependency management beyond GitHub Actions versions.

The goal is a complete rewrite as a SvelteKit static site, served identically via nginx on Docker, retaining all Polish text content and images, while introducing modern tooling.

**Constraints:**

- Package manager: `pnpm` exclusively (no npm/yarn scripts)
- TypeScript `strict: true` throughout — no `any`
- All formatting enforced by Prettier; all lint by ESLint
- Map removed from contact section
- Images in `src/img/` are reused as-is

---

## Goals / Non-Goals

**Goals:**

- Modern SvelteKit 2 + Svelte 5 static site with TypeScript strict mode
- Consistent code style enforced by ESLint + Prettier
- Unit tests via Vitest + Testing Library
- Renovate managing npm/pnpm packages
- Responsive, modern visual style (Tailwind v4 with custom design tokens, no Bootstrap)
- All CI checks (lint, type-check, unit tests) gate Docker publish

**Non-Goals:**

- Server-side rendering or server routes (adapter-static only)
- CMS integration or dynamic content
- i18n framework (site is Polish-only)
- CSS preprocessors (Sass/SCSS)
- Component library (no shadcn, no Skeleton, no Flowbite) — bespoke styles only
- Monorepo / multiple packages
- E2E tests (Playwright)
- Automated semantic versioning / changelogen
- Dedicated `/akty` route (legal acts served via a native `<dialog>` instead)

---

## Decisions

### 1. Framework: SvelteKit 2 + Svelte 5 with `@sveltejs/adapter-static`

**Chosen**: SvelteKit 2 / Svelte 5 / `@sveltejs/adapter-static`

**Rationale**: SvelteKit with the static adapter produces pure HTML/CSS/JS at build time — identical runtime characteristics to the current site, same nginx serving strategy. Svelte 5 ships with runes (`$state`, `$props`, `$derived`) which are used throughout for reactivity. The adapter-static output drops into the existing Dockerfile pattern seamlessly.

**Alternatives considered**:

- Astro: Good static-site fit, but Svelte component support is secondary; adds complexity.
- Next.js: React ecosystem, heavier runtime, overkill for a static brochure site.
- Plain Vite (no framework): Loses SvelteKit routing, layouts, and SSG benefits.

### 2. Package manager: pnpm

**Chosen**: pnpm (enforced via `engines` field in `package.json` and `.npmrc` with `engine-strict=true`)

**Rationale**: pnpm provides strict dependency isolation, disk efficiency, and deterministic installs. Prevents accidental `npm`/`yarn` use.

### 3. TypeScript: strict mode

**Chosen**: TypeScript with `strict: true`, `allowJs`, `checkJs`, `moduleResolution: bundler`

**Config**: Single `tsconfig.json` at root extending `.svelte-kit/tsconfig.json`. `svelte-check` runs via `pnpm check`.

**Rationale**: Strict TypeScript catches bugs at compile time. Given the codebase is written from scratch, there is no legacy `any` debt.

### 4. Linting: ESLint 10 + eslint-plugin-svelte + @typescript-eslint

**Chosen**: ESLint 10 with flat config (`eslint.config.js`)

- `eslint-plugin-svelte` — Svelte-specific rules
- `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser`
- `globals` for browser/node environment declarations
- Unused variables flagged as errors; names prefixed with `_` are exempt

**CI**: `pnpm lint` (runs `eslint src`) fails the build if any violations exist.

### 5. Formatting: Prettier 3

**Chosen**: Prettier 3 with `prettier-plugin-svelte`

**Config** (`.prettierrc`):

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

**`.editorconfig`** enforces tab indentation (space for JSON/YAML/MD) for editors without Prettier integration.

### 6. Visual design: Tailwind CSS v4 with @theme tokens

**Chosen**: Tailwind CSS v4 via `@tailwindcss/vite`, tokens declared in `@theme` block in `app.css`.

**Rationale**: Tailwind v4's `@theme` block lets us define custom properties that Tailwind generates utility classes from automatically — best of both worlds (design tokens as CSS variables + Tailwind utilities). Bootstrap 4 is removed entirely.

**Key design tokens** (defined in `@theme` in `app.css`):

- `--color-primary`: `#2a6496` (dark mode: `#4a9fd4`)
- `--color-primary-hover`: `#3a85c5`
- `--color-accent`: `#1a4a70`
- `--color-bg`: `#ffffff` (dark mode: `#0f1923`)
- `--color-bg-alt`: `#f4f7fa` (dark mode: `#16232f`)
- `--color-text`: `#3a3a3a` (dark mode: `#d4dde8`)
- `--color-text-muted`: `#6b7280` (dark mode: `#8fa3b8`)
- `--color-text-on-dark`: `#f0f4f8`
- `--color-heading`: `#1e3a5f` (dark mode: `#a8c8e8`)
- `--font-body`: `'Inter', system-ui, sans-serif`
- `--font-heading`: `'Raleway', 'Inter', system-ui, sans-serif`
- `--radius-sm/md/lg`: `4px / 8px / 16px`
- `--z-bg/snap/nav/dialog`: `0 / 1 / 1000 / 9000`

**Dark mode**: `prefers-color-scheme: dark` media query overrides colour tokens on `:root`. No class-based toggle.

**Layout pattern**: Full-page scroll-snap (`scroll-snap-type: y mandatory`) on a `.snap-root` fixed container. Each section is a `.snap-section` with `height: 100dvh`. Sections with tall content use an `.inner-scroll` wrapper for internal scrolling.

**Glass card**: Sections overlaid on background images use `.glass-card` (backdrop-filter blur, semi-transparent background, rounded border).

**Responsive**: Mobile-first via Tailwind responsive prefixes. Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px (Tailwind defaults).

### 7. Component architecture

**Structure**: Components split into two subdirectories:

- `src/lib/components/sections/` — page section components (`HeroSection`, `ManagementSection`, `AboutSection`, `OfferSection`, `CredentialsSection`, `ContactSection`, `LegalActsDialog`)
- `src/lib/components/ui/` — shared UI primitives (`NavBar`, `BackgroundLayer`, `BulletItem`, `GhostButton`, `SectionLabel`, `SectionLink`, `SectionNav`)

**Single route**: All content on `/` via scroll-snap. Legal acts presented in a `LegalActsDialog` (native `<dialog>`) rather than a separate `/akty` route.

**Section navigation**: `src/lib/sections.ts` provides a shared section list, `scrollToSection` helper, and `createSectionObserver` factory (Intersection Observer). The navbar uses these to track active section and update the URL hash.

**Navbar scroll detection**: Tracks scroll on the `.snap-root` container (not `window`), since the page body itself doesn't scroll.

### 8. Icon library: lucide-svelte

**Chosen**: `lucide-svelte` — tree-shakeable, Svelte-native SVG icons.

**Replaces**: Vendored Font Awesome 6 (removed entirely).

### 9. Credentials lightbox

**Chosen**: Native `<dialog>` element with animated open/close (CSS opacity transition via `requestAnimationFrame`). Clicking the backdrop also closes the dialog.

**Hover effect**: CSS/Tailwind `group-hover` utilities — caption slides up on hover with no JavaScript.

### 10. Unit tests: Vitest + @testing-library/svelte

**Chosen**: Vitest, `@testing-library/svelte`, `@testing-library/jest-dom`, `@testing-library/user-event`, jsdom

**Config**: `vite.config.ts` `test` block; `environment: 'jsdom'`; setup via `src/setupTests.ts` (imports `@testing-library/jest-dom/vitest`). No `globals: true` — vitest imports are explicit.

**Test location**: `src/lib/components/ui/__tests__/` subdirectory convention.

**Current coverage**: `GhostButton.svelte` — render, type attribute, onclick handler, graceful handling of omitted onclick.

### 11. Renovate

**Config**: `renovate.json` extends `config:recommended` (handles pnpm, GitHub Actions, scheduling). Added `packageRules` for automerge of patch/minor updates.

---

## Risks / Trade-offs

- **Svelte 5 runes API**: Runes (`$state`, `$props`, `$derived`) are used throughout. Developers must be familiar with Svelte 5 syntax; mixing with legacy reactive syntax is not supported (runes mode is enforced project-wide).
- **Tailwind v4 stability**: Tailwind v4 is a major rewrite; the `@theme` API and `@tailwindcss/vite` plugin are relatively new. The tradeoff is access to the most modern Tailwind features (no config file, CSS-first tokens) at the cost of a smaller ecosystem of community resources.
- **Scroll-snap layout**: Full-page snap creates a distinctive UX but limits flexibility — e.g., sections with very long content require careful `.inner-scroll` handling to avoid content being clipped.
- **No separate `/akty` route**: Legal acts are in a dialog. This is simpler but means legal act content is not directly linkable via URL. Acceptable for this use case.
- **Inter font vs. Lato**: Switching fonts changes the visual feel slightly. Inter is the de-facto modern sans-serif; swappable via a single CSS variable.

---

## Migration Plan

1. Scaffold SvelteKit app at repo root
2. Set up TypeScript, ESLint, Prettier, Tailwind v4
3. Copy images from `src/img/` → `static/img/`
4. Implement components and pages
5. Update Dockerfile, docker-compose files
6. Update Renovate config
7. All CI checks pass on the PR
8. Merge to `main` → Docker image published

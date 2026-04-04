## 1. Project Scaffold & Tooling

- [x] 1.1 Scaffold SvelteKit 2 app at repo root with TypeScript
- [x] 1.2 Set `"version": "2.0.0"` and `engines` field (`node >=24`, `pnpm >=10`) in `package.json`
- [x] 1.3 Add `.npmrc` with `engine-strict=true`
- [x] 1.4 Verify `pnpm install` succeeds

## 2. TypeScript & svelte-check

- [x] 2.1 Update `tsconfig.json` to extend `.svelte-kit/tsconfig.json`; add `strict: true`, `allowJs`, `checkJs`, `esModuleInterop`, `moduleResolution: bundler`
- [x] 2.2 Install `svelte-check` as a dev dependency
- [x] 2.3 Add `"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"` to `package.json` scripts
- [x] 2.4 Run `pnpm check` — exits with code 0

## 3. ESLint & Prettier

- [x] 3.1 Install ESLint and plugins: `eslint`, `eslint-plugin-svelte`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `globals`
- [x] 3.2 Create `eslint.config.js` (flat config) with `@eslint/js` recommended, `@typescript-eslint` recommended, `eslint-plugin-svelte` flat/recommended; ignores `build/`, `.svelte-kit/`, `node_modules/`
- [x] 3.3 Install Prettier and plugin: `prettier`, `prettier-plugin-svelte`
- [x] 3.4 Create `.prettierrc` with: `useTabs: true`, `singleQuote: true`, `trailingComma: "none"`, `printWidth: 100`, `prettier-plugin-svelte`
- [x] 3.5 Create `.editorconfig`: `indent_style = tab` (space for JSON/YAML/MD), `indent_size = 2`, `end_of_line = lf`, `charset = utf-8`, `trim_trailing_whitespace = true`, `insert_final_newline = true`
- [x] 3.6 Add scripts to `package.json`: `"lint": "eslint src"`, `"format": "prettier --write src"`

## 4. SvelteKit Configuration

- [x] 4.1 Install `@sveltejs/adapter-static`
- [x] 4.2 Update `svelte.config.js` to use `adapter-static`; enable Svelte 5 runes mode for all non-node_modules files
- [x] 4.3 Create `src/routes/+layout.ts` with `export const prerender = true`
- [x] 4.4 Update `src/app.html`: set `lang="pl"`, add Google Fonts preconnect + stylesheet links for Raleway and Inter
- [x] 4.5 Run `pnpm build` — `build/index.html` produced

## 5. Design System (Tailwind v4 + CSS tokens)

- [x] 5.1 Install `tailwindcss` and `@tailwindcss/vite`; add Tailwind plugin to `vite.config.ts`
- [x] 5.2 Create `src/app.css` with `@import 'tailwindcss'` and all design tokens inside a `@theme` block (colours, fonts, radii, z-indices)
- [x] 5.3 Add dark mode token overrides in `@media (prefers-color-scheme: dark)` on `:root`
- [x] 5.4 Add global base styles: `font-family`, `font-size`, heading font stack, link colours
- [x] 5.5 Add scroll-snap layout classes: `.snap-root`, `.snap-section`, `.inner-scroll`
- [x] 5.6 Add `.glass-card` frosted-glass style with dark mode variant
- [x] 5.7 Import `src/app.css` in `src/routes/+layout.svelte`

## 6. Static Assets Migration

- [x] 6.1 Copy all images from `src/img/` to `static/img/`
- [x] 6.2 Verify background images (`infinite-loop-01.jpg`, `bg1.webp`, `bg2.webp`) and licence photos (`lic1.webp`, `lic2.webp`) are present
- [x] 6.3 Remove old vendored library directories (`src/css/`, `src/js/`, `src/fontawesome-free-6.1.1-web/`, `src/slick/`, `src/magnific-popup/`)
- [x] 6.4 Install `lucide-svelte`

## 7. Svelte Components

- [x] 7.1 Create `src/lib/components/ui/NavBar.svelte` — fixed nav, transparent-to-opaque on scroll (tracking `.snap-root` scroll), section observer for active link + URL hash, mobile hamburger toggle
- [x] 7.2 Create `src/lib/components/sections/HeroSection.svelte` — full-height snap section, background image, company name and tagline
- [x] 7.3 Create `src/lib/components/sections/ManagementSection.svelte` — "Zarządzanie" section, pillars with lucide-svelte icons, services list
- [x] 7.4 Create `src/lib/components/sections/AboutSection.svelte` — "O mnie" section, background image, owner bio, licence number, education
- [x] 7.5 Create `src/lib/components/sections/OfferSection.svelte` — "Oferta" section, full duties list
- [x] 7.6 Create `src/lib/components/sections/CredentialsSection.svelte` — "Uprawnienia" section, background image, 2-photo grid with CSS hover overlay, native `<dialog>` lightbox with animated open/close
- [x] 7.7 Create `src/lib/components/sections/ContactSection.svelte` — "Kontakt" section, dark background, contact details (name, address, phone, email, registration), NO map iframe
- [x] 7.8 Create `src/lib/components/sections/LegalActsDialog.svelte` — native `<dialog>` with all Polish legal act links (replaces `/akty` route)
- [x] 7.9 Create shared UI components: `BackgroundLayer.svelte`, `BulletItem.svelte`, `GhostButton.svelte`, `SectionLabel.svelte`, `SectionLink.svelte`, `SectionNav.svelte`
- [x] 7.10 Compose all components in `src/routes/+page.svelte` with `<svelte:head>` for title and meta description
- [x] 7.11 Add section `id` attributes: `atu`, `zarzadzanie`, `omnie`, `oferta`, `uprawnienia`, `contact`
- [x] 7.12 Create `src/lib/sections.ts` — shared section list, `scrollToSection` helper, `createSectionObserver` factory

## 8. Unit Tests (Vitest)

- [x] 8.1 Install Vitest and testing library: `vitest`, `@testing-library/svelte`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`
- [x] 8.2 Add `test` block to `vite.config.ts`: `environment: 'jsdom'`, `include` patterns covering `src/**/*.test.ts` and `src/**/__tests__/**/*.test.ts`, `setupFiles: ['src/setupTests.ts']`, coverage with `v8` provider
- [x] 8.3 Create `src/setupTests.ts` importing `@testing-library/jest-dom/vitest`
- [x] 8.4 Write `src/lib/components/ui/__tests__/GhostButton.test.ts` — render, type attribute, onclick handler, omitted onclick

## 9. Renovate

- [x] 9.1 Update `renovate.json` to extend `config:recommended` with automerge for patch/minor updates via `packageRules`

## 10. Cleanup & Final Verification

- [ ] 10.1 Remove old `src/index.html`, `src/akty.html` if not already removed
- [ ] 10.2 Run `pnpm lint && pnpm check && pnpm build` — verify all pass
- [ ] 10.3 Open PR from feature branch to `main` and verify build passes

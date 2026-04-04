## Context

The project uses SvelteKit 2 + static adapter, Svelte 5, Tailwind CSS v4, and Vitest for unit tests. The app is a single-page scroll-snap layout with six full-screen sections rendered as a static site. There is no server or API — `pnpm build` produces a plain `build/` directory served by any static host.

Unit tests cover components in isolation (jsdom). There is no browser-level test coverage. Visual regressions can only be caught by manual inspection today.

## Goals / Non-Goals

**Goals:**

- Install and configure Playwright with Chromium only (smallest footprint)
- Smoke-test that the page loads and all six section anchors exist
- Visual regression test each section with a committed baseline screenshot
- Mask the copyright year so it does not cause false failures on year rollover
- Screenshots stored in `e2e/snapshots/` and committed to the repo
- `pnpm test:e2e` runs all Playwright tests against the built static site
- Add `pnpm test:e2e` as a step in the existing GitHub Actions `check` job (`.github/workflows/build-and-push.yaml`), installing Chromium via `pnpm exec playwright install chromium` before running tests

**Non-Goals:**

- Multi-browser testing (Firefox, WebKit) — Chromium only for now
- Accessibility or performance audits
- Mobile viewport visual regression (desktop only for baselines)
- Testing user interactions beyond page load and scroll-to-section

## Decisions

### Decision: Test against `pnpm preview` (built site) rather than `pnpm dev`

Playwright's `webServer` config will run `pnpm build && pnpm preview` before tests. This mirrors production — static adapter output — and avoids HMR noise. Alternative (dev server) would be faster but might produce slightly different rendering due to Vite transforms.

### Decision: Chromium only

Reduces install size and CI time. The site has no browser-specific behaviour; adding Firefox/WebKit is a future change if needed.

### Decision: Snapshots in `e2e/snapshots/`, committed to repo

Standard Playwright pattern for golden baselines. Alternatives (CI artifact storage, Percy/Chromatic) add external dependencies. Committing keeps everything self-contained and diffable in PRs.

### Decision: Mask copyright year via `mask` option in Playwright snapshot config

Playwright's `toHaveScreenshot` supports a `mask` array of `Locator`s. The copyright paragraph in ContactSection will be masked with a solid rectangle. This is simpler than mocking `Date` in a static build.

### Decision: Scroll-to-section via `page.evaluate` + `scrollIntoView`

The app uses scroll-snap. The most reliable way to bring a section fully into view for a screenshot is `element.scrollIntoView({ behavior: 'instant' })` followed by a short wait. Using keyboard or mouse scroll is flakier with snap physics.

## Risks / Trade-offs

- **Snapshot brittleness on font rendering** → Use `animations: 'disabled'` and `fonts` loaded check before snapshotting; pin Playwright version in package.json.
- **Build step makes `test:e2e` slow (~30s)** → Acceptable for a change validation workflow; developers can run `pnpm preview` manually and use `--no-deps` flag if iterating.
- **Committed PNG snapshots increase repo size** → Six desktop screenshots at ~200–400 KB each = ~2 MB total; acceptable for this project size.
- **Year mask approach depends on a stable CSS selector** → The copyright `<p>` is stable; if ContactSection markup changes the mask locator may need updating.

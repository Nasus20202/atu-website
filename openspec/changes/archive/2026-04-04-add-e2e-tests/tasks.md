## 1. Install Playwright

- [x] 1.1 Run `pnpm add -D @playwright/test` to add Playwright as a dev dependency
- [x] 1.2 Run `pnpm exec playwright install chromium` to install the Chromium browser binary
- [x] 1.3 Add `test:e2e` script to `package.json`: `"test:e2e": "playwright test"`

## 2. Playwright Configuration

- [x] 2.1 Create `playwright.config.ts` at project root with: `testDir: './e2e'`, `snapshotDir: './e2e/snapshots'`, `fullyParallel: false`, `baseURL: 'http://localhost:4173'`
- [x] 2.2 Configure `webServer` in `playwright.config.ts` to run `pnpm build && pnpm preview` and wait on `http://localhost:4173`
- [x] 2.3 Configure the default `use` block: `viewport: { width: 1280, height: 800 }`, `animations: 'disabled'`
- [x] 2.4 Add `e2e/` and `e2e/snapshots/` to `.gitignore` exclusions if present, or confirm they are tracked

## 3. Smoke Tests

- [x] 3.1 Create `e2e/smoke.test.ts` with a test that navigates to `/` and asserts `page.title()` equals `"ATU Nieruchomości"`
- [x] 3.2 Add assertions in `e2e/smoke.test.ts` for all six section IDs: `#atu`, `#zarzadzanie`, `#omnie`, `#oferta`, `#uprawnienia`, `#contact`

## 4. Visual Regression Tests

- [x] 4.1 Create `e2e/visual.test.ts` with a helper function that scrolls a section into view using `page.evaluate(() => document.querySelector(selector).scrollIntoView({ behavior: 'instant' }))` and waits for network idle
- [x] 4.2 Add a visual test for `#atu` (Hero section) — scroll into view, take screenshot, compare to baseline
- [x] 4.3 Add a visual test for `#zarzadzanie` (Management section)
- [x] 4.4 Add a visual test for `#omnie` (About section)
- [x] 4.5 Add a visual test for `#oferta` (Offer section)
- [x] 4.6 Add a visual test for `#uprawnienia` (Credentials section)
- [x] 4.7 Add a visual test for `#contact` (Contact section) with the copyright `<p>` masked via `mask: [page.locator('#contact p.text-center')]`

## 5. Generate and Commit Baselines

- [x] 5.1 Run `pnpm test:e2e -- --update-snapshots` to generate baseline PNG files in `e2e/snapshots/`
- [x] 5.2 Verify all six baseline files exist in `e2e/snapshots/`
- [x] 5.3 Run `pnpm test:e2e` (without `--update-snapshots`) and confirm all tests pass
- [x] 5.4 Confirm `e2e/snapshots/` is not in `.gitignore` so baselines are committed with the repo

## 6. CI/CD Integration

- [x] 6.1 In `.github/workflows/build-and-push.yaml`, add a step after `Install dependencies` that runs `pnpm exec playwright install chromium`
- [x] 6.2 Add a `E2E Test` step that runs `pnpm test:e2e` in the `check` job
- [x] 6.3 Push to a branch and confirm the GitHub Actions `check` job passes including the new e2e step

## 7. Multi-browser Support

- [x] 7.1 Add Firefox, WebKit, and Pixel 5 mobile projects to `playwright.config.ts`
- [x] 7.2 Install Firefox and WebKit browser binaries: `pnpm exec playwright install firefox webkit`
- [x] 7.3 Restrict visual regression tests (`visual.test.ts`) to Chromium-only via `@playwright/test` project filter
- [x] 7.4 Generate mobile baselines by running `pnpm exec playwright test --update-snapshots --project="Mobile Chrome"`
- [x] 7.5 Run full test suite and confirm all browsers pass
- [x] 7.6 Update CI workflow to install all browsers: `pnpm exec playwright install --with-deps chromium firefox webkit`

## 8. Behaviour Tests

- [x] 8.1 Create `e2e/behaviour.test.ts` — navbar transparent at load (no `scrolled-nav` class)
- [x] 8.2 Add test: navbar gets `scrolled-nav` class after scrolling past 80px
- [x] 8.3 Add test: clicking a navbar link scrolls to the correct section and updates URL hash
- [x] 8.4 Add test: brand button scrolls to `#atu`
- [x] 8.5 Add test (mobile): hamburger button is visible, nav links are hidden
- [x] 8.6 Add test (mobile): clicking hamburger reveals nav links; clicking a nav link closes menu
- [x] 8.7 Add test: hero down-arrow button navigates to `#zarzadzanie`
- [x] 8.8 Add test: SectionNav "Next section" arrow advances from `#atu` to `#zarzadzanie`
- [x] 8.9 Add test: SectionNav "Previous section" is disabled on first section; "Next section" is disabled on last
- [x] 8.10 Add test: `ArrowDown` key navigates forward; `ArrowUp` retreats
- [x] 8.11 Add test: `Home` key jumps to `#atu`; `End` key jumps to `#contact`
- [x] 8.12 Add test: contact phone/email links have correct `href` attributes
- [x] 8.13 Run full test suite and confirm all behaviour tests pass across all browsers

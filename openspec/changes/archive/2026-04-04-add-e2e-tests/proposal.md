## Why

The project has solid unit tests but no end-to-end or visual regression coverage. Adding Playwright gives confidence that the full page renders correctly in a real browser and catches visual regressions automatically by comparing screenshots — without relying on manual review after every change.

## What Changes

- Install and configure Playwright as a dev dependency with a `playwright.config.ts`
- Add an `e2e/` directory at project root containing all test files
- Add smoke tests: page loads, navigation links present, sections reachable by anchor
- Add visual regression tests: full-page screenshots for all six snap-sections (`#atu`, `#zarzadzanie`, `#omnie`, `#oferta`, `#uprawnienia`, `#contact`)
- Screenshots saved to `e2e/snapshots/` and committed to the repo as baseline images
- The dynamic copyright year at the bottom of the Contact section is masked/clipped in snapshots so it does not cause false failures on year rollover
- Add `pnpm test:e2e` script to `package.json`
- Add `pnpm test:e2e` as a step in the existing GitHub Actions `check` job

## Capabilities

### New Capabilities

- `e2e-tests`: End-to-end and visual regression testing with Playwright — configuration, smoke tests, and per-section screenshot baselines

### Modified Capabilities

<!-- No existing spec requirements change -->

## Impact

- New dev dependencies: `@playwright/test`, browser binaries (Chromium at minimum)
- New files: `playwright.config.ts`, `e2e/` directory, `e2e/snapshots/` directory
- `package.json`: new `test:e2e` script
- `.github/workflows/build-and-push.yaml`: `check` job gets two new steps — install Chromium binaries and run `pnpm test:e2e`
- No production code changes

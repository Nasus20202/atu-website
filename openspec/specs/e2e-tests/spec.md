# Spec: E2E Tests

## Purpose

Defines the end-to-end testing setup, configuration, and coverage expectations for the ATU Nieruchomości SvelteKit project using Playwright. Covers smoke tests, behaviour tests, visual regression tests, multi-browser support, and CI integration.

## Requirements

### Requirement: Playwright configuration

The project SHALL have a `playwright.config.ts` at the project root that:

- Uses `@playwright/test` with Chromium, Firefox, WebKit, and a mobile viewport (Pixel 5 via Chromium)
- Sets `testDir: './e2e'`
- Configures `webServer` to run `pnpm build && pnpm preview` and wait for `http://localhost:4173`
- Sets `baseURL: 'http://localhost:4173'`
- Enables `fullyParallel: false` (sections must be tested sequentially due to scroll-snap)
- Sets `snapshotDir: './e2e/snapshots'`
- Disables animations via `actionTimeout` and `expect` thresholds appropriate for visual regression
- Visual regression tests run on Chromium desktop only (to avoid cross-browser rendering noise in baselines); behaviour tests run on all projects

#### Scenario: Playwright config loads

- **WHEN** `pnpm test:e2e` is executed
- **THEN** Playwright reads `playwright.config.ts` and launches the preview server before running tests

---

### Requirement: `test:e2e` npm script

The `package.json` SHALL include a `test:e2e` script that runs `playwright test`.

#### Scenario: Script executes tests

- **WHEN** `pnpm test:e2e` is run
- **THEN** Playwright runs all files under `e2e/` and exits with code 0 on success

---

### Requirement: Smoke tests

The `e2e/smoke.test.ts` file SHALL verify that the page loads and all six snap-sections are present in the DOM.

Required assertions:

- Page title is "ATU Nieruchomości"
- Elements `#atu`, `#zarzadzanie`, `#omnie`, `#oferta`, `#uprawnienia`, `#contact` are all present

#### Scenario: Page loads with correct title

- **WHEN** a browser navigates to the root URL
- **THEN** the page title is "ATU Nieruchomości"

#### Scenario: All sections present

- **WHEN** the home page DOM is inspected
- **THEN** all six section anchor IDs (`#atu`, `#zarzadzanie`, `#omnie`, `#oferta`, `#uprawnienia`, `#contact`) exist in the document

---

### Requirement: Behaviour tests

The `e2e/behaviour.test.ts` file SHALL verify the interactive behaviours of the application. These tests run across all configured browsers.

Required test cases:

**Navigation bar:**

- Navbar is transparent (no background) at page load (scroll position 0)
- After scrolling past 80px, the navbar gains a visible background (`scrolled-nav` class)
- Clicking a navbar link scrolls to the correct section and updates the URL hash
- The brand button ("ATU Nieruchomości") scrolls back to `#atu`
- On mobile viewport: nav links are hidden; hamburger button is visible
- On mobile viewport: clicking the hamburger reveals the nav link list
- On mobile viewport: clicking a nav link closes the menu

**Hero section:**

- The scroll-down arrow button navigates to `#zarzadzanie`

**Section navigation (side arrows + dots):**

- The "Next section" arrow button advances from `#atu` to `#zarzadzanie`
- The "Previous section" arrow is disabled/inert on the first section
- The "Next section" arrow is disabled/inert on the last section

**Keyboard navigation:**

- `ArrowDown` advances to the next section
- `ArrowUp` retreats to the previous section
- `Home` jumps to the first section (`#atu`)
- `End` jumps to the last section (`#contact`)

**Contact section:**

- The phone link has `href="tel:+48601640146"`
- The primary email link has `href="mailto:zwm24@wp.pl"`
- The secondary email link has `href="mailto:atu@atu.nieruchomosci.pl"`

#### Scenario: Navbar transparent on load

- **WHEN** the page is first loaded at scroll position 0
- **THEN** the `<nav>` element does not have the `scrolled-nav` class

#### Scenario: Navbar opaque after scroll

- **WHEN** the snap-root container is scrolled past 80px
- **THEN** the `<nav>` element has the `scrolled-nav` class

#### Scenario: Nav link scrolls to section

- **WHEN** the user clicks a navbar link (e.g. "Kontakt")
- **THEN** the `#contact` section becomes visible and the URL hash is `#contact`

#### Scenario: Hamburger reveals mobile menu

- **WHEN** the viewport is mobile-sized and the hamburger button is clicked
- **THEN** the navigation link list becomes visible

#### Scenario: Hero arrow navigates to next section

- **WHEN** the down-arrow button in the Hero section is clicked
- **THEN** the `#zarzadzanie` section scrolls into view

#### Scenario: SectionNav next arrow advances section

- **WHEN** the "Next section" arrow button is clicked on `#atu`
- **THEN** the `#zarzadzanie` section becomes the active section

#### Scenario: Keyboard ArrowDown navigates forward

- **WHEN** `ArrowDown` is pressed while `#atu` is active
- **THEN** `#zarzadzanie` becomes the active section

#### Scenario: Keyboard Home jumps to first section

- **WHEN** `Home` is pressed from any section
- **THEN** `#atu` becomes the active section

#### Scenario: Keyboard End jumps to last section

- **WHEN** `End` is pressed from any section
- **THEN** `#contact` becomes the active section

#### Scenario: Contact links have correct hrefs

- **WHEN** the contact section is rendered
- **THEN** phone and email anchor elements have the correct `href` attributes

---

### Requirement: Multi-browser and mobile visual regression

Visual regression baselines SHALL be generated for:

- Chromium desktop (1280×800) — primary baseline
- Mobile viewport using Pixel 5 device emulation (393×851) via Chromium

Firefox and WebKit SHALL run behaviour tests only (not visual regression) to avoid cross-browser rendering noise in committed baselines.

#### Scenario: Mobile visual baseline matches

- **WHEN** a visual regression test runs on a mobile viewport
- **THEN** the screenshot matches the committed mobile baseline

---

The `e2e/visual.test.ts` file SHALL take a full-page screenshot of each of the six snap-sections and compare against a committed baseline.

Requirements:

- Each section is scrolled into view using `scrollIntoView({ behavior: 'instant' })` before capture
- The copyright year element in `#contact` SHALL be masked (hidden with a solid rectangle) so year changes do not cause false failures
- Baseline screenshots are stored in `e2e/snapshots/` and committed to the repository
- The viewport is set to 1280×800 for all visual tests
- Animations are disabled during capture

#### Scenario: Section screenshot matches baseline

- **WHEN** a visual regression test runs for a section that has a committed baseline
- **THEN** the screenshot matches the baseline within the configured pixel threshold

#### Scenario: Copyright year is masked

- **WHEN** the `#contact` section is screenshotted
- **THEN** the copyright paragraph is masked and does not appear in the snapshot comparison

#### Scenario: First run generates baselines

- **WHEN** `pnpm test:e2e -- --update-snapshots` is run with no existing baselines
- **THEN** baseline PNG files are written to `e2e/snapshots/` for each section

---

### Requirement: Snapshot baseline files committed

The `e2e/snapshots/` directory SHALL be tracked by git. Baseline PNG files SHALL be generated and committed as part of this change so the test suite passes without requiring an update-snapshots run.

#### Scenario: Baselines present in repo

- **WHEN** the repository is checked out fresh and `pnpm test:e2e` is run
- **THEN** all visual tests pass against the committed baselines without needing `--update-snapshots`

---

### Requirement: GitHub Actions CI integration

The existing `check` job in `.github/workflows/build-and-push.yaml` SHALL be extended to run the e2e test suite on every push and pull request to `main`.

Required steps (added after `Install dependencies`):

1. Install Chromium: `pnpm exec playwright install chromium`
2. Run e2e tests: `pnpm test:e2e`

#### Scenario: E2E tests run in CI

- **WHEN** a push or pull request targets the `main` branch
- **THEN** the `check` job installs Chromium and runs `pnpm test:e2e`, failing the job if any test fails

#### Scenario: CI fails on visual regression

- **WHEN** a code change causes a section to render differently from the committed baseline
- **THEN** the `pnpm test:e2e` step exits with a non-zero code and the `check` job fails

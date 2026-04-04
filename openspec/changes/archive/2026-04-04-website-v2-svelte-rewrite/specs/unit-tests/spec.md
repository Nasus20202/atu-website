## ADDED Requirements

### Requirement: Vitest configuration
The project SHALL use Vitest as the unit test runner, configured in `vite.config.ts` under the `test` key. The configuration SHALL:
- Set `environment: 'jsdom'`
- Set `globals: true`
- Include `@testing-library/jest-dom` setup via `setupFiles`
- Include test file patterns: `src/**/*.test.ts` and `src/**/*.test.svelte`

The `package.json` script `test:unit` SHALL run `vitest run` (non-watch, for CI). A separate `test:unit:watch` script MAY run `vitest`.

#### Scenario: Unit tests run in CI mode
- **WHEN** `pnpm test:unit` is executed
- **THEN** Vitest runs all tests once and exits with code 0 on success or non-zero on failure

#### Scenario: Test environment is jsdom
- **WHEN** a Svelte component test accesses `document` or `window`
- **THEN** those globals are available via jsdom

---

### Requirement: Component render tests
Every Svelte component in `src/lib/components/` SHALL have a corresponding unit test file (`*.test.ts`) that verifies at minimum:
1. The component renders without throwing
2. Key visible text content is present in the DOM

The following components require unit tests:
- `NavBar.svelte`
- `HeroSection.svelte`
- `ManagementSection.svelte`
- `AboutSection.svelte`
- `OfferSection.svelte`
- `CredentialsSection.svelte`
- `ContactSection.svelte`
- `Footer.svelte`

#### Scenario: NavBar renders without error
- **WHEN** `NavBar.svelte` is mounted in a jsdom environment
- **THEN** no error is thrown and the element is present in the document

#### Scenario: ContactSection contains contact details
- **WHEN** `ContactSection.svelte` is rendered
- **THEN** the text "601-64-01-46" and "zwm24@wp.pl" are present in the rendered output

---

### Requirement: NavBar toggle unit test
The `NavBar` component's mobile menu toggle SHALL be covered by a unit test that simulates a click on the hamburger button and asserts the menu's visibility state changes.

#### Scenario: Menu opens on hamburger click
- **WHEN** the hamburger button is clicked in the unit test
- **THEN** the nav links container has an `open` class or `aria-expanded="true"` on the button

---

### Requirement: Test coverage reporting
Vitest SHALL be configured to produce a coverage report using the `v8` provider. Coverage SHALL be reported in `lcov` format to `coverage/` and also printed to the terminal as a text summary. The CI job SHALL upload the coverage artefact.

#### Scenario: Coverage report generated
- **WHEN** `pnpm test:unit --coverage` is executed
- **THEN** a `coverage/lcov.info` file is produced

---

### Requirement: No snapshot tests
The project SHALL NOT use Vitest snapshot tests (`toMatchSnapshot`) for Svelte components. All assertions SHALL use DOM queries and text matchers from `@testing-library/svelte`.

#### Scenario: Snapshot assertion absent
- **WHEN** all test files are searched for `toMatchSnapshot`
- **THEN** no occurrences are found

# Spec: Unit Tests

## Purpose

Defines the unit testing setup, configuration, and coverage expectations for the ATU Nieruchomości SvelteKit project using Vitest and Testing Library.

## Requirements

### Requirement: Vitest configuration

The project SHALL use Vitest as the unit test runner, configured in `vite.config.ts` under the `test` key. The configuration SHALL:

- Set `environment: 'jsdom'`
- Include test file patterns: `src/**/*.test.ts` and `src/**/__tests__/**/*.test.ts`
- Include `@testing-library/jest-dom` setup via `setupFiles: ['src/setupTests.ts']`
- Configure coverage with the `v8` provider targeting `src/lib/**/*.ts` and `src/lib/**/*.svelte`

The `package.json` SHALL include Vitest as a dev dependency. Tests SHALL import `describe`, `it`, `expect`, and `vi` explicitly from `vitest` (no globals).

#### Scenario: Unit tests run

- **WHEN** `pnpm exec vitest run` is executed
- **THEN** Vitest runs all tests once and exits with code 0 on success or non-zero on failure

#### Scenario: Test environment is jsdom

- **WHEN** a Svelte component test accesses `document` or `window`
- **THEN** those globals are available via jsdom

---

### Requirement: UI component unit tests

Shared UI components in `src/lib/components/ui/` SHALL have unit test files in a `__tests__/` subdirectory. Tests SHALL use `@testing-library/svelte` for rendering and `@testing-library/user-event` for interaction simulation.

The following components require unit tests:

- `GhostButton.svelte` — verifies render, type attribute, onclick handler, and graceful handling of omitted onclick

#### Scenario: GhostButton renders without error

- **WHEN** `GhostButton.svelte` is mounted in a jsdom environment
- **THEN** no error is thrown and the button is present in the document

#### Scenario: GhostButton onclick fires

- **WHEN** the button is clicked in a unit test with a mock handler
- **THEN** the handler is called exactly once

---

### Requirement: No snapshot tests

The project SHALL NOT use Vitest snapshot tests (`toMatchSnapshot`) for Svelte components. All assertions SHALL use DOM queries and text matchers from `@testing-library/svelte` and `@testing-library/jest-dom`.

#### Scenario: Snapshot assertion absent

- **WHEN** all test files are searched for `toMatchSnapshot`
- **THEN** no occurrences are found

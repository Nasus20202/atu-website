## ADDED Requirements

### Requirement: ESLint flat config with Svelte and TypeScript support
The project SHALL include an `eslint.config.js` (flat config format) at the repo root. The config SHALL include rules from `eslint-plugin-svelte` and `@typescript-eslint`. The following rule categories SHALL be enabled:
- Svelte-specific rules: `svelte/recommended`
- TypeScript rules: `@typescript-eslint/recommended-type-checked`
- Accessibility: `svelte/no-unused-vars`, `svelte/valid-compile`
- No unused variables, no console statements in production code (warning in dev files)

The `package.json` `scripts` object SHALL include:
```json
"lint": "eslint . --max-warnings 0"
```

#### Scenario: Lint passes on clean codebase
- **WHEN** `pnpm lint` is executed on the project
- **THEN** it exits with code 0 and prints no warnings or errors

#### Scenario: Lint fails on violation
- **WHEN** a `.ts` file contains an unused variable
- **THEN** `pnpm lint` exits with a non-zero code

#### Scenario: Svelte files are linted
- **WHEN** a `.svelte` file contains an invalid Svelte construct
- **THEN** `pnpm lint` reports the error with file path and line number

---

### Requirement: Prettier formatting with Svelte plugin
The project SHALL include a `.prettierrc` file at the repo root with the following configuration:
```json
{
  "useTabs": false,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-svelte"],
  "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

The `package.json` `scripts` object SHALL include:
```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

#### Scenario: Format check passes on clean codebase
- **WHEN** `pnpm format:check` is executed
- **THEN** it exits with code 0

#### Scenario: Format check fails on unformatted file
- **WHEN** a `.svelte` or `.ts` file has inconsistent indentation
- **THEN** `pnpm format:check` exits with a non-zero code and lists the offending files

#### Scenario: Svelte files are formatted
- **WHEN** `pnpm format` is executed on a `.svelte` file with inconsistent spacing
- **THEN** the file is rewritten to match Prettier's Svelte output

---

### Requirement: EditorConfig
The project SHALL include a `.editorconfig` file at the repo root enforcing:
- `indent_style = space`
- `indent_size = 2`
- `end_of_line = lf`
- `charset = utf-8`
- `trim_trailing_whitespace = true`
- `insert_final_newline = true`

#### Scenario: EditorConfig recognised
- **WHEN** a developer opens the project in VS Code with the EditorConfig extension
- **THEN** new files automatically use 2-space indentation and LF line endings

---

### Requirement: svelte-check type validation
The project SHALL include `svelte-check` as a dev dependency. The `package.json` `scripts` object SHALL include:
```json
"check": "svelte-check --tsconfig ./tsconfig.json"
```
`svelte-check` SHALL be run as a separate CI step from ESLint.

#### Scenario: svelte-check passes on clean code
- **WHEN** `pnpm check` is executed
- **THEN** it exits with code 0 and reports zero errors

#### Scenario: svelte-check detects type mismatch in component
- **WHEN** a `.svelte` component passes a prop of the wrong TypeScript type
- **THEN** `pnpm check` reports the type error with file path and line number

---

### Requirement: Consistent script naming in package.json
All developer scripts SHALL follow these exact names in `package.json` to ensure CI consistency:

| Script | Command |
|---|---|
| `dev` | `vite dev` |
| `build` | `vite build` |
| `preview` | `vite preview` |
| `check` | `svelte-check --tsconfig ./tsconfig.json` |
| `lint` | `eslint . --max-warnings 0` |
| `format` | `prettier --write .` |
| `format:check` | `prettier --check .` |
| `test:unit` | `vitest run` |
| `test:e2e` | `playwright test` |
| `test` | `pnpm test:unit && pnpm test:e2e` |
| `release:patch` | `changelogen --bump patch --push` |
| `release:minor` | `changelogen --bump minor --push` |
| `release:major` | `changelogen --bump major --push` |

#### Scenario: All required scripts present
- **WHEN** `package.json` is parsed
- **THEN** all scripts listed above are present with their specified commands

# Spec: Code Quality

## Purpose

Defines linting, formatting, type-checking, and editor configuration standards for the ATU Nieruchomości SvelteKit project.

## Requirements

### Requirement: ESLint flat config with Svelte and TypeScript support

The project SHALL include an `eslint.config.js` (flat config format) at the repo root. The config SHALL include rules from `eslint-plugin-svelte` and `@typescript-eslint`. The following rule categories SHALL be enabled:

- JavaScript: `@eslint/js` recommended
- TypeScript: `@typescript-eslint` recommended rules
- Svelte: `eslint-plugin-svelte` flat/recommended config
- No unused variables (ignoring names prefixed with `_`)

The `package.json` `scripts` object SHALL include:

```json
"lint": "eslint src"
```

#### Scenario: Lint passes on clean codebase

- **WHEN** `pnpm lint` is executed on the project
- **THEN** it exits with code 0 and prints no errors

#### Scenario: Lint fails on violation

- **WHEN** a `.ts` file contains an unused variable (not prefixed with `_`)
- **THEN** `pnpm lint` exits with a non-zero code

#### Scenario: Svelte files are linted

- **WHEN** a `.svelte` file contains an invalid Svelte construct
- **THEN** `pnpm lint` reports the error with file path and line number

---

### Requirement: Prettier formatting with Svelte plugin

The project SHALL include a `.prettierrc` file at the repo root with the following configuration:

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

The `package.json` `scripts` object SHALL include:

```json
"format": "prettier --write src"
```

#### Scenario: Format check passes on clean codebase

- **WHEN** `pnpm format` is executed with `--check`
- **THEN** it exits with code 0

#### Scenario: Svelte files are formatted

- **WHEN** `pnpm format` is executed on a `.svelte` file with inconsistent spacing
- **THEN** the file is rewritten to match Prettier's Svelte output

---

### Requirement: EditorConfig

The project SHALL include a `.editorconfig` file at the repo root enforcing:

- `indent_style = tab` (space for JSON/YAML/Markdown)
- `indent_size = 2`
- `end_of_line = lf`
- `charset = utf-8`
- `trim_trailing_whitespace = true` (false for Markdown)
- `insert_final_newline = true`

#### Scenario: EditorConfig recognised

- **WHEN** a developer opens the project in VS Code with the EditorConfig extension
- **THEN** new files automatically use tab indentation and LF line endings

---

### Requirement: svelte-check type validation

The project SHALL include `svelte-check` as a dev dependency. The `package.json` `scripts` object SHALL include:

```json
"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
```

#### Scenario: svelte-check passes on clean code

- **WHEN** `pnpm check` is executed
- **THEN** it exits with code 0 and reports zero errors

#### Scenario: svelte-check detects type mismatch in component

- **WHEN** a `.svelte` component passes a prop of the wrong TypeScript type
- **THEN** `pnpm check` reports the type error with file path and line number

---

### Requirement: Consistent script naming in package.json

All developer scripts SHALL follow these exact names in `package.json`:

| Script    | Command                                                      |
| --------- | ------------------------------------------------------------ |
| `dev`     | `vite dev`                                                   |
| `build`   | `vite build`                                                 |
| `preview` | `vite preview`                                               |
| `check`   | `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` |
| `lint`    | `eslint src`                                                 |
| `format`  | `prettier --write src`                                       |

#### Scenario: All required scripts present

- **WHEN** `package.json` is parsed
- **THEN** all scripts listed above are present with their specified commands

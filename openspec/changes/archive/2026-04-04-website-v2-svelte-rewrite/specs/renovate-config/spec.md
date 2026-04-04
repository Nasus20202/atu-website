## ADDED Requirements

### Requirement: npm/pnpm package manager enabled in Renovate
The `renovate.json` SHALL be updated to explicitly enable the `npm` package manager (which covers pnpm projects). Renovate SHALL scan `package.json` and `pnpm-lock.yaml` for dependency updates.

#### Scenario: Renovate creates PRs for npm package updates
- **WHEN** a new version of a dev dependency (e.g., `vitest`) is published
- **THEN** Renovate opens a PR updating the version in `package.json` and `pnpm-lock.yaml`

---

### Requirement: GitHub Actions digest pinning
All GitHub Actions in `.github/workflows/` SHALL be pinned to their SHA digest (e.g., `actions/checkout@abc1234` instead of `actions/checkout@v4`). Renovate SHALL manage these digests and open PRs to update them when new versions are released.

#### Scenario: Actions pinned to digest
- **WHEN** all workflow files are inspected
- **THEN** every `uses:` line references a SHA digest, not a version tag

#### Scenario: Renovate updates digest
- **WHEN** a new version of a GitHub Action is released
- **THEN** Renovate opens a PR updating the SHA digest in the workflow file

---

### Requirement: Automerge for patch and minor devDependency updates
Renovate SHALL be configured to automatically merge PRs for `patch` and `minor` version bumps of devDependencies after CI passes. Production dependencies (there are none) and `major` version bumps SHALL require manual approval.

#### Scenario: Minor devDependency automerged
- **WHEN** Renovate opens a PR for a minor devDependency bump and all CI checks pass
- **THEN** Renovate automatically merges the PR

#### Scenario: Major dependency requires approval
- **WHEN** Renovate opens a PR for a major version bump of any dependency
- **THEN** the PR is NOT automerged and requires human review

---

### Requirement: Pin dependency ranges
The Renovate `rangeStrategy` for npm packages SHALL be set to `"pin"`, ensuring all dependencies in `package.json` are pinned to exact versions (e.g., `"vitest": "4.1.2"` not `"^4.1.2"`). This ensures reproducible installs between Renovate updates.

#### Scenario: Pinned version in package.json
- **WHEN** Renovate updates a dependency
- **THEN** the resulting `package.json` entry uses an exact version number with no `^` or `~` prefix

---

### Requirement: Renovate schedule
Renovate SHALL be configured to open PRs on a weekly schedule (Monday mornings) to avoid a constant stream of small PRs. GitHub Actions digest updates MAY follow the same schedule or be grouped.

#### Scenario: PRs batched weekly
- **WHEN** multiple dependency updates are available
- **THEN** Renovate opens one PR per package per week, not immediately on publication

---

### Requirement: Dependency grouping
Renovate SHALL group all `@sveltejs/*` packages into a single PR, and all `@typescript-eslint/*` packages into a single PR, to reduce PR noise when these packages release together.

#### Scenario: SvelteKit packages grouped
- **WHEN** `@sveltejs/kit` and `@sveltejs/adapter-static` both have updates
- **THEN** Renovate opens a single PR updating both packages together

---

### Requirement: renovate.json is valid JSON with schema reference
The `renovate.json` file SHALL remain valid JSON and SHALL include the `$schema` reference:
```json
"$schema": "https://docs.renovatebot.com/renovate-schema.json"
```

#### Scenario: Schema validation passes
- **WHEN** Renovate processes `renovate.json`
- **THEN** no schema validation errors are reported

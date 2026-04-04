# Spec: Renovate Configuration

## Purpose

Defines the Renovate bot configuration for automated dependency updates in the ATU Nieruchomości repository.

## Requirements

### Requirement: renovate.json is valid JSON with schema reference

The `renovate.json` file SHALL remain valid JSON and SHALL include the `$schema` reference:

```json
"$schema": "https://docs.renovatebot.com/renovate-schema.json"
```

#### Scenario: Schema validation passes

- **WHEN** Renovate processes `renovate.json`
- **THEN** no schema validation errors are reported

---

### Requirement: Extends config:recommended

The `renovate.json` SHALL extend `"config:recommended"` to inherit Renovate's recommended defaults (which includes npm/pnpm package manager support, GitHub Actions pinning, and sensible scheduling).

#### Scenario: Renovate creates PRs for npm package updates

- **WHEN** a new version of a dev dependency is published
- **THEN** Renovate opens a PR updating the version in `package.json` and `pnpm-lock.yaml`

---

### Requirement: Automerge for patch and minor updates

Renovate SHALL be configured to automatically merge PRs for `patch` and `minor` version bumps after CI passes. `major` version bumps SHALL require manual approval.

#### Scenario: Minor update automerged

- **WHEN** Renovate opens a PR for a minor version bump and all CI checks pass
- **THEN** Renovate automatically merges the PR

#### Scenario: Major update requires approval

- **WHEN** Renovate opens a PR for a major version bump
- **THEN** the PR is NOT automerged and requires human review

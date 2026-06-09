## Why

Section navigation currently exposes scroll targets as URL fragments such as `/#contact`. Switching to path-based section URLs such as `/contact` makes each section addressable with cleaner, shareable URLs while preserving the existing single-page scroll-snap experience.

## What Changes

- Replace user-facing section navigation URLs from `#[section-id]` fragments to `/[section-id]` paths.
- Keep the same section IDs, scroll-snap layout, active-section behavior, visual presentation, and content.
- Ensure direct visits to section paths scroll to the matching section and keep the single-page experience intact.
- Update navigation interactions so clicking links, side controls, keyboard navigation, and scroll-derived active state use path URLs rather than hash fragments.
- Update tests that assert navigation URL behavior to expect pathnames instead of hashes.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `svelte-app`: Section routing changes from hash fragments to path-based section URLs while preserving the existing single-page section navigation behavior.
- `e2e-tests`: Navigation behavior assertions change from URL hash expectations to path-based section URL expectations.

## Impact

- Affects SvelteKit routing under `src/routes/`, likely requiring a dynamic route for section paths while retaining `/`.
- Affects shared section utilities and navigation components in `src/lib/sections.ts`, `NavBar.svelte`, `SectionNav.svelte`, and section CTA links.
- Affects unit/integration tests around section links and scrolling, plus Playwright navigation tests.
- No new runtime dependencies are expected.

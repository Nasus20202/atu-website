## 1. Routing Structure

- [x] 1.1 Extract the current single-page section markup into a shared Svelte component used by route pages.
- [x] 1.2 Keep `src/routes/+page.svelte` rendering the shared component for `/` without changing visible content or layout.
- [x] 1.3 Add `src/routes/[section]/+page.svelte` to render the same shared component for section paths.
- [x] 1.4 Add dynamic route validation and explicit prerender entries from `SECTION_IDS` so each section path is statically built.

## 2. Section URL Utilities

- [x] 2.1 Add small shared helpers for converting a section ID to `/<section-id>` and validating path segments against `SECTION_IDS`.
- [x] 2.2 Update `scrollToSection` or nearby navigation logic so successful section navigation replaces the URL path instead of writing a hash.
- [x] 2.3 Add initial direct-load behavior so visiting `/<section-id>` scrolls the matching section into view after render.
- [x] 2.4 Avoid redundant `history.replaceState` calls when the current pathname already matches the active section.

## 3. Navigation Components

- [x] 3.1 Update `NavBar.svelte` navigation and active-section observer URL synchronization from `#id` to `/<id>`.
- [x] 3.2 Update `SectionNav.svelte` side arrows, dots, and keyboard navigation to scroll and replace the URL path.
- [x] 3.3 Update section CTA links such as hero and management links to use path-based hrefs.
- [x] 3.4 Preserve the existing menu closing, active styling, scroll-snap, and legal acts dialog behavior.

## 4. Tests

- [x] 4.1 Update unit and component tests that assert section link hrefs or navigation calls to expect path-based section URLs.
- [x] 4.2 Update integration tests for side/keyboard navigation to cover path replacement where applicable.
- [x] 4.3 Update Playwright behavior tests to assert pathname updates and absence of hash fragments.
- [x] 4.4 Add or update an e2e case for directly loading `/kontakt` and seeing the `kontakt` section.

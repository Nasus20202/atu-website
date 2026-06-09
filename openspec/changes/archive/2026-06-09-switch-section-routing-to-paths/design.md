## Context

The site is a SvelteKit static app with a single scroll-snap page containing all sections. Navigation currently scrolls within the page and writes fragment URLs such as `#kontakt` via `history.replaceState`, while some section CTAs still use fragment anchors.

The requested change is intentionally narrow: replace fragment-based section URLs with path-based section URLs (`/[section-id]`) without changing content, visual layout, scroll-snap behavior, or the canonical section IDs.

## Goals / Non-Goals

**Goals:**

- Make every existing section reachable at `/<section-id>` using the same section IDs already defined by `SECTION_IDS`.
- Preserve `/` as the static home page and keep it rendering the same full section page.
- Preserve the current scroll-snap UI and smooth section navigation behavior.
- Keep static prerendering compatible with `@sveltejs/adapter-static`.
- Update affected tests to assert path-based URLs instead of hash fragments.

**Non-Goals:**

- Do not split sections into separate pages or change the page content hierarchy.
- Do not rename section IDs, labels, copy, assets, or CSS classes.
- Do not add redirects, analytics, or new dependencies.
- Do not change legal acts dialog behavior.

## Decisions

1. Reuse the existing page implementation for both `/` and `/<section-id>`.

   The current route already renders all sections and shared navigation controls. Extracting that markup into a shared component, then rendering it from both `src/routes/+page.svelte` and `src/routes/[section]/+page.svelte`, avoids duplicating section markup while preserving the single-page experience.

   Alternative considered: move the content into a layout and have child routes control only scroll state. That would be a broader routing restructure for little benefit.

2. Add a dynamic `[section]` route with explicit static entries.

   SvelteKit static prerendering can discover some dynamic routes by crawling links, but dynamic route instances are safest when declared explicitly. The `[section]` route should export entries for every `SECTION_IDS` value and prerender those paths so `/atu`, `/zarzadzanie`, `/omnie`, `/oferta`, `/uprawnienia`, and `/kontakt` exist in the static build.

   Alternative considered: rely only on crawler-discovered links. That is less robust because section navigation uses buttons and programmatic URL updates in addition to anchors.

3. Treat the URL path as the public section URL, not the source of section identity.

   `SECTION_IDS` remains the canonical list. Utilities should derive a section path as `/${id}` and parse an incoming path segment against `SECTION_IDS`. Unknown section paths should fall through to SvelteKit's normal 404 behavior rather than being silently mapped to the home section.

   Alternative considered: create separate named static routes for each section. That would duplicate route files and make adding or removing sections more error-prone.

4. Preserve replace-style URL updates during section changes.

   Existing navigation uses `history.replaceState`, not push-based history entries, so scrolling through sections does not create a long browser history stack. The path-based implementation should keep that behavior by replacing the current URL with `/${activeSectionId}` when navigation or observer state changes.

   Alternative considered: use SvelteKit `goto` for every section movement. That would make section scrolling behave more like route navigation and risks extra rerenders or history entries for a visual scroll-only interaction.

## Risks / Trade-offs

- Static route omission -> Mitigation: export explicit `[section]` prerender entries from `SECTION_IDS` and verify the built output includes each section path.
- Duplicate URL updates from both navigation clicks and intersection observer -> Mitigation: centralize path generation and only replace the URL when the pathname actually differs.
- Initial direct-load scrolling could run before sections exist -> Mitigation: perform initial section scroll on mount after the shared page content has rendered.
- Browser back behavior remains replace-based rather than preserving section-by-section history -> Mitigation: this intentionally matches current fragment behavior and keeps the change scoped.

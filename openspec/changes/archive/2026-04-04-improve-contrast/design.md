## Context

The site is a single-page SvelteKit app with a scroll-snapped, full-bleed background-image layout. Content sections sit on `.glass-card` elements — frosted-glass panels defined in `src/app.css`. The current glass card light-mode background is `rgba(255,255,255,0.18)` (18% opacity), and text in content sections uses low-alpha white utilities like `text-white/65`, `text-white/35`, and `text-white/60`, which produce insufficient contrast against the semi-transparent card surface in light mode.

Dark mode (via `prefers-color-scheme: dark`) already uses `rgba(0,0,0,0.38)` for the card and renders acceptably. The goal is to improve light-mode legibility without altering the dark-mode appearance.

## Goals / Non-Goals

**Goals:**

- Raise `.glass-card` light-mode background opacity to ≥ 0.72 so the card reads as a distinct surface
- Replace `text-white/*` classes on body/muted/footnote text in content sections with dark-mode-aware alternatives that resolve to `--color-text` / `--color-text-muted` in light mode
- Preserve the frosted-glass visual identity (blur stays, border stays, shape stays)
- Leave the dark-mode appearance unchanged

**Non-Goals:**

- Introducing a JS-based light/dark toggle
- Changing any layout, spacing, animation, or navigation behaviour
- Touching NavBar, SectionNav, GhostButton, or BackgroundLayer (these are UI chrome, not content surfaces, and their translucency is intentional)
- Changing heading text (headings already use `--color-heading` / `text-white` appropriately over the card)

## Decisions

### Decision 1: Raise `.glass-card` opacity to 0.78 (light) / keep 0.38 (dark)

**Chosen:** `background: rgba(255, 255, 255, 0.78)` in light mode.

**Rationale:** At 0.78 the card reads as a clear white surface while the background image is still faintly visible through the blur, preserving depth. Values above 0.90 eliminate the glass effect entirely; values below 0.65 still leave the card too washed-out in bright lighting. 0.78 is a practical middle ground that satisfies WCAG AA contrast for dark text on the resulting surface.

**Alternatives considered:**

- 0.60 — still too translucent for easy reading
- 0.90 — loses the glass identity, looks like a plain white box
- Switching to a solid `--color-surface` background — would break the glass-card aesthetic entirely

### Decision 2: Replace `text-white/*` with semantic dark-mode-aware Tailwind classes

**Chosen:** Use `text-text` (maps to `--color-text`) for body paragraphs and `text-text-muted` (maps to `--color-text-muted`) for secondary/footnote text, both of which automatically switch to their light values (`#3a3a3a` / `#6b7280`) in light mode and to the dark-mode overrides (`#d4dde8` / `#8fa3b8`) in dark mode.

For text that is intentionally on a _dark_ background (e.g. the dark overlay in `ContactSection`, caption overlays), `text-white/*` classes remain appropriate and are left untouched.

**Rationale:** Semantic token classes are a single change per text node and automatically correct for both modes. The alternative — wrapping with `light:text-text dark:text-white/80` — is more verbose and Tailwind v4 does not ship a `light:` variant by default.

**Affected text nodes per section:**

- `ManagementSection`: body (`text-white/80`→`text-text`), bullet desc (`text-white/65`→`text-text-muted`)
- `AboutSection`: body (`text-white/82`→`text-text`), footer note (`text-white/60`→`text-text-muted`)
- `OfferSection`: body (`text-white/80`→`text-text`), list items (`text-white/72`, `text-white/70`→`text-text-muted`), footer note (`text-white/35`→`text-text-muted`)
- `ContactSection`: contact links stay `text-white/85` (dark section), footer `text-white/30`→leave as-is (on dark overlay)
- `CredentialsSection`: divider text `text-white/75`→`text-text-muted`; caption and lightbox text left untouched (rendered on dark overlays)

### Decision 3: Do not modify the `bg-black/55` full-page overlay in BackgroundLayer

**Rationale:** The overlay darkens the background image globally. Removing or reducing it would make background images bleed through more aggressively, counteracting the contrast improvements. It is unrelated to the card surface contrast.

## Risks / Trade-offs

- **Risk: glass effect feels less dramatic in light mode** → Mitigation: backdrop-filter blur is preserved; the card still visually differs from a flat surface.
- **Risk: dark-mode sections (ContactSection) may look inconsistent** → Mitigation: text in ContactSection that is on the dark overlay (`text-white/85`, `text-white/30`) is intentionally left unchanged.
- **Risk: future tokens added to `@theme` with same naming may conflict** → Mitigation: Tailwind v4 token names `text-text` and `text-text-muted` are already in use in the codebase; no new tokens are introduced.

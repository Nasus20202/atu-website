## Why

The current site uses heavily translucent glass-card backgrounds and low-opacity text (e.g., `text-white/65`, `text-white/35`) that reduce readability, especially in light mode environments. Increasing surface opacity and ensuring dark text on light backgrounds will make content easier to read without sacrificing the visual style.

## What Changes

- Increase `.glass-card` background opacity in light mode from `rgba(255,255,255,0.18)` to a significantly more opaque value
- Adjust body text, muted text, and footnote text in each content section to use higher-contrast values (remove or raise low-opacity `text-white/*` classes in light mode)
- Ensure text rendered on light or semi-transparent surfaces uses a dark color (`--color-text`, `--color-heading`) rather than `text-white/*` in light mode
- Preserve the existing dark-mode appearance, which already provides sufficient contrast on dark backgrounds
- No breaking changes to layout, navigation, animations, or component API

## Capabilities

### New Capabilities

_(none — this is a visual refinement, not a new capability)_

### Modified Capabilities

- `design-system`: Contrast and opacity values for glass surfaces and text are changing — this is a spec-level requirement update (minimum opacity thresholds, text contrast rules for light mode)

## Impact

- `src/app.css`: `.glass-card` background and border opacity tokens
- `src/lib/components/sections/*.svelte`: text opacity classes across all six content sections
- No API, routing, or dependency changes

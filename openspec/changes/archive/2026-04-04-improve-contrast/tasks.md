## 1. Glass Card Opacity

- [x] 1.1 In `src/app.css`, update `.glass-card` light-mode `background` from `rgba(255, 255, 255, 0.18)` to `rgba(255, 255, 255, 0.78)`
- [x] 1.2 Verify the dark-mode `.glass-card` override (`rgba(0, 0, 0, 0.38)`) is unchanged in the `@media (prefers-color-scheme: dark)` block

## 2. ManagementSection Text Contrast

- [x] 2.1 Replace `text-white/80` on body paragraph(s) with `text-text`
- [x] 2.2 Replace `text-white/65` on bullet descriptions with `text-text-muted`

## 3. AboutSection Text Contrast

- [x] 3.1 Replace `text-white/82` (or similar) on body paragraph(s) with `text-text`
- [x] 3.2 Replace `text-white/60` on footer/license note text with `text-text-muted`

## 4. OfferSection Text Contrast

- [x] 4.1 Replace `text-white/80` on body paragraph(s) with `text-text`
- [x] 4.2 Replace `text-white/72` and `text-white/70` on list items with `text-text-muted`
- [x] 4.3 Replace `text-white/35` on footer note with `text-text-muted`

## 5. CredentialsSection Text Contrast

- [x] 5.1 Replace `text-white/75` on divider or caption text (outside dark overlays) with `text-text-muted`
- [x] 5.2 Confirm caption overlay text and lightbox text (rendered on dark backgrounds) retain their existing `text-white/*` classes

## 6. Verification

- [x] 6.1 Visually check all six sections in light mode — card surfaces are clearly white/near-white and body text is dark
- [x] 6.2 Visually check all six sections in dark mode — no regressions; text remains light and card remains dark
- [x] 6.3 Confirm ContactSection contact links and footer text are unaffected (they sit on a dark overlay and should keep `text-white/*`)

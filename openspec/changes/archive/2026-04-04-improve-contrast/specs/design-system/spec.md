## MODIFIED Requirements

### Requirement: Glass card component

Sections with content overlaid on background images SHALL use a frosted-glass card style (`.glass-card` class) defined in `app.css`:

- `background: rgba(255, 255, 255, 0.78)` (light mode — raised from 0.18 for legibility)
- `-webkit-backdrop-filter: blur(24px)` and `backdrop-filter: blur(24px)`
- `border: 1px solid rgba(255, 255, 255, 0.22)`
- `border-radius: var(--radius-lg)`

In dark mode, `.glass-card` SHALL use `background: rgba(0, 0, 0, 0.38)` (unchanged).

#### Scenario: Glass card renders on background image

- **WHEN** a section with a background image is viewed in light mode
- **THEN** the content card has a visible frosted-glass blur effect and the card surface is predominantly white (≥ 0.78 opacity)

#### Scenario: Glass card dark mode unchanged

- **WHEN** a section with a background image is viewed in dark mode
- **THEN** the content card background is `rgba(0,0,0,0.38)`

## ADDED Requirements

### Requirement: Content section text contrast in light mode

Body text, muted text, and secondary text within content sections SHALL use semantic color tokens (`--color-text`, `--color-text-muted`) rather than fixed `text-white/*` opacity utilities, so that text resolves to dark values in light mode and light values in dark mode automatically.

Specifically:

- Primary body paragraphs SHALL use `text-text` (resolves to `#3a3a3a` light / `#d4dde8` dark)
- Secondary/muted text (bullet descriptions, footnotes, divider captions) SHALL use `text-text-muted` (resolves to `#6b7280` light / `#8fa3b8` dark)
- Text that is intentionally rendered over a dark overlay (e.g. ContactSection content on its dark background, caption overlays in CredentialsSection) MAY continue using `text-white/*` utilities

#### Scenario: Body text readable in light mode

- **WHEN** the OS color scheme is light
- **THEN** body paragraphs in ManagementSection, AboutSection, OfferSection, and CredentialsSection display as dark text (≥ 4.5:1 contrast ratio against the glass card surface)

#### Scenario: Body text readable in dark mode

- **WHEN** the OS color scheme is dark
- **THEN** body paragraphs in the same sections display as light text appropriate for the dark glass card surface

#### Scenario: Dark-overlay text unchanged

- **WHEN** text is rendered directly over a dark overlay (ContactSection, caption overlays)
- **THEN** `text-white/*` classes remain and text appears white regardless of color scheme

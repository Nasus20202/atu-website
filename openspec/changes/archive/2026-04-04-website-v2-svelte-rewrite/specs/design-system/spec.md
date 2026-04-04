## ADDED Requirements

### Requirement: CSS custom properties design tokens
The application SHALL define all design tokens as CSS custom properties on `:root` in `src/app.css`. No hardcoded colour values, font names, or spacing values SHALL appear in component `<style>` blocks — all SHALL reference a token. The following tokens are required as a minimum:

| Token | Value |
|---|---|
| `--color-primary` | `#2a6496` |
| `--color-primary-dark` | `#1e4d73` |
| `--color-primary-light` | `#3a85c7` |
| `--color-text` | `#3d3d3d` |
| `--color-text-muted` | `#6b7280` |
| `--color-bg` | `#ffffff` |
| `--color-bg-dark` | `#0d1f2d` |
| `--color-surface` | `#f8f9fa` |
| `--font-heading` | `'Raleway', sans-serif` |
| `--font-body` | `'Inter', sans-serif` |
| `--radius` | `0.5rem` |
| `--radius-lg` | `1rem` |
| `--shadow-sm` | `0 1px 4px rgb(0 0 0 / 0.06)` |
| `--shadow` | `0 2px 12px rgb(0 0 0 / 0.08)` |
| `--shadow-lg` | `0 8px 32px rgb(0 0 0 / 0.12)` |
| `--transition` | `200ms ease` |
| `--transition-slow` | `400ms ease` |
| `--max-width` | `1280px` |

#### Scenario: Token used in component
- **WHEN** a component style block sets a colour
- **THEN** the value references a `var(--color-*)` token, not a literal hex value

#### Scenario: Token override at component level
- **WHEN** a section requires a dark background variant
- **THEN** the component sets `background: var(--color-bg-dark)` and adjusts text colour via tokens

---

### Requirement: Typography scale
The application SHALL use two Google Fonts: **Raleway** (weights 400, 600, 700, 900) for headings and **Inter** (Variable font, weights 400–700) for body text. Both SHALL be loaded via `<link>` in `src/app.html` with `rel="preconnect"` for performance. A global type scale SHALL be defined in `app.css`:

| Element | Size | Weight | Font |
|---|---|---|---|
| `h1` | `clamp(2.5rem, 5vw, 4rem)` | 900 | Raleway |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | Raleway |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | Raleway |
| `p`, `li` | `1.125rem` | 400 | Inter |
| `small` | `0.875rem` | 400 | Inter |

#### Scenario: Heading font applied
- **WHEN** the page is rendered
- **THEN** all `<h1>`, `<h2>`, `<h3>` elements have `font-family` computed as Raleway

#### Scenario: Body font applied
- **WHEN** the page is rendered
- **THEN** the `<body>` element has `font-family` computed as Inter

---

### Requirement: Responsive layout — mobile first
All layout SHALL be implemented mobile-first. The following breakpoints SHALL be used consistently across all components (defined as CSS custom properties or a `breakpoints.css` partial):

| Name | Min-width |
|---|---|
| `sm` | `480px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |

No component SHALL use a max-width media query as the primary layout strategy. Content SHALL be readable on viewports from 320px to 2560px.

#### Scenario: Mobile layout
- **WHEN** the viewport is 375px wide
- **THEN** navigation is collapsed to a hamburger menu and content is single-column

#### Scenario: Desktop layout
- **WHEN** the viewport is 1280px wide
- **THEN** navigation links are visible horizontally and multi-column layouts are applied where appropriate

---

### Requirement: Navigation bar behaviour
The `NavBar` component SHALL be fixed to the top of the viewport. On page load the background SHALL be transparent (over the hero). Once the user scrolls past 80px, the background SHALL transition to white with a box-shadow. On mobile (below `md` breakpoint) the links SHALL be hidden behind a hamburger toggle button.

#### Scenario: Navbar transparent on load
- **WHEN** the page is at scroll position 0
- **THEN** the navbar background is transparent

#### Scenario: Navbar opaque on scroll
- **WHEN** the page is scrolled to 100px
- **THEN** the navbar has a white background and visible box-shadow

#### Scenario: Hamburger menu toggle
- **WHEN** viewport width is below 768px and the hamburger button is activated
- **THEN** the nav link list becomes visible

---

### Requirement: Section backgrounds and parallax
- The hero (`#atu`) section SHALL be full viewport height (100vh) with `img/infinite-loop-01.jpg` as a fixed-attachment (parallax) background on desktop; `background-attachment: scroll` on mobile for performance.
- The "O mnie" section (`#omnie`) SHALL use `img/bg1.webp` as a fixed-attachment background.
- The "Uprawnienia" section (`#uprawnienia`) SHALL use `img/bg2.webp` as a fixed-attachment background.
- The "Kontakt" section (`#contact`) SHALL have `var(--color-bg-dark)` as background with light text.

#### Scenario: Hero full height
- **WHEN** the home page is rendered at any viewport
- **THEN** the hero section height is equal to 100vh

#### Scenario: Parallax disabled on mobile
- **WHEN** the viewport width is below 768px
- **THEN** the hero background has `background-attachment: scroll`

---

### Requirement: Buttons and interactive elements
All interactive elements SHALL have visible focus indicators (`:focus-visible` outline using `--color-primary-light`). The primary call-to-action button style SHALL use `--color-primary` background, white text, `--radius` border-radius, and a hover state that transitions to `--color-primary-dark` using `--transition`.

#### Scenario: Focus indicator visible
- **WHEN** a button is focused via keyboard
- **THEN** a visible outline using the primary colour is displayed

#### Scenario: Button hover transition
- **WHEN** a pointer hovers over a primary button
- **THEN** the background colour transitions to `--color-primary-dark` within `--transition` duration

---

### Requirement: Credentials gallery hover effect
The credentials section image grid SHALL display a hover overlay effect (caption appears on hover) implemented purely in CSS, replacing the removed Magnific Popup / "effect-honey" jQuery-based effect.

#### Scenario: Overlay on hover
- **WHEN** a pointer enters a gallery figure element
- **THEN** a semi-transparent overlay with the image caption appears via CSS transition

#### Scenario: No JavaScript required for hover
- **WHEN** JavaScript is disabled in the browser
- **THEN** the gallery images are still visible and the hover overlay still functions

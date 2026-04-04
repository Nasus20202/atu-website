# Spec: Design System

## Purpose

Defines the visual design tokens, typography, layout patterns, and component styles for the ATU Nieruchomości website, implemented with Tailwind CSS v4.

## Requirements

### Requirement: Tailwind v4 design tokens via @theme

The application SHALL define all design tokens as CSS custom properties inside a `@theme` block in `src/app.css`, making them available as Tailwind utilities automatically. The following tokens are required:

**Fonts:**
| Token | Value |
|---|---|
| `--font-body` | `'Inter', system-ui, sans-serif` |
| `--font-heading` | `'Raleway', 'Inter', system-ui, sans-serif` |

**Brand colours:**
| Token | Value |
|---|---|
| `--color-primary` | `#2a6496` |
| `--color-primary-hover` | `#3a85c5` |
| `--color-accent` | `#1a4a70` |

**Surfaces:**
| Token | Value |
|---|---|
| `--color-bg` | `#ffffff` |
| `--color-bg-alt` | `#f4f7fa` |
| `--color-surface` | `#ffffff` |

**Text:**
| Token | Value |
|---|---|
| `--color-text` | `#3a3a3a` |
| `--color-text-muted` | `#6b7280` |
| `--color-text-on-dark` | `#f0f4f8` |
| `--color-heading` | `#1e3a5f` |

**Links:**
| Token | Value |
|---|---|
| `--color-link` | `#4aaaf5` |
| `--color-link-hover` | `#d44` |

**Borders / Cards:**
| Token | Value |
|---|---|
| `--color-border` | `#dde3ea` |
| `--color-card-bg` | `#f8fafd` |
| `--color-card-border` | `#dde3ea` |

**Accent (dark sections):**
| Token | Value |
|---|---|
| `--color-sky` | `#7dd3fc` |
| `--color-sky-light` | `#bae6fd` |

**Navigation:**
| Token | Value |
|---|---|
| `--color-nav-scrolled-bg` | `rgba(255, 255, 255, 0.97)` |
| `--color-nav-dark-scrolled-bg` | `rgba(15, 25, 35, 0.97)` |

**Dialog:**
| Token | Value |
|---|---|
| `--color-dialog-backdrop` | `rgba(0, 0, 0, 0.85)` |

**Border radius:**
| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `16px` |

**Z-index:**
| Token | Value |
|---|---|
| `--z-bg` | `0` |
| `--z-snap` | `1` |
| `--z-nav` | `1000` |
| `--z-dialog` | `9000` |

#### Scenario: Token used in component

- **WHEN** a component sets a colour or radius
- **THEN** the value references a `var(--color-*)` or `--radius-*` token via a Tailwind utility class, not a literal hex value

---

### Requirement: Dark mode support

The application SHALL support `prefers-color-scheme: dark` via a `@media (prefers-color-scheme: dark)` block in `app.css` that overrides surface, text, and colour tokens on `:root`. No separate dark mode class toggle is required.

**Dark mode token overrides:**
| Token | Dark value |
|---|---|
| `--color-primary` | `#4a9fd4` |
| `--color-primary-hover` | `#6bbce8` |
| `--color-bg` | `#0f1923` |
| `--color-bg-alt` | `#16232f` |
| `--color-surface` | `#1a2d3f` |
| `--color-text` | `#d4dde8` |
| `--color-text-muted` | `#8fa3b8` |
| `--color-text-on-dark` | `#e8f0f8` |
| `--color-heading` | `#a8c8e8` |
| `--color-link` | `#4a9fd4` |
| `--color-link-hover` | `#e07a5f` |
| `--color-border` | `#2a3e52` |
| `--color-card-bg` | `#1a2d3f` |
| `--color-card-border` | `#2a3e52` |
| `--color-dialog-backdrop` | `rgba(0, 0, 0, 0.93)` |

#### Scenario: Dark mode colours applied

- **WHEN** the OS dark mode preference is active
- **THEN** background and text colours switch to the dark palette defined above

---

### Requirement: Typography

The application SHALL use two Google Fonts: **Raleway** (weights 300, 400, 600, 700) for headings and **Inter** (weights 400, 500, 600) for body text. Both SHALL be loaded via `<link>` tags in `src/app.html` with `rel="preconnect"` for performance.

Global typography defaults in `app.css`:

- `body`: `font-family: var(--font-body)`, `font-size: 17px`
- `h1`–`h4`: `font-family: var(--font-heading)`, `line-height: 1.2`

#### Scenario: Heading font applied

- **WHEN** the page is rendered
- **THEN** all `<h1>`–`<h4>` elements use Raleway

#### Scenario: Body font applied

- **WHEN** the page is rendered
- **THEN** the `<body>` element uses Inter

---

### Requirement: Responsive layout — mobile first

All layout SHALL be implemented mobile-first using Tailwind's responsive prefix utilities. Content SHALL be readable on viewports from 320px to 2560px. No component SHALL use a max-width media query as the primary layout strategy.

#### Scenario: Mobile layout

- **WHEN** the viewport is 375px wide
- **THEN** navigation is collapsed to a hamburger menu and content is single-column

#### Scenario: Desktop layout

- **WHEN** the viewport is 1280px wide
- **THEN** navigation links are visible horizontally and multi-column layouts are applied where appropriate

---

### Requirement: Navigation bar behaviour

The `NavBar` component SHALL be fixed to the top of the viewport (`z-(--z-nav)`). On page load the background SHALL be transparent. Once the user scrolls past 80px in the `.snap-root` container, the background SHALL transition to a frosted/semi-opaque white (or dark in dark mode) with a box-shadow. On mobile (below `md` breakpoint) the links SHALL be hidden behind a hamburger toggle button. The navbar SHALL track the active section using an Intersection Observer and update the URL hash accordingly.

#### Scenario: Navbar transparent on load

- **WHEN** the page is at scroll position 0
- **THEN** the navbar background is transparent

#### Scenario: Navbar opaque on scroll

- **WHEN** the snap-root is scrolled past 80px
- **THEN** the navbar has a semi-opaque background (`--color-nav-scrolled-bg`) and visible box-shadow

#### Scenario: Hamburger menu toggle

- **WHEN** viewport width is below 768px and the hamburger button is activated
- **THEN** the nav link list becomes visible

---

### Requirement: Section backgrounds and parallax

- The hero (`#atu`) section SHALL use `img/infinite-loop-01.jpg` as background.
- The "O mnie" section (`#omnie`) SHALL use `img/bg1.webp` as background.
- The "Uprawnienia" section (`#uprawnienia`) SHALL use `img/bg2.webp` as background.
- The "Kontakt" section (`#contact`) SHALL have a dark background with light text.
- On desktop, background images SHALL use `background-attachment: fixed` (parallax effect); on mobile `background-attachment: scroll` for performance.

#### Scenario: Hero background present

- **WHEN** the home page is rendered
- **THEN** the hero section displays the `/img/infinite-loop-01.jpg` background image

#### Scenario: Parallax disabled on mobile

- **WHEN** the viewport width is below 768px
- **THEN** background images use `background-attachment: scroll`

---

### Requirement: Glass card component

Sections with content overlaid on background images SHALL use a frosted-glass card style (`.glass-card` class) defined in `app.css`:

- `background: rgba(255, 255, 255, 0.18)`
- `-webkit-backdrop-filter: blur(24px)` and `backdrop-filter: blur(24px)`
- `border: 1px solid rgba(255, 255, 255, 0.22)`
- `border-radius: var(--radius-lg)`

In dark mode, `.glass-card` SHALL use `background: rgba(0, 0, 0, 0.38)`.

#### Scenario: Glass card renders on background image

- **WHEN** a section with a background image is viewed
- **THEN** the content card has a visible frosted-glass blur effect

---

### Requirement: Full-page scroll-snap layout classes

The `app.css` SHALL define the following reusable utility classes:

- `.snap-root` — `position: fixed; inset: 0; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; scrollbar-width: none`
- `.snap-section` — `height: 100dvh; min-height: 480px; scroll-snap-align: start; scroll-snap-stop: always`
- `.inner-scroll` — internal scroll container with `padding-top: 5rem`, `padding-bottom: 2.5rem`, and `overflow-y: auto`

#### Scenario: Snap classes applied

- **WHEN** the home page DOM is inspected
- **THEN** a `.snap-root` element wraps all `.snap-section` elements

---

### Requirement: Credentials gallery hover effect

The credentials section SHALL display licence photos with a hover overlay effect (caption slides up on hover) implemented via CSS/Tailwind transitions, with no JavaScript required for the effect itself.

#### Scenario: Overlay on hover

- **WHEN** a pointer enters a gallery figure/button element
- **THEN** the image caption overlay becomes visible via CSS transition

#### Scenario: Lightbox is JavaScript-powered

- **WHEN** a photo is clicked
- **THEN** a native `<dialog>` lightbox opens (this part requires JS; the hover overlay does not)

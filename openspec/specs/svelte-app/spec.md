# Spec: SvelteKit Application

## Purpose

Defines the structure, routing, component architecture, and content requirements for the ATU Nieruchomości SvelteKit 2 static application.

## Requirements

### Requirement: SvelteKit static application scaffold

The system SHALL be a SvelteKit 2 application using `@sveltejs/adapter-static`, configured to pre-render all routes at build time. The project SHALL use pnpm as the sole package manager, declared in `package.json` via the `packageManager` field. An `.npmrc` file SHALL set `engine-strict=true` to prevent use of npm or yarn.

#### Scenario: Build produces static output

- **WHEN** `pnpm build` is executed
- **THEN** a fully static site is produced in the `build/` directory containing `index.html` and all referenced assets

#### Scenario: pnpm enforced

- **WHEN** a developer runs `npm install` or `yarn install`
- **THEN** the command fails with an engine-strict error

#### Scenario: Dev server starts

- **WHEN** `pnpm dev` is executed
- **THEN** a local development server starts on port 5173 with hot-module replacement

---

### Requirement: TypeScript strict mode throughout

The SvelteKit application SHALL use TypeScript with `strict: true` in `tsconfig.json`. No `// @ts-ignore` or `// @ts-expect-error` comments are permitted except where explicitly justified by a code comment.

#### Scenario: Type-check passes on clean code

- **WHEN** `pnpm check` is executed on the project
- **THEN** it exits with code 0 and reports zero errors and zero warnings

#### Scenario: Implicit any is rejected

- **WHEN** a `.ts` or `.svelte` file introduces a variable without an explicit type and no inference is possible
- **THEN** `pnpm check` reports a type error

---

### Requirement: Single-page routing with section-based navigation

The application SHALL have a single route `/` (`src/routes/+page.svelte`) that renders all content sections on one page using scroll-snap. Legal acts content SHALL be presented in a native `<dialog>` (via `LegalActsDialog.svelte`) rather than a separate route. A shared layout (`src/routes/+layout.svelte`) SHALL include the navigation bar and global styles.

#### Scenario: Home page pre-rendered

- **WHEN** the static build is inspected
- **THEN** `build/index.html` exists and contains the text "ATU Nieruchomości"

#### Scenario: Legal acts dialog opens

- **WHEN** a user activates the "Uprawnienia i akty" navigation link or a trigger inside the credentials section
- **THEN** a `<dialog>` element opens displaying the legal acts list

---

### Requirement: Component structure

The application SHALL decompose the home page into named Svelte components organised in two subdirectories under `src/lib/components/`:

**Sections** (`src/lib/components/sections/`):

- `HeroSection.svelte` — full-height hero with parallax background
- `ManagementSection.svelte` — "Zarządzanie" section with pillars and service scope
- `AboutSection.svelte` — "O mnie" section with owner bio and credentials
- `OfferSection.svelte` — "Oferta" section with detailed list of duties
- `CredentialsSection.svelte` — "Uprawnienia" section with licence photo gallery and lightbox
- `ContactSection.svelte` — "Kontakt" section with contact details (no map)
- `LegalActsDialog.svelte` — native `<dialog>` displaying the list of legal acts

**UI** (`src/lib/components/ui/`):

- `NavBar.svelte` — fixed navigation bar with scroll-aware styling, section observer, and mobile hamburger menu
- `BackgroundLayer.svelte` — background image/video layer component
- `BulletItem.svelte` — reusable styled list item
- `GhostButton.svelte` — ghost-style button component
- `SectionLabel.svelte` — styled section label/eyebrow text
- `SectionLink.svelte` — styled anchor link for sections
- `SectionNav.svelte` — section-level navigation helper

#### Scenario: All sections render

- **WHEN** the home page is visited in a browser
- **THEN** all section components are visible in the DOM

#### Scenario: NavBar mobile menu toggles

- **WHEN** the viewport is 375px wide and the hamburger button is clicked
- **THEN** the navigation links become visible

---

### Requirement: All Polish text content preserved

Every piece of user-visible text from the original `src/index.html` and `src/akty.html` SHALL be reproduced in the new application, including company name, owner name, licence number, address, phone number, email address, section headings, body paragraphs, service list items, and legal act links.

#### Scenario: Contact details present

- **WHEN** the home page is rendered
- **THEN** the phone number "601-64-01-46", email "zwm24@wp.pl", and address "Al. Grunwaldzka 609 B / 32, 80-337 Gdańsk" are all present in the DOM

#### Scenario: Legal act links present

- **WHEN** the legal acts dialog is opened
- **THEN** all Polish legal act links are present and point to their original external URLs

---

### Requirement: Images migrated to static directory

All images SHALL be stored in `static/img/` in the SvelteKit project. Image references in components SHALL use root-relative paths (e.g., `/img/bg1.webp`).

#### Scenario: Hero background image loads

- **WHEN** the home page is visited
- **THEN** the hero section background image `/img/infinite-loop-01.jpg` returns HTTP 200

---

### Requirement: Map removed from contact section

The embedded Google Maps iframe SHALL NOT be present. The contact section SHALL display only textual contact information.

#### Scenario: No iframe in contact section

- **WHEN** the contact section DOM is inspected
- **THEN** no `<iframe>` element is present

---

### Requirement: SEO meta tags and language

The `<html>` element SHALL have `lang="pl"`. Each page SHALL have a `<title>` and a `<meta name="description">` tag. The home page title SHALL be "ATU Nieruchomości — Zarządzanie Wspólnotami Mieszkaniowymi".

#### Scenario: lang attribute set

- **WHEN** the home page HTML is fetched
- **THEN** the `<html>` element has `lang="pl"`

#### Scenario: Page title correct

- **WHEN** the home page is loaded in a browser
- **THEN** the document title is "ATU Nieruchomości — Zarządzanie Wspólnotami Mieszkaniowymi"

---

### Requirement: Icon library — lucide-svelte

The application SHALL use `lucide-svelte` for all icons. No Font Awesome files SHALL be present in the repository.

#### Scenario: Icons render via lucide-svelte

- **WHEN** the management section is rendered
- **THEN** the pillar icons are rendered as SVG elements from lucide-svelte

---

### Requirement: Native dialog lightbox for credentials gallery

The credentials section SHALL display licence photos in a grid. Clicking a photo SHALL open it in a native `<dialog>` element acting as a lightbox, with a close button. No third-party lightbox library SHALL be used.

#### Scenario: Lightbox opens on click

- **WHEN** a user clicks a licence photo in the credentials section
- **THEN** a `<dialog>` element opens displaying the full-size image

#### Scenario: Lightbox closes

- **WHEN** the close button inside the dialog is clicked
- **THEN** the `<dialog>` closes and focus returns to the triggering element

---

### Requirement: Full-page scroll-snap layout

The home page SHALL use CSS scroll-snap (`scroll-snap-type: y mandatory`) applied to a `.snap-root` container. Each section SHALL be a `.snap-section` element with `height: 100dvh` and `scroll-snap-align: start`. Sections with content taller than the viewport SHALL allow internal scrolling via an `.inner-scroll` wrapper.

#### Scenario: Sections snap on scroll

- **WHEN** a user scrolls on the home page
- **THEN** the viewport snaps to the nearest section boundary

#### Scenario: Tall sections scroll internally

- **WHEN** a section's content exceeds the viewport height
- **THEN** the content is scrollable within the section without affecting the snap container

---

### Requirement: Keyboard navigation between sections

The `SectionNav` component SHALL register a global `keydown` listener on `window` (added on mount, removed on unmount) that allows the user to navigate between sections using the keyboard. The following key bindings SHALL be supported:

| Keys                                           | Action                     |
| ---------------------------------------------- | -------------------------- |
| `ArrowDown`, `PageDown`, `ArrowRight`, `Enter` | Scroll to next section     |
| `ArrowUp`, `PageUp`, `ArrowLeft`, `Backspace`  | Scroll to previous section |
| `Home`                                         | Jump to first section      |
| `End`                                          | Jump to last section       |

Navigation past the first or last section SHALL be a no-op (no wrapping). All navigating keys SHALL call `event.preventDefault()` to suppress default browser scroll behaviour.

#### Scenario: ArrowDown advances to next section

- **WHEN** the user presses `ArrowDown` while not on the last section
- **THEN** the page smoothly scrolls to the next section

#### Scenario: ArrowUp goes to previous section

- **WHEN** the user presses `ArrowUp` while not on the first section
- **THEN** the page smoothly scrolls to the previous section

#### Scenario: Navigation blocked at boundaries

- **WHEN** the user presses a backward key on the first section or a forward key on the last section
- **THEN** the page does not scroll

#### Scenario: Home and End jump to extremes

- **WHEN** the user presses `Home`
- **THEN** the page scrolls to the first section (`#atu`)
- **WHEN** the user presses `End`
- **THEN** the page scrolls to the last section (`#contact`)

#### Scenario: Listener cleaned up on unmount

- **WHEN** the `SectionNav` component is removed from the DOM
- **THEN** the `keydown` listener is removed from `window`

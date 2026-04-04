## ADDED Requirements

### Requirement: SvelteKit static application scaffold
The system SHALL be a SvelteKit 2 application using `@sveltejs/adapter-static`, configured to pre-render all routes at build time. The project SHALL use pnpm as the sole package manager, declared in `package.json` via the `packageManager` field. An `.npmrc` file SHALL set `engine-strict=true` to prevent use of npm or yarn.

#### Scenario: Build produces static output
- **WHEN** `pnpm build` is executed
- **THEN** a fully static site is produced in the `build/` directory containing `index.html`, `akty/index.html`, and all referenced assets

#### Scenario: pnpm enforced
- **WHEN** a developer runs `npm install` or `yarn install`
- **THEN** the command fails with an engine-strict error

#### Scenario: Dev server starts
- **WHEN** `pnpm dev` is executed
- **THEN** a local development server starts on port 5173 with hot-module replacement

---

### Requirement: TypeScript strict mode throughout
The SvelteKit application SHALL use TypeScript with `strict: true` in `tsconfig.json`. The configuration SHALL also set `noImplicitAny: true`, `exactOptionalPropertyTypes: true`, and `noUncheckedIndexedAccess: true`. No `// @ts-ignore` or `// @ts-expect-error` comments are permitted except where explicitly justified by a code comment.

#### Scenario: Type-check passes on clean code
- **WHEN** `pnpm svelte-check` is executed on the project
- **THEN** it exits with code 0 and reports zero errors and zero warnings

#### Scenario: Implicit any is rejected
- **WHEN** a `.ts` or `.svelte` file introduces a variable without an explicit type and no inference is possible
- **THEN** `svelte-check` reports a type error

---

### Requirement: Page routing — home and legal acts
The application SHALL have exactly two routes: `/` (home, maps to `src/routes/+page.svelte`) and `/akty` (legal acts, maps to `src/routes/akty/+page.svelte`). Both routes SHALL be pre-rendered. A shared layout (`src/routes/+layout.svelte`) SHALL include the navigation bar and any global styles.

#### Scenario: Home page pre-rendered
- **WHEN** the static build is inspected
- **THEN** `build/index.html` exists and contains the text "ATU Nieruchomości"

#### Scenario: Legal acts page pre-rendered
- **WHEN** the static build is inspected
- **THEN** `build/akty/index.html` exists and contains the text "Akty prawne"

#### Scenario: Navigation links work
- **WHEN** a user visits `/` and clicks the "Uprawnienia i akty" nav link
- **THEN** the browser navigates to `/akty`

---

### Requirement: Component structure
The application SHALL decompose the home page into the following named Svelte components, each in `src/lib/components/`:
- `NavBar.svelte` — fixed navigation bar with scroll-aware styling and mobile hamburger menu
- `HeroSection.svelte` — full-height hero with parallax background
- `ManagementSection.svelte` — "Zarządzanie" section with 4 pillars and service scope
- `AboutSection.svelte` — "O mnie" section with owner bio and credentials
- `OfferSection.svelte` — "Oferta" section with detailed list of duties
- `CredentialsSection.svelte` — "Uprawnienia" section with licence photo gallery
- `ContactSection.svelte` — "Kontakt" section with contact details (no map)
- `Footer.svelte` — copyright bar

#### Scenario: All sections render
- **WHEN** the home page is visited in a browser
- **THEN** all eight component sections are visible in the DOM

#### Scenario: NavBar mobile menu toggles
- **WHEN** the viewport is 375px wide and the hamburger button is clicked
- **THEN** the navigation links become visible

---

### Requirement: All Polish text content preserved
Every piece of user-visible text from the existing `src/index.html` and `src/akty.html` SHALL be reproduced verbatim in the new application, including company name, owner name, licence number, address, phone number, email address, section headings, body paragraphs, service list items, and legal act links.

#### Scenario: Contact details present
- **WHEN** the home page is rendered
- **THEN** the phone number "601-64-01-46", email "zwm24@wp.pl", and address "Al. Grunwaldzka 609 B / 32, 80-337 Gdańsk" are all present in the DOM

#### Scenario: Legal act links present
- **WHEN** `/akty` is visited
- **THEN** all 8 Polish legal act links are present and point to their original external URLs

---

### Requirement: Images migrated to static directory
All images from `src/img/` SHALL be copied to `static/img/` in the SvelteKit project. Image references in components SHALL use root-relative paths (e.g., `/img/bg1.webp`).

#### Scenario: Hero background image loads
- **WHEN** the home page is visited
- **THEN** the hero section background image `/img/infinite-loop-01.jpg` returns HTTP 200

---

### Requirement: Map removed from contact section
The embedded Google Maps iframe that previously appeared in the `#contact` section SHALL be removed. The contact section SHALL display only textual contact information.

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
The application SHALL use `lucide-svelte` for all icons, replacing the vendored Font Awesome 6. No Font Awesome files SHALL be present in the repository.

#### Scenario: Icons render via lucide-svelte
- **WHEN** the management section is rendered
- **THEN** the four pillar icons are rendered as SVG elements from lucide-svelte

---

### Requirement: Native dialog lightbox for credentials gallery
The credentials section (`#uprawnienia`) SHALL display licence photos in a CSS grid. Clicking a photo SHALL open it in a native `<dialog>` element acting as a lightbox, with a close button. No third-party lightbox library SHALL be used.

#### Scenario: Lightbox opens on click
- **WHEN** a user clicks a licence photo in the credentials section
- **THEN** a `<dialog>` element opens displaying the full-size image

#### Scenario: Lightbox closes
- **WHEN** the close button inside the dialog is clicked
- **THEN** the `<dialog>` closes and focus returns to the triggering element

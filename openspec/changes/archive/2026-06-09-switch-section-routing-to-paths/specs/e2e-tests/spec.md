## MODIFIED Requirements

### Requirement: Behaviour tests

The `e2e/behaviour.test.ts` file SHALL verify the interactive behaviours of the application. These tests run across all configured browsers.

Required test cases:

**Navigation bar:**

- Navbar is transparent (no background) at page load (scroll position 0)
- After scrolling past 80px, the navbar gains a visible background (`scrolled-nav` class)
- Clicking a navbar link scrolls to the correct section and updates the URL path to `/<section-id>` with no hash fragment
- The brand button ("ATU Nieruchomości") scrolls back to `/atu`
- On mobile viewport: nav links are hidden; hamburger button is visible
- On mobile viewport: clicking the hamburger reveals the nav link list
- On mobile viewport: clicking a nav link closes the menu

**Hero section:**

- The scroll-down arrow button navigates to `/zarzadzanie`

**Section navigation (side arrows + dots):**

- The "Next section" arrow button advances from `/atu` to `/zarzadzanie`
- The "Previous section" arrow is disabled/inert on the first section
- The "Next section" arrow is disabled/inert on the last section

**Keyboard navigation:**

- `ArrowDown` advances to the next section and updates the URL path
- `ArrowUp` retreats to the previous section and updates the URL path
- `Home` jumps to the first section (`/atu`)
- `End` jumps to the last section (`/kontakt`)

**Contact section:**

- The phone link has `href="tel:+48601640146"`
- The primary email link has `href="mailto:zwm24@wp.pl"`
- The secondary email link has `href="mailto:atu@atu.nieruchomosci.pl"`

#### Scenario: Navbar transparent on load

- **WHEN** the page is first loaded at scroll position 0
- **THEN** the `<nav>` element does not have the `scrolled-nav` class

#### Scenario: Navbar opaque after scroll

- **WHEN** the snap-root container is scrolled past 80px
- **THEN** the `<nav>` element has the `scrolled-nav` class

#### Scenario: Nav link scrolls to section

- **WHEN** the user clicks a navbar link (e.g. "Kontakt")
- **THEN** the `#kontakt` section becomes visible and the URL path is `/kontakt` with no hash fragment

#### Scenario: Direct section path loads

- **WHEN** a browser navigates directly to `/kontakt`
- **THEN** the page renders the same single-page app and the `#kontakt` section becomes visible

#### Scenario: Hamburger reveals mobile menu

- **WHEN** the viewport is mobile-sized and the hamburger button is clicked
- **THEN** the navigation link list becomes visible

#### Scenario: Hero arrow navigates to next section

- **WHEN** the down-arrow button in the Hero section is clicked
- **THEN** the `#zarzadzanie` section scrolls into view and the URL path is `/zarzadzanie`

#### Scenario: SectionNav next arrow advances section

- **WHEN** the "Next section" arrow button is clicked on `/atu`
- **THEN** the `#zarzadzanie` section becomes the active section and the URL path is `/zarzadzanie`

#### Scenario: Keyboard ArrowDown navigates forward

- **WHEN** `ArrowDown` is pressed while `#atu` is active
- **THEN** `#zarzadzanie` becomes the active section and the URL path is `/zarzadzanie`

#### Scenario: Keyboard Home jumps to first section

- **WHEN** `Home` is pressed from any section
- **THEN** `#atu` becomes the active section and the URL path is `/atu`

#### Scenario: Keyboard End jumps to last section

- **WHEN** `End` is pressed from any section
- **THEN** `#kontakt` becomes the active section and the URL path is `/kontakt`

#### Scenario: Contact links have correct hrefs

- **WHEN** the contact section is rendered
- **THEN** phone and email anchor elements have the correct `href` attributes

## MODIFIED Requirements

### Requirement: Single-page routing with section-based navigation

The application SHALL have a root route `/` (`src/routes/+page.svelte`) that renders all content sections on one page using scroll-snap. The application SHALL also expose each existing section at a path-based URL using the section ID as the path segment (`/[section-id]`) while rendering the same single-page section experience. Legal acts content SHALL be presented in a native `<dialog>` (via `LegalActsDialog.svelte`) rather than a separate route. A shared layout (`src/routes/+layout.svelte`) SHALL include global styles.

#### Scenario: Home page pre-rendered

- **WHEN** the static build is inspected
- **THEN** `build/index.html` exists and contains the text "ATU Nieruchomości"

#### Scenario: Section path pre-rendered

- **WHEN** the static build is inspected
- **THEN** each path matching the existing section IDs (`/atu`, `/zarzadzanie`, `/omnie`, `/oferta`, `/uprawnienia`, `/kontakt`) is available as a prerendered static route

#### Scenario: Direct section path opens matching section

- **WHEN** a user visits `/kontakt` directly
- **THEN** the single-page app renders all sections and scrolls the `kontakt` section into view

#### Scenario: Section navigation uses path URLs

- **WHEN** a user navigates to a section using the navbar, side controls, keyboard controls, or section CTA links
- **THEN** the matching section scrolls into view and the browser URL path is `/<section-id>` with no hash fragment

#### Scenario: Legal acts dialog opens

- **WHEN** a user activates the "Uprawnienia i akty" navigation link or a trigger inside the credentials section
- **THEN** a `<dialog>` element opens displaying the legal acts list

---

### Requirement: Keyboard navigation between sections

The `SectionNav` component SHALL register a global `keydown` listener on `window` (added on mount, removed on unmount) that allows the user to navigate between sections using the keyboard. The following key bindings SHALL be supported:

| Keys                                           | Action                     |
| ---------------------------------------------- | -------------------------- |
| `ArrowDown`, `PageDown`, `ArrowRight`, `Enter` | Scroll to next section     |
| `ArrowUp`, `PageUp`, `ArrowLeft`, `Backspace`  | Scroll to previous section |
| `Home`                                         | Jump to first section      |
| `End`                                          | Jump to last section       |

Navigation past the first or last section SHALL be a no-op (no wrapping). All navigating keys SHALL call `event.preventDefault()` to suppress default browser scroll behaviour. Successful keyboard navigation SHALL update the browser URL path to the active section path and SHALL NOT add a hash fragment.

#### Scenario: ArrowDown advances to next section

- **WHEN** the user presses `ArrowDown` while not on the last section
- **THEN** the page smoothly scrolls to the next section and the URL path matches that section

#### Scenario: ArrowUp goes to previous section

- **WHEN** the user presses `ArrowUp` while not on the first section
- **THEN** the page smoothly scrolls to the previous section and the URL path matches that section

#### Scenario: Navigation blocked at boundaries

- **WHEN** the user presses a backward key on the first section or a forward key on the last section
- **THEN** the page does not scroll

#### Scenario: Home and End jump to extremes

- **WHEN** the user presses `Home`
- **THEN** the page scrolls to the first section and the URL path is `/atu`
- **WHEN** the user presses `End`
- **THEN** the page scrolls to the last section and the URL path is `/kontakt`

#### Scenario: Listener cleaned up on unmount

- **WHEN** the `SectionNav` component is removed from the DOM
- **THEN** the `keydown` listener is removed from `window`

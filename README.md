# ATU Nieruchomości — Website

Corporate brochure website for **ATU Nieruchomości** (ATU Real Estate), a residential property management company based in Gdańsk, operating in the Tricity (Trójmiasto) area of Poland.

Built as a fully static, single-page scroll-snap application with a dynamic cross-fading background and section-based navigation.

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes mode)
- **Rendering**: Fully static (`@sveltejs/adapter-static`) — no server-side runtime
- **Styling**: Tailwind CSS v4 with custom design tokens (`@theme`)
- **Language**: TypeScript (`strict: true`)
- **Package manager**: pnpm (Node >= 24 required)
- **Served via**: nginx (unprivileged, port 8080)

## Development

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

## Building

Build the static site to `build/`:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## Code Quality

```sh
pnpm check       # TypeScript + Svelte type checking
pnpm lint        # ESLint
pnpm format      # Prettier (auto-format src/)
```

Run tests (Vitest):

```sh
pnpm vitest run
```

## Docker

**Development** (builds locally):

```sh
docker compose -f docker-compose.dev.yaml up
```

**Production** (pulls from GHCR):

```sh
docker compose up
```

The production image is a multi-stage build: `node:24-alpine` for building, `nginxinc/nginx-unprivileged:alpine` for serving on port 8080.

## CI/CD

GitHub Actions (`.github/workflows/build-and-push.yaml`):

- **On every push/PR to `main`**: runs `svelte-check`, ESLint, and Prettier format check
- **On push to `main` only**: builds and publishes a multi-platform (`linux/amd64`, `linux/arm64`) Docker image to GHCR (`ghcr.io/nasus20202/atu-website`) with tags: `latest`, `sha-<hash>`, `YYYYMMDD-HHmmss`, and `2.<run_number>.0`

Dependency updates are managed automatically by Renovate (auto-merges minor and patch).

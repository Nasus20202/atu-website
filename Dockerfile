# Stage 1: Build the SvelteKit static site
FROM node:24.19.0-alpine AS builder

WORKDIR /app

# Enable corepack and install pnpm version from package.json "packageManager" field
RUN corepack enable

# Copy dependency manifests first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack install

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy all source files
COPY . .

RUN pnpm build

# Stage 2: Serve with nginx (unprivileged)
FROM nginxinc/nginx-unprivileged:1.31.3-alpine

WORKDIR /app

USER root
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/build /app

USER nginx
EXPOSE 8080

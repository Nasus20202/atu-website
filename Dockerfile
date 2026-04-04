# Stage 1: Build the SvelteKit static site
FROM node:24.14-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests first for better layer caching
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

RUN pnpm build

# Stage 2: Serve with nginx (unprivileged)
FROM nginxinc/nginx-unprivileged:1.29.5-alpine

WORKDIR /app

USER root
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/build /app

USER nginx
EXPOSE 8080

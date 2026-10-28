# Stage 1: Build the SvelteKit static site
FROM node:26.12.1-alpine@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797 AS builder

WORKDIR /app

# Enable corepack and install pnpm version from package.json "packageManager" field
# Node 26 images no longer bundle corepack, so install it from npm first
# renovate: datasource=npm depName=corepack
ARG COREPACK_VERSION=0.36.0
RUN npm install -g corepack@${COREPACK_VERSION} && corepack enable

# Copy dependency manifests first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack install

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy all source files
COPY . .

RUN pnpm build

# Stage 2: Serve with nginx (unprivileged)
FROM nginxinc/nginx-unprivileged:1.31.7-alpine@sha256:b5047b9b76845eac124358373c6852377c52e4b05834a47647e955dd91cb8f1e

WORKDIR /app

USER root
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/build /app

USER nginx
EXPOSE 8080

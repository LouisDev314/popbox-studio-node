############################
# 1) Base (shared)
############################
FROM node:20-alpine AS base
WORKDIR /app

# Prisma + some native deps commonly needed in Alpine
RUN apk add --no-cache \
  openssl \
  libc6-compat

# Enable pnpm via corepack
RUN corepack enable

############################
# 2) deps (install)
############################
FROM base AS deps

# Only copy files needed to install deps
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

############################
# 3) build (compile + prisma generate)
############################
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma client generation (important when building in Docker)
# If you use prisma.config.ts, prisma CLI still reads schema from there,
# but generate will work fine as long as schema exists in the image.
RUN pnpm prisma generate

# Build TypeScript -> dist
RUN pnpm build

# Prune dev deps to shrink runtime
RUN pnpm prune --prod

############################
# 4) runtime (minimal)
############################
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache \
  openssl \
  libc6-compat

# Copy production node_modules + built app + prisma artifacts
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]

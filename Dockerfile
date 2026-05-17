# Base node image
FROM node:18-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
ARG APP_NAME
RUN turbo prune ${APP_NAME} --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
# Generate Prisma Client
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
ARG APP_NAME
RUN npx turbo run build --filter=${APP_NAME}...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ARG APP_NAME
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

# For now, just copy the dist for standard node apps (api/worker)
COPY --from=installer /app/apps/${APP_NAME}/dist ./apps/${APP_NAME}/dist
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json

CMD node apps/${APP_NAME}/dist/main.js

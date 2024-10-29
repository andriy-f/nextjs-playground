FROM node:22-bookworm-slim as base
ARG APP_ROOT=/app
# RUN set -ex; \
#     apt-get update -y; \
#     apt-get install -y openssl

RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# =====================================
# Install dependencies only when needed
FROM base AS deps
WORKDIR ${APP_ROOT}

# Install dependencies 
COPY package.json package-lock.json ./
ENV NODE_ENV=development
RUN npm ci;


# ========================================
# Rebuild the source code only when needed
FROM base AS builder
ARG APP_ROOT=/app
WORKDIR ${APP_ROOT}
COPY --from=deps ${APP_ROOT}/node_modules ./node_modules
COPY . .

# Disables telemetry Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# =================================================
# Production image, copy all the files and run next
FROM base AS runner
ARG APP_ROOT=/app
WORKDIR ${APP_ROOT}

ENV NODE_ENV=production

# Disables telemetry Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder ${APP_ROOT}/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node ${APP_ROOT}/.next/standalone ./
COPY --from=builder --chown=node:node ${APP_ROOT}/.next/static ./.next/static

USER node

ENV PORT 3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/app/api-reference/next-config-js/output
CMD ["node", "server.js"]
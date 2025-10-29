FROM node:22-bookworm-slim as base
ARG APP_ROOT=/home/node/app
ENV APP_ROOT=${APP_ROOT}
# RUN set -ex; \
#     apt-get update -y; \
#     apt-get install -y openssl

RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN npm uninstall -g yarn pnpm \
    && npm install -g corepack@latest

USER node

ENV MY_BIN_DIR=/home/node/bin
RUN mkdir -p $MY_BIN_DIR
ENV PATH=$PATH:$MY_BIN_DIR

RUN corepack enable --install-directory $MY_BIN_DIR pnpm \
    && corepack install -g pnpm@latest-10

# =====================================
# Install dependencies only when needed
FROM base AS deps
WORKDIR ${APP_ROOT}

# Fetch packaged
COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml ./
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch
RUN pnpm fetch


# ========================================
# Rebuild the source code only when needed
FROM deps AS builder
WORKDIR ${APP_ROOT}
# COPY --from=deps ${APP_ROOT}/node_modules ./node_modules
COPY --chown=node:node . .

# Disables telemetry Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm install -r --offline 
RUN pnpm exec prisma generate
RUN pnpm run build

CMD [ "node_modules/.bin/next", "dev" ]

# =================================================
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR ${APP_ROOT}

ENV NODE_ENV=production

# Disables telemetry Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder ${APP_ROOT}/public ./public

# Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown node:node .next

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
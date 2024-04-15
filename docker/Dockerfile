FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn-lock.yaml ]; then yarn global add yarn && yarn; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env .env.production
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f yarn-lock.yaml ]; then yarn build; \
    else yarn build && echo .env; \
    fi
# 3. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

RUN addgroup -g 1001 -S docker
RUN adduser -S docker -u 1001

COPY --from=builder /app ./

# Disable Next.js telemetry
RUN yarn next telemetry disable

USER docker
EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
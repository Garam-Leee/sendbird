# Install dependencies only when needed
FROM node:18-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN GENERATE_SOURCEMAP=false PORT=8081 TZ=Asia/Seoul NODE_OPTIONS='--inspect'  NEXT_PUBLIC_DEPLOY_MODE=APP_NEXT_PUBLIC_DEPLOY_MODE npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner

RUN apk --update add tzdata && apk --no-cache add curl && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x /app/entrypoint.sh
RUN chmod -R 755 /app/.next

EXPOSE 8081

HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

RUN npx next telemetry disable

ENTRYPOINT ["/app/entrypoint.sh"]

CMD npm run start
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @financial-charts/frontend build

FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=build /app/apps/frontend/public ./apps/frontend/public
COPY --from=build /app/apps/frontend/package.json ./apps/frontend/
WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["pnpm", "start"]

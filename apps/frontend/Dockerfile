FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/database/package.json ./packages/database/
RUN pnpm install --frozen-lockfile --shamefully-hoist
COPY apps/frontend ./apps/frontend
EXPOSE 3000
CMD ["sh", "-c", "cd /app/apps/frontend && /app/node_modules/.bin/next dev"]

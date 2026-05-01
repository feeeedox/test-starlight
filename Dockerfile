FROM node:25-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@11.0.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/docs/package.json ./apps/docs/package.json
COPY apps/team-generator/package.json ./apps/team-generator/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter team-generator generate
RUN pnpm --filter docs build

FROM nginx:alpine AS runtime

COPY --from=builder /app/apps/docs/dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

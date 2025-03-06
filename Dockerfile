ARG VITE_OAPIR_URL="https://vm4072.kaj.pouta.csc.fi/ddas/oapir"

FROM node:20-slim AS base
RUN npm i -g corepack@latest
RUN corepack enable && corepack use pnpm@9
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:alpine
# copy nginx config
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
# copy build
COPY --from=base /app/dist/www /usr/share/nginx/html


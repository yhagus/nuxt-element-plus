FROM node:22-alpine as build

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.6.3 --activate

COPY . /app

RUN pnpm install --prod

COPY . .

RUN pnpm build:template

FROM node:22-alpine as prod

WORKDIR /app

COPY --from=build /app/apps/template/.output /app/.output

EXPOSE 3000

CMD ["/app/.output/server/index.mjs"]

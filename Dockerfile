FROM node:16

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install -g pnpm

RUN pnpm install pm2

RUN pnpm install

RUN pnpm run build

COPY . .

EXPOSE 3000

CMD ["node", "./.output/server/index.mjs"]
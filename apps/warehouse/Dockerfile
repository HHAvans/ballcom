FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build warehouse

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/warehouse .

RUN npm install --omit=dev

EXPOSE 3007

CMD ["node", "main.js"]
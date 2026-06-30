FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build supplier

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/supplier .

RUN npm install --omit=dev

EXPOSE 3004

CMD ["node", "main.js"]

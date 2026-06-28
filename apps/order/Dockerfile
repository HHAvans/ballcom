FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build order

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/order .

RUN npm install --omit=dev

EXPOSE 3001

CMD ["node", "main.js"]
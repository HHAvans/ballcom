FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build payment

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/payment .

RUN npm install --omit=dev

EXPOSE 3004

CMD ["node", "main.js"]

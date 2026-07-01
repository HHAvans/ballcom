FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build customer-support

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/customer-support .

RUN npm install --omit=dev

EXPOSE 3008

CMD ["node", "main.js"]
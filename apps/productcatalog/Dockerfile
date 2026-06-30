FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build productcatalog

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/productcatalog . 

RUN npm install --omit=dev

EXPOSE 3003

CMD ["node", "main.js"]

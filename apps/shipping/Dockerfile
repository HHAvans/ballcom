FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build shipping

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/shipping .

RUN npm install --omit=dev

EXPOSE 3001

CMD ["node", "main.js"]
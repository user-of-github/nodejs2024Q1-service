FROM node:20-alpine as main
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD npx prisma migrate deploy && npm run start:dev
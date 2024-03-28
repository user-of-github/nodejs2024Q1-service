FROM node:20-alpine
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
RUN npx prisma generate
CMD npx prisma migrate deploy && npm run start:dev
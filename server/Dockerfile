FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

EXPOSE 3001

CMD npm install && npx nodemon --exec npx ts-node src/index.ts

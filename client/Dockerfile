FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

EXPOSE 5173

CMD npm install && npm run dev -- --host

FROM node:16 AS build

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build -- --prod


FROM nginx:alpine


EXPOSE 4200


CMD ["nginx", "-g", "daemon off;"]

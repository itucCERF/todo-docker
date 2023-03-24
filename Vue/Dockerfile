FROM node:lts-alpine

WORKDIR /var/www/html

COPY ./app/package*.json /var/www/html

RUN npm install

COPY ./app /var/www/html

RUN npm run build
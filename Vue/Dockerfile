FROM node:lts-alpine as build_fe

WORKDIR /app
COPY ./app/package*.json /app
RUN npm install
# COPY ./app .
RUN npm run build

FROM nginx:stable-alpine
LABEL maintainer="tuandd99.nta@gmail.com" 
WORKDIR /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build_fe /app/dist /var/www/html

EXPOSE 8080
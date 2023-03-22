FROM node:latest

# Create app directory
WORKDIR /var/www/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ../web/package*.json ./var/www/app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ../web ./var/www/app

EXPOSE 8080
CMD [ "node", "app.js" ]
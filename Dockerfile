FROM node:9-slim

# Create app directory
WORKDIR /usr/app

# Bundle app source
COPY ./package*.json /usr/app/
COPY ./src /usr/app/src/

# Install app dependencies
RUN NODE_ENV=production npm install

EXPOSE 8000

CMD [ "npm", "start" ]
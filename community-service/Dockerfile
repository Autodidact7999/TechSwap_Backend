FROM node:16.20.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Use an environment variable for the port number
ENV PORT=3001

EXPOSE $PORT
CMD [ "node", "server.js" ]
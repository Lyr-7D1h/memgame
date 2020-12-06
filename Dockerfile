#
# Production Build: client + server
#

FROM node:latest

# App Directory
WORKDIR /usr/src/app

# Moves files to App Directory
COPY . /usr/src/app

# Build Client
WORKDIR /usr/src/app/client
RUN yarn install --production
RUN yarn build

# Build Server
WORKDIR /usr/src/app/server
RUN yarn install --production
RUN yarn build

# Start App
CMD yarn start:prod
EXPOSE 5000
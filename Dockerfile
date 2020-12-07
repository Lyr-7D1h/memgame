#
# Production Build: client + server
# Using npm due to buildx errors 
#

FROM node:14-alpine

# App Directory
WORKDIR /usr/src/app

# Moves files to App Directory
COPY . /usr/src/app

# Build Client
WORKDIR /usr/src/app/client
RUN npm install --production 
RUN npm run build

# Build Server
WORKDIR /usr/src/app/server
RUN npm install --production
RUN npm run build

# Start App
CMD npm run start:prod
EXPOSE 5000

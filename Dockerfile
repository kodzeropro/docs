FROM node:lts-alpine

RUN apk add --no-cache git

# make the 'app' folder the current working directory
WORKDIR /app

# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies

RUN npm install
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
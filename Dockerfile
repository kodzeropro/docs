FROM node:lts-alpine

RUN apk add --no-cache git

# make the 'app' folder the current working directory
WORKDIR /app

# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies
ARG NPM_TOKEN
# Проверка, что токен передан
RUN if [ -z "$NPM_TOKEN" ]; then \
      echo "❌ NPM_TOKEN is not set. Please provide a valid granular access token." >&2; \
      exit 1; \
    fi; \
    echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc && \
    npm ci && \
    rm -f .npmrc
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
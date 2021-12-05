FROM node:lts-alpine

WORKDIR /app

# npm install に必要らしい
RUN apk update
RUN apk add git

RUN echo "install vue"
RUN npm install -g @vue/cli

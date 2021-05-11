FROM node:alpine

ARG ARTIFACT_NAME
WORKDIR /home/frontity-cli

RUN apk add tree

COPY dist /home/frontity-cli/dist/

RUN cd ./dist && npm install --ignore-scripts
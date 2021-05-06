FROM node:alpine

ARG ARTIFACT_NAME
WORKDIR /home/frontity-cli

RUN apk add tree
RUN mkdir -p /home/frontity-cli
COPY ${ARTIFACT_NAME} /home/frontity-cli
RUN npm install ${ARTIFACT_NAME} --production

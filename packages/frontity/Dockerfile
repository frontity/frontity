ARG ALPINE_VERSION=alpine

FROM node:${ALPINE_VERSION}

# Set the working directory for all subsequent RUN / COPY commands.
# The frontity-cli will be created by docker automatically.
WORKDIR /home/frontity-cli

# Add the unix `tree` tool. We use it for snapshot testing its output.
RUN apk add tree

# Assuming that the CLI has been compiled from the TS source files, we can
# copy it from the host to the docker image.
COPY dist /home/frontity-cli/dist/

# `--ignore-scripts` because otherwise npm install will run the `prepublish` 
# npm script which in turn tries to run `npm build` and `npm build` will try to
# compile the TS source to JS which is unnecessary and results in error because
# our `tsconfig.build.json` extends the tsconfig.json at the root of the repo. 
RUN cd ./dist && npm install --ignore-scripts
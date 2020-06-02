#!/bin/bash

node ./start-e2e-docker.js 
cd ../e2e/project/ 
npx frontity build 
npx frontity serve --port 3001
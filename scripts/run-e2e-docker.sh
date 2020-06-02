#!/bin/bash
set -euxo pipefail

node ./start-e2e-docker.js
npx frontity serve --port 3001
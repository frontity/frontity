#!/bin/bash
set -euxo pipefail

node ./scripts/start-e2e-docker.js
cd ../e2e/project
npx frontity serve --port 3001
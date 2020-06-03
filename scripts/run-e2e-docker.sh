#!/bin/bash
set -euxo pipefail

node ./scripts/start-e2e-docker.js
cd ../e2e/projects
npx frontity serve --port 3001
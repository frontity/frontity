#!/bin/bash
set -euxo pipefail

node ./scripts/start-e2e-docker.js
npx frontity serve --port 3001
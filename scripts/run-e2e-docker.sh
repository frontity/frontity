#!/bin/bash
set -euxo pipefail

ls
node ./start-e2e-docker.js
npx frontity serve --port 3001
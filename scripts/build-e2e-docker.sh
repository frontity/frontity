#!/bin/bash
set -euxo pipefail

cd e2e/project/
npx frontity build --publicPath $1 --target $2
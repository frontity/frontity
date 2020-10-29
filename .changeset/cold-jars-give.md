---
"@frontity/core": patch
---

The `serve` command was taking too much to spin the server. That was due to the build and dev scripts which are having side-effects by loading ts-node and other scripts.

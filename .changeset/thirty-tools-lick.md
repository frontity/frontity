---
"@frontity/core": patch
---

Due to a recent warning in Chrome for missusing preload instead of modulepreload for module files we need to replace the loadable linkType for assets that have to be preloaded as modules instead.

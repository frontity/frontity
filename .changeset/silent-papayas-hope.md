---
"@frontity/tiny-router": patch
---

Prevent navigation errors when the initial location in the browser doesn't match `state.router.link`.

This could happen if Frontity is embedded in WordPress (see [embedded mode](https://github.com/frontity/frontity-embedded-proof-of-concept)) and the WordPress server modifies the URL when doing a request to the Frontity server.

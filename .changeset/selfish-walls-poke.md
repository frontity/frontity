---
"@frontity/core": patch
---

Move the call of the afterSSR() actions to before taking the state snapshot. This way any `afterSSR()` action still has an option to modify the snapshot before sending it to the client. This is important for security as we delete the state.source.auth token in that action in wp-source.

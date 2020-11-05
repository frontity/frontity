---
"@frontity/yoast": patch
---

Fix Yoast type import of `state.source.api`, which is now in `@frontity/wp-source` and not in `@frontity/source`.

> 💡 In the future, once the `@frontity/yoast` package starts using `state.source.url` instead of `state.source.api`, the types of `@frontity/source` should be used again.

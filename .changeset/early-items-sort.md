---
"@frontity/wp-source": patch
---

Revert a change introduced in https://github.com/frontity/frontity/pull/542. Keep setting `query`, `link` and `route` on all entities (including non-URL entities) in source.data

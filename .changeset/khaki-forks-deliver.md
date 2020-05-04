---
"@frontity/wp-source": patch
---

Bugfixes:

- When using actions.source.fetch("/some-link", { force: true }), the data object property isReady should never be reset to false.
- The data object custom properties (like items, isCategory...) should not be removed from the data.
- The entities I get from the new fetch should overwrite the old ones.
- When calling actions.source.fetch, it should populate data with link, route, page and query, even if data already exists.

---
"@frontity/wp-source": patch
---

Change how `libraries.source.normalize|parse|stringify` used inside of actions.source.fetch(). From now on, they are not imported from their module but received from the `libraries` parameter of `actions.source.fetch`.

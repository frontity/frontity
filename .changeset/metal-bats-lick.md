---
"@frontity/wp-source": patch
---

Fix `isFetching` not turning to true when `data` exists. It may happen in cases where we are fetching that `data` in the embed of others. Like for example, taxonomies in posts.

---
"@frontity/wp-source": minor
---

Support the `preview=true` query in the PostType and PostTypeWithQuery handlers.

If that query is present, the handlers will do an additional request to get
the latest revision and they will substitute the `title`, `content` and
`excerpt` with the last one.

---
"@frontity/wp-source": patch
---

Fix the pattern of the internal redirection when `state.source.homepage` is defined, making links with a search param (`?s=some+term`) to keep using the post archive handler.

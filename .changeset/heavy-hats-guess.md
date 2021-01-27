---
"@frontity/wp-source": patch
---

Fix the incorrectly matched patterns when a query string was present. The getMatch function now has a separate codepath for regex based patterns.

---
"@frontity/wp-source": patch
---

Fix the bug that causes a server crash and 500 errors to be returned if a URL contained a partly known entity. E.g. `/undefined/2020/some-interesting-post`.

---
"frontity": minor
"@frontity/core": patch
"@frontity/html2react": patch
---

Add a new `decode` function to 'frontity', which unescapes the HTML.

This replaces the `decode` function previously in `html2react`.

This is necessary because some of the content fro WP API can come as escaped HTML entities and we want to render it straight into react components.

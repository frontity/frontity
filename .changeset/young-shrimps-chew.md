---
"frontity": patch
"@frontity/twentytwenty-theme": patch
---

Add a new `decode` function which unescapes the HTML. This is necessary because some of the content fro WP API can come as escaped HTML entities and we want to render it straight into react componenents

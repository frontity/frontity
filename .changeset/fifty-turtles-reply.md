---
"@frontity/wp-source": patch
---

Fix a bug which caused an infinite loop if the 3xx redirection was "internal" (meaning redirecting to the WP or Frontity domain) and the `location` of the redirection matched the link.

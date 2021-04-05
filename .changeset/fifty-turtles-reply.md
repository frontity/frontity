---
"@frontity/wp-source": patch
---

Fix a bug which caused an infinite loop if the 3xx redirection was "internal"
(meaning redirecting to the WP or Frontity domain) and the `location` of the
redirection matched the link as discussed in https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032/28.

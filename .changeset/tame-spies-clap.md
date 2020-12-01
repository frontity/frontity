---
"@frontity/core": minor
"@frontity/tiny-router": minor
"@frontity/wp-source": minor
---

Add support for 30x Redirections.

1. Redirections can be stored in the backend server, which will be checked according to different configurations:

   - Each time a link is fetched.
   - When the API returns a 404.
   - When the link belongs to a certain set of URLs (configured using regexp).

   This configuration is stored in `state.source.redirections`.

   The redirection information will be stored in `state.source.data` similar to what happens for 4xx and 5xx errors.

2. Redirections can added to Frontity by populating `state.source.data` directly or using a handler.

Feature Discussion: https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032/12

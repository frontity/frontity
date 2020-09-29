---
"@frontity/core": minor
---

Add support for auth headers: https://community.frontity.org/t/support-for-auth-header-in-source-packages/2678/12

- Use use the URL search param `frontity_name` instead of just `name` for frontity multisite.
- Remove all querystring parameters that start with `frontity_` from the page querystring and pass them (camelCased) to `state.frontity.options`.

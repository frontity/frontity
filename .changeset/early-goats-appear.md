---
"@frontity/wp-source": patch
---

- Add a fallback to 0 in case `default` (second param) is missing in both `getTotal` and `getTotalPages`.
- Add backward compatibility to handlers receiving the `route` param instead of the `link` one.

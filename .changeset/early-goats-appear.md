---
"@frontity/wp-source": patch
---

- Fix wrong default totals when headers are missing. It was set to 0, but it has to be 1.
- Add a fallback to 0 in case `default` (second param) is missing in both `getTotal` and `getTotalPages`.
- Add backward compatibility to handlers receiving the `route` param instead of the `link` one.

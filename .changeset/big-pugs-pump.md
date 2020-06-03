---
"@frontity/core": patch
---

Replace `lodash-es` by `lodash` library and remove the `lodash` alias to avoid problems with third-party libraries.

Also, adds `babel-plugin-lodash` to still get tree shaking when importing named exports from `lodash`.

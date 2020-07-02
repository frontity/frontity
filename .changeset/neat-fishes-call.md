---
"@frontity/connect": patch
"@frontity/types": patch
---

Fix the types of `connect` when imported from `frontity` and used with options, like:

```js
import { connect } from "frontity";

const Component = () = { /* Some React component... */ };

export default connect(Component, { injectProps: false });
```

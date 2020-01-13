# `@frontity/invariant`

The Frontity warnings and errors.

This is somewhat modified the facebook package and with added typescript.

## Usage

```js
import { warning, invariant } from "@frontity/invariant";

invariant(someCondition, "The condition `someCondition` has failed!");

warning("This should never happen! 😜");
```

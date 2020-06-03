---
"@frontity/core": patch
---

Remove React `Fills` package export. This was meant to be used for the [Slot and Fill](https://community.frontity.org/t/slot-and-fill/895) pattern, but we are going to finally use `state.fills` to add the configuration for the fills and `libraries.fills` to expose the React components.

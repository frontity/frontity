---
"@frontity/components": minor
---

Introducing [auto prefetching](https://community.frontity.org/t/auto-prefetch-data/886) to the `<Link />` component.

There are four supported modes:

- "in-view": Only prefetch links that are currently visible in the viewport. (recommended)
- "all": Prefetches all internal links on the page.
- "hover": Prefetches links on hover.
- "no": No auto prefetch.

The prefetch mode should be set in `state.theme.autoPrefetch`.

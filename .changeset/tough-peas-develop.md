---
"@frontity/hooks": patch
---

Fixes `isLast` returning the wrong value when last post returned `isError` and starts using `state.source.subdirectory` and `state.source.postsPage` as default `archive` in `usePostTypeInfiniteScroll`

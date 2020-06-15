---
"@frontity/hooks": patch
---

Fixes a bug on the `usePostTypeInfiniteScroll` where the archive is not requested if we are loading the post type from SSR.

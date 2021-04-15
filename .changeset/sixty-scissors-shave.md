---
"@frontity/hooks": patch
---

Prevent a possible race condition in `useInfiniteScroll`. It could happen when a link changes `state.router.link` right before the `useEffect` callback that manages the route runs.

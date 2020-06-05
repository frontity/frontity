---
"@frontity/analytics": minor
"@frontity/google-analytics": patch
"@frontity/google-tag-manager": patch
---

Change the API of `analytics.sendEvent` to accept an object with the following structure:

```ts
export type Event = {
  name: string;
  payload: Record<string, any>;
};
```

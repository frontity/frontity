---
"@frontity/analytics": minor
---

Release the first stable version of @frontity/analytics library ([Feature Discussion](https://community.frontity.org/t/the-analytics-library/1103)).

The main differences with the previous version are:

- In `state.analytics`, the `namespace` array is replaced by two objects that will contain the namespaces with a boolean value: `pageviews` and `events`. This allow users to have more control over which analytics packages should send pageviews or events, and it can also be configured in `frontity.settings.js`.

- In `actions.analytics`, the `sendPageview` and `sendEvent` actions are renamed to `pageview` and `event` respectively.

- Pageview `page` property is now `link`.

- Event `event` property is now `name`.

[Frontity](../README.md) › [Globals](../globals.md) › [analytics](analytics.md)

# Package: analytics

# `@frontity/analytics`

[![Version](https://img.shields.io/npm/v/@frontity/analytics.svg)](https://www.npmjs.com/package/@frontity/analytics) [![npm](https://img.shields.io/npm/dw/@frontity/analytics)](https://www.npmjs.com/package/@frontity/analytics) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

This package contains the base types and actions to build analytics packages for »Frontity

Packages that [inherits from this one are](https://www.npmjs.com/package/@frontity/analytics):
- [`@frontity/google-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-analytics)
- [`@frontity/google-tag-manager`](https://github.com/frontity/frontity/tree/dev/packages/google-tag-manager)

## Install

```sh
npm i @frontity/analytics
```

## Example

Any Analytics Frontity package should extend from this package

```ts
...
import Analytics, { ... } from "@frontity/analytics/types";

...

interface GoogleAnalytics extends Analytics {
  ...
}

export default GoogleAnalytics;
```

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/analytics

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/analytics/CHANGELOG.md)

***
### » Frontity Channels 🌎

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

We have different channels at your disposal where you can find information about the project, discuss about it and get involved:

- 📖 **[Docs](https://docs.frontity.org)**: this is the place to learn how to build amazing sites with Frontity.
- 👨‍👩‍👧‍👦 **[Community](https://community.frontity.org/)**: use our forum to [ask any questions](https://community.frontity.org/c/dev-talk-questions), feedback and meet great people. This is your place too to share [what are you building with Frontity](https://community.frontity.org/c/showcases)!
- 🐞 **[GitHub](https://github.com/frontity/frontity)**: we use GitHub for bugs and pull requests. Questions are answered in the [community forum](https://community.frontity.org/)!
- 🗣 **Social media**: a more informal place to interact with Frontity users, reach out to us on [Twitter](https://twitter.com/frontity).
- 💌 **Newsletter**: do you want to receive the latest framework updates and news? Subscribe [here](https://frontity.org/)

### » Get involved 🤗

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you. Use our [community forum](https://community.frontity.org) yo ! ❤️

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start, this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute)

If you're eager to start contributing to the code, maybe you'd like to open a pull request to address one of our [*good first issues*](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

## Index

### Interfaces

* [Analytics](../interfaces/analytics.analytics-1.md)
* [Event](../interfaces/analytics.event.md)
* [Pageview](../interfaces/analytics.pageview.md)

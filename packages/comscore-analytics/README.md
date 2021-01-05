# `@frontity/comscore-analytics`

[![Version](https://img.shields.io/npm/v/@frontity/comscore-analytics.svg)](https://www.npmjs.com/package/@frontity/comscore-analytics) [![npm](https://img.shields.io/npm/dw/@frontity/comscore-analytics)](https://www.npmjs.com/package/@frontity/comscore-analytics) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

[Comscore](https://www.comscore.com/) Analytics package for Frontity

## Install

```sh
npm i @frontity/comscore-analytics
```

## Settings

The [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package is **`comscoreAnalytics`**

Every Comscore account has a [Tracking ID](#).
To connect the package with a specific account (or accounts) we can set the following properties in the `frontity.settings.js`:

- `state.comscoreAnalytics.trackingId`: to specify just one _tracking ID_
- `state.comscoreAnalytics.trackingIds`: to specify a list of _tracking ID's_

```js
export default {
  packages: [
    {
      name: "@frontity/comscore-analytics",
      state: {
        comscoreAnalytics: {
          trackingId: "34567890",
        },
      },
    },
  ],
};
```

```js
export default {
  packages: [
    {
      name: "@frontity/google-tag-manager-analytics",
      state: {
        comscoreAnalytics: {
          trackingIds: ["34567890", "56789012"],
        },
      },
    },
  ],
};
```

## Usage

This `@frontity/comscore-analytics` package can co-exist with some other `analytics` packages. Once we have properly installed and configured these `analytics` packages, their actions will be centralized by the `analytics` namespace

- `actions.analytics.pageview` will take into account settings in `state.analytics.pageviews`
- `actions.analytics.event` will take into account settings in `state.analytics.events`

> Read More info about how to use Analytic packages in the [docs](https://docs.frontity.org/api-reference-1/frontity-analytics)

#### `actions.analytics.pageview`

If `@frontity/comscore-analytics` is configured [and enabled for _pageviews_](), every time a link changes (or every time `action.router.set(link)` is launched) a tracking for that page will be sent to Google Analytics

#### `actions.analytics.event`

This package doesn't actually track events for Comscore so any call of the method `actions.analytics.event()` will have no effect for this service

---

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/comscore-analytics

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/comscore-analytics/CHANGELOG.md)

---

### » Frontity Resources 🌎

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

We have a number of different channels at your disposal where you can find out more information about the project, join in discussions about it, and also get involved:

- **📖 [Docs](https://docs.frontity.org/):** our primary documentation resource - this is the place to learn how to build amazing sites with Frontity.

* **👨‍👩‍👧‍👦 [Community forum](https://community.frontity.org/):** join our forum and ask questions, share your knowledge, give us feedback and tell us how we're doing, and meet other cool Frontity people. We'd also love to know about what you're building with Frontity, so please do swing by the [forum](https://community.frontity.org/) and tell us about your projects.
* **🐞 Contribute:** we use [GitHub](https://github.com/frontity/frontity) for bugs and pull requests. See our [Contributing](../../CONTRIBUTING.md/) section to find out how you can help develop Frontity, or improve this documentation.
* **🗣 Social media**: interact with other Frontity users. Reach out to us on [Twitter](https://twitter.com/frontity). Mention us in your tweets about Frontity and what you're building by using **`@frontity`**.
* 💌 **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/newsletter).

### » Get involved 🤗

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [_good first issues_](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

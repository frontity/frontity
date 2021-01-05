# `@frontity/google-tag-manager-analytics`

[![Version](https://img.shields.io/npm/v/@frontity/google-tag-manager-analytics.svg)](https://www.npmjs.com/package/@frontity/google-tag-manager-analytics) [![npm](https://img.shields.io/npm/dw/@frontity/google-tag-manager-analytics)](https://www.npmjs.com/package/@frontity/google-tag-manager-analytics) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

Analytics package to use [Google Tag Manager](https://tagmanager.google.com/) with Frontity

## Install

```sh
npm i @frontity/google-tag-manager-analytics
```

## Settings

The [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package is **`googleTagManagerAnalytics`**

Every Google Tag Manager account has a [Container ID](https://support.google.com/tagmanager/answer/6103696?hl=en).
To connect the package with a specific account (or accounts) we can set the following properties in the `frontity.settings.js`:

- `state.googleTagManagerAnalytics.containerId`: to specify just one _container ID_
- `state.googleTagManagerAnalytics.containerIds`: to specify a list of _container ID's_

```js
export default {
  packages: [
    {
      name: "@frontity/google-tag-manager-analytics",
      state: {
        googleTagManagerAnalytics: {
          containerId: "GTM-BCDFGHJ",
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
        googleTagManagerAnalytics: {
          containerIds: ["GTM-BCDFGHJ", "GTM-HJSFDUF"],
        },
      },
    },
  ],
};
```

## Usage

This `@frontity/google-tag-manager-analytics` package can co-exist with some other `analytics` packages. Once we have properly installed and configured these `analytics` packages, their actions will be centralized by the `analytics` namespace

- `actions.analytics.pageview()` will take into account settings in `state.analytics.pageviews`
- `actions.analytics.event()` will take into account settings in `state.analytics.events`

> Read More info about how to use Analytic packages in the [docs](https://docs.frontity.org/api-reference-1/frontity-analytics)

#### `actions.analytics.pageview`

If `@frontity/google-tag-manager-analytics` is configured configured and enabled for _pageviews_ in `state.analytics.pageviews`, every time a link changes (or every time `action.router.set(link)` is launched) a tracking for that page will be sent to Google Tag Manager.

#### `actions.analytics.event`

If `@frontity/google-tag-manager-analytics` is configured and enabled for _events_ in `state.analytics.events`, every time you call the method `actions.analytics.event()` from any of your React components, the proper tracking info will be sent to Google Tag Manager.

The `actions.analytics.event()` must receive an event object with the following properties.

| Name          | Type   | Default | Required | Description                                                                         |
| :------------ | :----- | :-----: | :------- | :---------------------------------------------------------------------------------- |
| **`name`**    | string |    -    | true     | The value of this property is mapped to the `event` field of the object sent to GTM |
| **`payload`** | Object |    -    | true     | Event payload.                                                                      |

You can add any info you want in the `payload` object.

These values will be transfomed (by this package) into the proper format before sending the data to Google Tag Manager

---

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/google-tag-manager

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/google-tag-manager-analytics/CHANGELOG.md)

---

### » Open Source Community

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

Frontity has a number of different channels at your disposal where you can find out more information about the project, join in discussions about it, and also get involved:

- **📖 [Docs](https://docs.frontity.org/):** our primary documentation resource - this is the place to learn how to build amazing sites with Frontity.

* **👨‍👩‍👧‍👦 [Community forum](https://community.frontity.org/):** join Frontity's forum and ask questions, share your knowledge, give feedback and meet other cool Frontity people. We'd also love to know about what you're building with Frontity, so please do swing by the [forum](https://community.frontity.org/) and tell us about your projects.
* **🐞 Contribute:** Frontity uses [GitHub](https://github.com/frontity/frontity) for bugs and pull requests. See our [Contributing](../../CONTRIBUTING.md/) section to find out how you can help develop Frontity, or improve this documentation.
* **🗣 Social media**: interact with other Frontity users. Reach out to the Frontity team on [Twitter](https://twitter.com/frontity). Mention us in your tweets about Frontity and what you're building by using **`@frontity`**.
* 💌 **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/newsletter/).

### » Get involved 🤗

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [_good first issues_](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

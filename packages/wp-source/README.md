# `@frontity/wp-source`

[![Version](https://img.shields.io/npm/v/@frontity/wp-source.svg)](https://www.npmjs.com/package/@frontity/wp-source) [![npm](https://img.shields.io/npm/dw/@frontity/wp-source)](https://www.npmjs.com/package/@frontity/wp-source) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

Source package of Frontity for self-hosted WordPress and WordPress.com sites.
It provides methods and structures tha can be used to access the data got from the REST API from your React components.

Full info about this package can be found in the [docs](https://docs.frontity.org/api-reference-1/wordpress-source)

## Table of contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Feature Discussions](#feature-discussions)
- [Changelog](#changelog)
- [Open Source Community](#open-source-community)
  - [Channels](#channels)
  - [Get involved](#get-involved)

<!-- tocstop -->

## Install

```sh
npm i @frontity/wp-source
```

## Usage

Once installed it should be included and configured in your `frontity.settings.js`

```jsx
export default {
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://site.com/wp-json",
        },
      },
    },
  ],
};
```

Some interesting methods defined in this package (and available in your React components if you apply [`connect`](https://docs.frontity.org/api-reference-1/frontity#connect) on them) are:

- [`source.fetch`](https://docs.frontity.org/api-reference-1/wordpress-source#source-fetch)
- [`source.get`](https://docs.frontity.org/api-reference-1/wordpress-source#source-get)
- [`source.api.get`](https://docs.frontity.org/api-reference-1/wordpress-source#api-get-endpoint-params-api-iswpcom)
- [`source.api.populate`](https://docs.frontity.org/api-reference-1/wordpress-source#populate-response-state-subdirectory-force)

Full info about this package can be found in the [docs](https://docs.frontity.org/api-reference-1/wordpress-source)

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/wp-source

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](CHANGELOG.md)

---

## Open Source Community

### Channels

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

Frontity has a number of different channels at your disposal where you can find out more information about the project, join in discussions about it, and also get involved:

- **📖 [Docs](https://docs.frontity.org/):** Frontity's primary documentation resource - this is the place to learn how to build amazing sites with Frontity.

* **👨‍👩‍👧‍👦 [Community forum](https://community.frontity.org/):** join Frontity's forum and ask questions, share your knowledge, give feedback and meet other cool Frontity people. We'd love to know about what you're building with Frontity, so please do swing by the [forum](https://community.frontity.org/) and tell us about your projects.
* **🐞 Contribute:** Frontity uses [GitHub](https://github.com/frontity/frontity) for bugs and pull requests. Check out the [Contributing](../../CONTRIBUTING.md/) section to find out how you can help develop Frontity, or improve this documentation.
* **🗣 Social media**: interact with other Frontity users. Reach out to the Frontity team on [Twitter](https://twitter.com/frontity). Mention us in your tweets about Frontity and what you're building by using **`@frontity`**.
* 💌 **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/newsletter).

### Get involved

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [_good first issues_](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

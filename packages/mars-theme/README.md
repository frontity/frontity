# `@frontity/mars-theme`

[![Version](https://img.shields.io/npm/v/@frontity/mars-theme.svg)](https://www.npmjs.com/package/@frontity/mars-theme) [![npm](https://img.shields.io/npm/dw/@frontity/mars-theme)](https://www.npmjs.com/package/@frontity/mars-theme) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

A starter theme for Frontity

Full info about this theme can be found in the [docs](https://api.frontity.org/frontity-themes/frontity-mars-theme)

![](https://frontity.org/wp-content/uploads/2021/04/screenshot-mars-theme-demo.png)

## Table of contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Theme Anatomy](#anatomy)
- [Feature Discussions](#feature-discussions)
- [Changelog](#changelog)
- [Open Source Community](#open-source-community)
  - [Channels](#channels)
  - [Get involved](#get-involved)

<!-- tocstop -->

## Install

```sh
npm i @frontity/mars-theme
```

## Usage

Once installed it should be included in your `frontity.settings.js`.
The theme options can be specified in the `state.theme` property.

```javascript
{
  name: "@frontity/mars-theme",
  state: {
    theme: {
      menu: [
        ["Home", "/"],
        ["Nature", "/category/nature/"],
        ["Travel", "/category/travel/"],
        ["Japan", "/tag/japan/"],
        ["About Us", "/about-us/"]
      ],
      featured: {
        showOnList: true,
        showOnPost: true
      }
    }
  }
},
```

Full info about this theme can be found in the [docs](https://api.frontity.org/frontity-themes/frontity-mars-theme)

## Theme Anatomy

The file structure of this theme is:

```
.
├── CHANGELOG.md
├── package.json
├── README.md
├── src
│  ├── components
│  │  ├── featured-media.js
│  │  ├── header.js
│  │  ├── index.js
│  │  ├── link.js
│  │  ├── list
│  │  │  ├── index.js
│  │  │  ├── list-item.js
│  │  │  ├── list.js
│  │  │  └── pagination.js
│  │  ├── loading.js
│  │  ├── menu-icon.js
│  │  ├── menu-modal.js
│  │  ├── menu.js
│  │  ├── nav.js
│  │  ├── page-error.js
│  │  ├── post.js
│  │  └── title.js
│  └── index.js
└── types.ts
```

| Path           | Description                                  |
| -------------- | -------------------------------------------- |
| _`./types.ts`_ | Typescript interface for MarsTheme settings. |

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/mars-theme

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

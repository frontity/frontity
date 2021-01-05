# `@frontity/wp-comments`

[![Version](https://img.shields.io/npm/v/@frontity/wp-comments.svg)](https://www.npmjs.com/package/@frontity/wp-comments) [![npm](https://img.shields.io/npm/dw/@frontity/wp-comments)](https://www.npmjs.com/package/@frontity/wp-comments) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

Comments package that adds integration for WordPress native comments.

> ## Beta version
>
> Please, bear in mind that this package is currently in beta version. It is not fully documented yet and its implementation may change with the final release.

## Install

```sh
npm i @frontity/wp-comments
```

## Usage

> In order to use this package, you will need to add a single line of configuration to your Wordpress installation:

```php
add_filter( 'rest_allow_anonymous_comments', '__return_true' );
```

You can add that directly in your `theme.php` file or use a [Code Snippets](https://wordpress.org/plugins/code-snippets/) plugin.

This package doesn't have any configuration, it should just be added in the `frontity.settings.js` to the `packages` array.

**`frontity.settings.js`**

```js
export default {
  packages: ["@frontity/wp-comments"],
};
```

More info about how to use this package can be found in the [Feature Discussion](https://community.frontity.org/t/wordpress-comments-package/1267).

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/wp-comments/CHANGELOG.md)

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

# `frontity`

[![Version](https://img.shields.io/npm/v/frontity.svg)](https://www.npmjs.com/package/frontity) [![npm](https://img.shields.io/npm/dw/frontity)](https://www.npmjs.com/package/frontity) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

Frontity cli and entry point to other packages.

More info about this package can be found in the docs → https://docs.frontity.org/api-reference-1/frontity

## Install

```sh
npm i frontity
```

## Usage

```jsx
import { Global, css } from "frontity";

const Page = () => (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: "Roboto";
        }
      `}
    />
    <OtherContent />
  </>
);  
```

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/frontity

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages//CHANGELOG.md)

***

### » Frontity Resources 🌎

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

We have a number of different channels at your disposal where you can find out more information about the project, join in discussions about it, and also get involved:

- **📖  [Docs](https://docs.frontity.org/):** our primary documentation resource - this is the place to learn how to build amazing sites with Frontity.
* **👨‍👩‍👧‍👦  [Community forum](https://community.frontity.org/):** join our forum and ask questions, share your knowledge, give us feedback and tell us how we're doing, and meet other cool Frontity people. We'd also love to know about what you're building with Frontity, so please do swing by the [forum](https://community.frontity.org/) and tell us about your projects.
* **🐞  Contribute:** we use [GitHub](https://github.com/frontity/frontity) for bugs and pull requests. See our [Contributing](../contributing/) section to find out how you can help develop Frontity, or improve this documentation.
* **🗣  Social media**: interact with other Frontity users. Reach out to us on [Twitter](https://twitter.com/frontity). Mention us in your tweets about Frontity and what you're building by using **`@frontity`**.
* 💌  **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/#newsletter).

### » Get involved 🤗

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [*good first issues*](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

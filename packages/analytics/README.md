# `@frontity/analytics`
[![Version](https://img.shields.io/npm/v/@frontity/analytics.svg)](https://www.npmjs.com/package/@frontity/analytics)

[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://docs.frontity.org/)

[![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-orange)](https://github.com/frontity/frontity/blob/master/LICENSE)

[![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity)

This package contains the base types and actions to build analytics packages for »Frontity


## Install

```sh
npm i @frontity/analytics
```

## Example

All **Analytics Frontity Packages** should extend from this package

```ts
...
import Analytics, { ... } from "@frontity/analytics/types";

...

interface GoogleAnalytics extends Analytics {
  ...
}

export default GoogleAnalytics;
```

## Contributing

Frontity is a community project. We invite your participation through issues and pull requests! Check [here how to contribute](https://docs.frontity.org/contributing/how-to-contribute)

This project has quite a backlog of suggestions! If you're new to the project, maybe you'd like to open a pull request to address one of them:

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)


## 📝 License

This project is [Apache--2.0](https://github.com/frontity/frontity/blob/master/LICENSE) licensed.

***

### » Frontity Channels 🌎

We have different channels at your disposal where you can find information about the project, discuss about it and get involved:

- 📖 **[Docs](https://docs.frontity.org)**: this is the place to learn how to build amazing sites with Frontity.
- 👨‍👩‍👧‍👦 **[Community](https://community.frontity.org/)**: use our forum to [ask any questions](https://community.frontity.org/c/dev-talk-questions), feedback and meet great people. This is your place too to share [what are you building with Frontity](https://community.frontity.org/c/showcases)!
- 🐞 **[GitHub](https://github.com/frontity/frontity)**: we use GitHub for bugs and pull requests. Questions are answered in the [community forum](https://community.frontity.org/)!
- 🗣 **Social media**: a more informal place to interact with Frontity users, reach out to us on [Twitter](https://twitter.com/frontity).
- 💌 **Newsletter**: do you want to receive the latest framework updates and news? Subscribe [here](https://frontity.org/)

### » Get involved 🤗

Got questions or feedback about Frontity? We'd love to hear from you. Use our [community forum](https://community.frontity.org) yo ! ❤️

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start, this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute)
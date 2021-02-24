# `@frontity/google-ad-manager`

The Google Ad Manager package enables Frontity to integrate with Google Ad Manager. It allows you to add ads as **fills** in `frontity.settings.js` so that they will appear in a specific **slot** defined in your theme. (see [Slot and Fill](https://api.frontity.org/frontity-packages/core-package/frontity#slot))

## Table of Contents

- [Installation](#installation)
- [Settings](#settings)
  - [Object properties](#object-properties)
    - [The `props` property](#the-props-property)
- [Usage](#usage)
- [Feature Discussions](#feature-discussions)
- [Changelog](#changelog)
- [Open Source Community](#open-source-community)
  - [Channels](#channels)
  - [Get involved](#get-involved)

## Installation

Add the `google-ad-manager` package to your project:

```bash
npm i @frontity/google-ad-manager
```

## Settings

This package can be included in your `frontity.settings.js` file as one of the packages that will be part of your Frontity project.

The [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package is **`googleAdManager`**. The object should be added to `state.fills`.

Each fill in the **`googleAdManager`** namespace is an object which should be assigned to an arbitrarily named key. The structure should be as follows:

```js
export default {
  packages: [
    {
      name: "@frontity/google-ad-manager",
      state: {
        fills: {
          googleAdManager: {
            arbitrary_fill_name: {
              // Object properties
            },
          },
        },
      },
    },
  ],
};
```

### Object properties

| Name          | Type   | Required | Description                                                                |
| ------------- | ------ | -------- | -------------------------------------------------------------------------- |
| **`slot`**    | string | yes      | The name of the slot as defined in your theme where you want the ad to go. |
| **`library`** | string | yes      | This will be `"googleAdManager.GooglePublisherTag"`.                       |
| `priority`    | int    | no       | Assigns a priority in case more than one fill is assigned to that slot.    |
| **`props`**   | obj    | yes      | Props that will be passed to the `<Slot>` component _(see table below)_    |

#### The `props` property

An object with props that will be passed to the `<Slot>` component.

| Name        | Type   | Required | Description                                                                                                                                                                                              |
| ----------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`id`**    | string | yes      | An identifier that you define                                                                                                                                                                            |
| **`unit`**  | string | yes      | The (Google supplied) adUnitPath code for the ad unit to be displayed. _[more info](https://developers.google.com/publisher-tag/reference#googletag.slot-googletag.defineslotadunitpath,-size,-opt_div)_ |
| **`size`**  | array  | yes      | The width and height to display the ad.                                                                                                                                                                  |
| `targeting` | array  | no       | One or more keys, each with one or more associated values. _[more info](https://developers.google.com/publisher-tag/guides/key-value-targeting)_.                                                        |
| `data`      | array  | no       | Other data that you want to pass to the Slot.                                                                                                                                                            |

## Usage

The recommended usage of this component is as detailed above using the Slot and Fill pattern. The configuration of the fill(s) is done in the `state.fills.googleAdManager` namespace in `frontity.settings.js`.

However, the Ad component is exposed in libraries and so you can get the `GooglePublisherTag` component from libraries and render it in any place.

```jsx
const Component = ({ libraries }) => {
  const MyAd = libraries.fills.googleAdManager.GooglePublisherTag;

	Return (
	  <MyAd
        unit=”/unit/234”
	      size="[300, 600]"
		/>
	)
}

Export connect(Component);
```

> Read more about how to use the google-ad-manager package in the [docs](https://api.frontity.org/frontity-packages/features-packages/google-ad-manager.md)

---

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/t/google-ad-manager/1587

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
* 💌 **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/newsletter/).

### Get involved

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [_good first issues_](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

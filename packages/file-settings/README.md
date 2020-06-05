# `@frontity/file-settings`

[![Version](https://img.shields.io/npm/v/@frontity/file-settings.svg)](https://www.npmjs.com/package/@frontity/file-settings) [![npm](https://img.shields.io/npm/dw/@frontity/file-settings)](https://www.npmjs.com/package/@frontity/file-settings) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

> This is an internal package used by [@frontity/core](https://github.com/frontity/frontity/tree/dev/packages/core)

A settings package for Frontity that reads a `frontity.settings.js` file.
This package allows to decouple from where the settings are retrieved.

_`frontity.settings.js` should contain data that allows it to be serializable (as a JSON) so it can be stored in DB_

## Table of contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`async getSettings(options) => settings`](#async-getsettingsoptions--settings)
    + [Parameters](#parameters)
    + [Return](#return)
  * [`async getAllSites() => sites`](#async-getallsites--sites)
    + [Return](#return-1)
- [Settings File](#settings-file)
- [Typescript](#typescript)
  * [`Settings`](#settings)
- [Feature Discussions](#feature-discussions)
- [Changelog](#changelog)
- [» Frontity Resources 🌎](#%C2%BB-frontity-resources-%F0%9F%8C%8E)
- [» Get involved 🤗](#%C2%BB-get-involved-%F0%9F%A4%97)

<!-- tocstop -->

## Install

```sh
npm i @frontity/file-settings
```


## Usage

This package is used to import the Frontity settings from a local file.

Here is a small example of how to use `getSettings`:

```js
import { getSettings } from "@frontity/file-settings";

const settings = await getSettings({
  name: "example-name",
  url: "https://example.site"
});
```

## API Reference

### `async getSettings(options) => settings`

Used to retrieve the settings from the `frontity.settings.js` file.

#### Parameters

**`options`** : `{ name?: string; url: string; }`

Used to match the right set of settings when there is more than one.

- **`options.name`** : `string (optional)`\
  The name of the set of settings you want to retrieve. When provided, `getSettings` won't use `options.url`.

- **`options.url`** : `string`\
  The url of the site using Frontity. The `matches` field of each set of settings will be tested against this url to determine which set of settings should be used.

#### Return

**`settings`** : `Settings`\
An object with type `Settings` containing a set of settings.

### `async getAllSites() => sites`

Used to retrieve all the sites with its name, mode and packages.

#### Return

**Sites**: `{ name: string; mode: string; packages: string[]; }[]`\
An array of sites containing name, mode and packages.

```js
[
  {
    name: "my-site-1",
    mode: "html",
    packages: ["package-1", "package-2"]
  },
  {
    name: "my-site-1-amp",
    mode: "amp",
    packages: ["package-1", "package-3"]
  },
  {
    name: "my-site-2",
    mode: "html",
    packages: ["package-1", "package-2"]
  }
];
```

## Settings File

The file must be located in the root directory of the project, it must be named `frontity.settings.ts` or `frontity.settings.js`, and it needs to export a serializable object.

The settings exported can be **mono settings** (only one):

```ts
{
  name?: string;
  match?: string[];
  mode?: string; // Default: "html"
  state?: object,
  packages: [
    string,
    {
      name: string;
      active?: boolean; // Default: true
      state?: object;
    }
  ]
}
```

Or **multi settings**:

```ts
// An array of more than one set of settings.
[
  {
    name: string; // Here name is mandatory and must be unique.
    match?: string[];
    mode?: string; // Default: "html"
    state?: { ... },
    packages: [ ... ]
  },
  {
    name: string; // Here name is mandatory and must be unique.
    match?: string[];
    mode?: string; // Default: "html"
    state?: { ... },
    packages: [ ... ]
  }
]
```

## Typescript

The `Settings` interface is exposed to be used in development. It can be accessed like this:

```js
import { Settings } from "@frontity/file-settings";

const settings: Settings = { ... };
```

### `Settings<T = Package>`

Types for the imported settings object from the settings file. You'll want to use them on your `frontity.settings.ts` file.

  

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/file-settings

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/file-settings/CHANGELOG.md)

***

## » Frontity Resources 🌎

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

We have a number of different channels at your disposal where you can find out more information about the project, join in discussions about it, and also get involved:

- **📖  [Docs](https://docs.frontity.org/):** our primary documentation resource - this is the place to learn how to build amazing sites with Frontity.
* **👨‍👩‍👧‍👦  [Community forum](https://community.frontity.org/):** join our forum and ask questions, share your knowledge, give us feedback and tell us how we're doing, and meet other cool Frontity people. We'd also love to know about what you're building with Frontity, so please do swing by the [forum](https://community.frontity.org/) and tell us about your projects.
* **🐞  Contribute:** we use [GitHub](https://github.com/frontity/frontity) for bugs and pull requests. See our [Contributing](../contributing/) section to find out how you can help develop Frontity, or improve this documentation.
* **🗣  Social media**: interact with other Frontity users. Reach out to us on [Twitter](https://twitter.com/frontity). Mention us in your tweets about Frontity and what you're building by using **`@frontity`**.
* 💌  **Newsletter:** do you want to receive the latest news about Frontity and find out as soon as there's an update to the framework? Subscribe to our [newsletter](https://frontity.org/#newsletter).

## » Get involved 🤗

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

Got questions or feedback about Frontity? We'd love to hear from you in our [community forum](https://community.frontity.org).

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start then this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

If you would like to start contributing to the code please open a pull request to address one of our [*good first issues*](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

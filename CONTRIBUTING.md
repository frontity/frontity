# Contributing to Frontity

We really appreciate your interest to contribute to Frontity! :tada:

The following is a set of guidelines for contributing to Frontity and its packages, which are hosted in the [Frontity Repository](https://github.com/frontity/frontity) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.



## Table Of Contents


-----

## Code of Conduct

This project and everyone participating in it is governed by the [Frontity Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. 

## How Can I Contribute?

### Reporting Bugs
### Suggesting Enhancements
### Your First Code Contribution
### Pull Requests

## What should I know before I get started?

### Frontity and its Packages

Frontity projects are built around the idea of [packages](https://api.frontity.org/frontity-packages) that encapsulates logic that can be reused across projects. Frontity packages may be considered as the equivalent of WordPress plugins. They're the ingredients of the final Frontity project.

A Frontity project is basically the sum of the [Core package](https://api.frontity.org/frontity-packages/core-package) plus a selection of [Features packages](https://api.frontity.org/frontity-packages/features-packages). We can also use [Collections packages](https://api.frontity.org/frontity-packages/collections-packages) to help us speed up the development of our Frontity project

The [official repository of Frontity](https://github.com/frontity/frontity) is a monorepo multipackage which means it contains several NPM packages that can be published individually but managed as a group

The `packages` folder of this repository contains the code of these packages and their dependencies. 


| Path   | Package   | Category | Description | 
| ------ | -------------- | ----------- | ---- | 
| [`/packages/amp`](https://github.com/frontity/frontity/tree/dev/packages/amp) | [`@frontity/amp`](https://www.npmjs.com/package/@frontity/amp) | AMP Package |  The Frontity package for <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/t/amp-package/388) [![Version](https://img.shields.io/npm/v/@frontity/amp.svg)](https://www.npmjs.com/package/@frontity/amp) | 
| [`/packages/analytics`](https://github.com/frontity/frontity/tree/dev/packages/analytics) | [`@frontity/analytics`](https://www.npmjs.com/package/@frontity/analytics) | Analytics Types | Base types and actions to build analytics packages for Frontity <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/analytics) [![Version](https://img.shields.io/npm/v/@frontity/analytics.svg)](https://www.npmjs.com/package/@frontity/analytics) | 
| [`/packages/babel-plugin-frontity`](https://github.com/frontity/frontity/tree/dev/packages/babel-plugin-frontity) | [`babel-plugin-frontity`](https://www.npmjs.com/package/babel-plugin-frontity) | Frontity Core |  Babel Plugin for Frontity <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/babel-plugin-frontit)  [![Version](https://img.shields.io/npm/v/babel-plugin-frontity.svg)](https://www.npmjs.com/package/babel-plugin-frontity) | 
| [`/packages/components`](https://github.com/frontity/frontity/tree/dev/packages/components) | [`@frontity/components`](https://www.npmjs.com/package/@frontity/components) | Collection |  Collection of React components for Frontity <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/components)  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/collections-packages/components)  [![Version](https://img.shields.io/npm/v/@frontity/components.svg)](https://www.npmjs.com/package/@frontity/components) | 
| [`/packages/comscore-analytics`](https://github.com/frontity/frontity/tree/dev/packages/comscore-analytics) | [`@frontity/comscore-analytics`](https://www.npmjs.com/package/@frontity/comscore-analytics) | Analytics Package |  Comscore Analytics package for Frontity <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/comscore-analytics)  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/analytics/comscore-analytics) [![Version](https://img.shields.io/npm/v/@frontity/comscore-analytics.svg)](https://www.npmjs.com/package/@frontity/comscore-analytics) | 
| [`/packages/connect`](https://github.com/frontity/frontity/tree/dev/packages/connect) | [`@frontity/connect`](https://www.npmjs.com/package/@frontity/connect) | Frontity Core |  The state manager of Frontity. Similar to MobX but much more lightweight because it's based on ES6 proxies. <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/connect)  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/core-package/frontity#connect) [![Version](https://img.shields.io/npm/v/@frontity/connect.svg)](https://www.npmjs.com/package/@frontity/connect)| 
| [`/packages/core`](https://github.com/frontity/frontity/tree/dev/packages/core) | [`@frontity/core`](https://www.npmjs.com/package/@frontity/connect) | Frontity Core |  The core package of the Frontity framework. <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/connect)  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/core-package/frontity#connect) [![Version](https://img.shields.io/npm/v/@frontity/core.svg)](https://www.npmjs.com/package/@frontity/core) | 
| [`/packages/create-frontity`](https://github.com/frontity/frontity/tree/dev/packages/create-frontity) | [`create-frontity`](https://www.npmjs.com/package/create-frontity) | Frontity Core |  Frontity package to use npm init instead of npx. <br/><br/>  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-cli/create-commands/create) [![Version](https://img.shields.io/npm/v/create-frontity.svg)](https://www.npmjs.com/package/create-frontity) | 
| [`/packages/error`](https://github.com/frontity/frontity/tree/dev/packages/error) | [`@frontity/error`](https://www.npmjs.com/package/@frontity/error) | Frontity Core |  Frontity errors and warnings". <br/><br/> [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/error)  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/core-package/frontity#error-and-warn) [![Version](https://img.shields.io/npm/v/@frontity/error.svg)](https://www.npmjs.com/package/@frontity/error) | 
| [`/packages/file-settings`](https://github.com/frontity/frontity/tree/dev/packages/file-settings) | [`@frontity/file-settings`](https://www.npmjs.com/package/@frontity/file-settings) | Frontity Core |  A settings package for Frontity that uses a `frontity.settings.js` file. <br/><br/>  [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://docs.frontity.org/learning-frontity/settings) [![Version](https://img.shields.io/npm/v/@frontity/file-settings.svg)](https://www.npmjs.com/package/@frontity/file-settings)  | 
| [`/packages/frontity`](https://github.com/frontity/frontity/tree/dev/packages/frontity) | [`frontity`](https://www.npmjs.com/package/frontity) | Frontity Core |  Frontity cli and entry point to other packages. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/frontity) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/core-package/frontity) [![Version](https://img.shields.io/npm/v/frontity.svg)](https://www.npmjs.com/package/frontity)  | 
| [`/packages/google-ad-manager`](https://github.com/frontity/frontity/tree/dev/packages/google-ad-manager) | [`@frontity/google-ad-manager`](https://www.npmjs.com/package/@frontity/google-ad-manager) | Ads Package |  Integrate your Frontity site with Google Ad Manager. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/t/google-ad-manager/1587) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/google-ad-manager) [![Version](https://img.shields.io/npm/v/@frontity/google-ad-manager.svg)](https://www.npmjs.com/package/@frontity/google-ad-manager)  | 
| [`/packages/google-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-analytics) | [`@frontity/google-analytics`](https://www.npmjs.com/package/@frontity/google-analytics) | Analytics Package |  Analytics package to use Google Analytics with Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/google-analytics) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/analytics/google-analytics) [![Version](https://img.shields.io/npm/v/@frontity/google-analytics.svg)](https://www.npmjs.com/package/@frontity/google-analytics)  | 
| [`/packages/google-tag-manager-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-tag-manager-analytics) | [`@frontity/google-tag-manager-analytics`](https://www.npmjs.com/package/@frontity/google-tag-manager-analytics) | Analytics Package |  Analytics package to use Google Tag Manager with Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/google-tag-manager) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/analytics/google-tag-manager-analytics) [![Version](https://img.shields.io/npm/v/@frontity/google-tag-manager-analytics.svg)](https://www.npmjs.com/package/@frontity/google-tag-manager-analytics)  | 
| [`/packages/head-tags`](https://github.com/frontity/frontity/tree/dev/packages/head-tags) | [`@frontity/head-tags`](https://www.npmjs.com/package/@frontity/head-tags) | SEO Package |  Integrate your Frontity site with REST API - Head Tags by Frontity. <br/><br/> [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/head-tags) [![Version](https://img.shields.io/npm/v/@frontity/head-tags.svg)](https://www.npmjs.com/package/@frontity/head-tags)  | 
| [`/packages/hooks`](https://github.com/frontity/frontity/tree/dev/packages/hooks) | [`@frontity/hooks`](https://www.npmjs.com/package/@frontity/hooks) | Collection |  Collection of React hooks for Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/hooks) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/collections-packages/hooks) [![Version](https://img.shields.io/npm/v/@frontity/head-tags.svg)](https://www.npmjs.com/package/@frontity/head-tags)  | 
| [`/packages/html2react`](https://github.com/frontity/frontity/tree/dev/packages/html2react) | [`@frontity/html2react`](https://www.npmjs.com/package/@frontity/html2react) | Render Package | HTML to React converter for Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/html2react) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/html2react) [![Version](https://img.shields.io/npm/v/@frontity/html2react.svg)](https://www.npmjs.com/package/@frontity/html2react)  | 
| [`/packages/mars-theme`](https://github.com/frontity/frontity/tree/dev/packages/mars-theme) | [`@frontity/mars-theme`](https://www.npmjs.com/package/@frontity/mars-theme) | Theme Package | A starter theme for Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/mars-theme) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-themes/frontity-mars-theme) [![Version](https://img.shields.io/npm/v/@frontity/mars-theme.svg)](https://www.npmjs.com/package/@frontity/mars-theme)  | 
| [`/packages/router`](https://github.com/frontity/frontity/tree/dev/packages/router) | [`@frontity/router`](https://www.npmjs.com/package/@frontity/router) | Router Types | Types for the Frontity router namespace. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/router) [![Version](https://img.shields.io/npm/v/@frontity/router.svg)](https://www.npmjs.com/package/@frontity/router)  | 
| [`/packages/smart-adserver`](https://github.com/frontity/frontity/tree/dev/packages/smart-adserver) | [`@frontity/smart-adserver`](https://www.npmjs.com/package/@frontity/smart-adserver) | Ads Package | Integrate your Frontity site with Smart Adserver. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/t/smart-adserver/1586) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/smart-ads) [![Version](https://img.shields.io/npm/v/@frontity/smart-adserver.svg)](https://www.npmjs.com/package/@frontity/smart-adserver)  | 
| [`/packages/source`](https://github.com/frontity/frontity/tree/dev/packages/source) | [`@frontity/source`](https://www.npmjs.com/package/@frontity/source) | Source Types | Types for the Frontity source namespace. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/source) [![Version](https://img.shields.io/npm/v/@frontity/source.svg)](https://www.npmjs.com/package/@frontity/source)  | 
| [`/packages/tiny-router`](https://github.com/frontity/frontity/tree/dev/packages/tiny-router) | [`@frontity/tiny-router`](https://www.npmjs.com/package/@frontity/tiny-router) | Router Package | Tiny router for Frontity projects. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/tiny-router) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-packages/features-packages/tiny-router)  [![Version](https://img.shields.io/npm/v/@frontity/tiny-router.svg)](https://www.npmjs.com/package/@frontity/tiny-router)  | 
| [`/packages/twentytwenty-theme`](https://github.com/frontity/frontity/tree/dev/packages/twentytwenty-theme) | [`@frontity/twentytwenty-theme`](https://www.npmjs.com/package/@frontity/twentytwenty-theme) | Theme Package |  The WordPress Twenty Twenty starter theme for Frontity. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/twentytwenty-theme) [![](https://img.shields.io/badge/-Docs-eee?logo=gitbook)](https://api.frontity.org/frontity-themes/frontity-twentytwenty-theme) [![Version](https://img.shields.io/npm/v/@frontity/twentytwenty-theme.svg)](https://www.npmjs.com/package/@frontity/twentytwenty-theme)  | 
| [`/packages/type-declarations`](https://github.com/frontity/frontity/tree/dev/packages/type-declarations) | [`@frontity/type-declarations`](https://www.npmjs.com/package/@frontity/type-declarations) | Frontity Core |  Types declarations for the different Frontity APIs. <br/><br/>  [![](https://img.shields.io/badge/-Feature_Discussion-yellow?logo=discourse)](https://community.frontity.org/tags/c/feature-discussions/33/twentytwenty-theme) [![Version](https://img.shields.io/npm/v/@frontity/type-declarations.svg)](https://www.npmjs.com/package/@frontity/type-declarations)  | 




│   ├── types
│   ├── wp-comments
│   ├── wp-source
│   └── yoast



...

There are many more, but this list should be a good starting point. For more information on how to work with Atom's official packages, see [Contributing to Atom Packages][contributing-to-official-atom-packages].

Also, because Atom is so extensible, it's possible that a feature you've become accustomed to in Atom or an issue you're encountering isn't coming from a bundled package at all, but rather a [community package](https://atom.io/packages) you've installed. Each community package has its own repository too, the [Atom FAQ](https://discuss.atom.io/c/faq) has instructions on how to [contact the maintainers of any Atom community package or theme.](https://discuss.atom.io/t/i-have-a-question-about-a-specific-atom-community-package-where-is-the-best-place-to-ask-it/25581)

#### Package Conventions

There are a few conventions that have developed over time around packages:

* Packages that add one or more syntax highlighting grammars are named `language-[language-name]`
    * Language packages can add other things besides just a grammar. Many offer commonly-used snippets. Try not to add too much though.
* Theme packages are split into two categories: UI and Syntax themes
    * UI themes are named `[theme-name]-ui`
    * Syntax themes are named `[theme-name]-syntax`
    * Often themes that are designed to work together are given the same root name, for example: `one-dark-ui` and `one-dark-syntax`
    * UI themes style everything outside of the editor pane &mdash; all of the green areas in the [packages image above](#atom-packages-image)
    * Syntax themes style just the items inside the editor pane, mostly syntax highlighting
* Packages that add [autocomplete providers](https://github.com/atom/autocomplete-plus/wiki/Autocomplete-Providers) are named `autocomplete-[what-they-autocomplete]` &mdash; ex: [autocomplete-css](https://github.com/atom/autocomplete-css)

### Design Decisions

When we make a significant decision in how we maintain the project and what we can or cannot support, we will document it in the [atom/design-decisions repository](https://github.com/atom/design-decisions). If you have a question around how we do things, check to see if it is documented there. If it is *not* documented there, please open a new topic on [Discuss, the official Atom message board](https://discuss.atom.io) and ask your question.



## Opening Issues

https://github.com/frontity/frontity/issues/new/choose



If you just want to ask a question about Frontity or want to contribute to the Open Source project and don't know how, the Community Forum is the main place for the community to help each other. 

But before posting a question or asking for help on a particular topic, check the [Frontity documentation and learning resources](https://community.frontity.org/t/frontity-community-forum-users-guide/4399#before-asking-in-the-community-forum). There’s a good chance that you will find answers to your questions there.





[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Atom and Packages](#atom-and-packages)
  * [Atom Design Decisions](#design-decisions)


[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [CoffeeScript Styleguide](#coffeescript-styleguide)
  * [Specs Styleguide](#specs-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)

----

# Contribute to Frontity

We really appreciate your interest to contribute to Frontity! Any kind of contribution is highly appreciated, not only coding ☺️.

## Coding Contributions

There is a detailed guide about how to contribute coding at our docs: [Code Contributions](https://docs.frontity.org/contributing/code-contribution-guide), but if you are looking for a quick guide, these are the main steps:

**Prerequisites:** Node 10 (or newer) installed in your computer.

1. Fork this [repository](https://github.com/frontity/frontity) and clone your fork.
2. Run ```npm install``` in the root folder.
3. Run ```cd examples/mars-theme-example/``` to go to the example directory.
4. Run ```npx frontity dev``` to start Frontity with mars-theme on [localhost:3000](http://localhost:3000/).
5. Make any changes you consider to the packages.
>***WARNING: After adding/removing dependencies to a package, go back to the root and do ```npm install``` again.***
6. Run ```npm test``` in the root to check if the commit is acceptable.
7. Commit and push to your fork.
8. Open a Pull Request detailing the changes.

>***WARNING: `npm test` will be run automatically each time your commit or push, so it may take a while. If it fails, it won't let you commit/push. Fix the tests and try again.***

If you get stuck on any of these steps, you should check the [Code Contributions guide](https://docs.frontity.org/contributing/code-contribution-guide).

## Other types of contributions

There are several ways to support the project and get involved. Don't know how to code? Don't worry! You can contribute in many other ways, just check our [How to contribute page](https://docs.frontity.org/contributing/how-to-contribute).

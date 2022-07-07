## 📣 Frontity Framework is not actively maintained! 

> Frontity Framework is **not** under active development anymore. Pull requests and issues are not being actively reviewed. For more details, please see the [blog post](https://frontity.org/blog/frontity-is-joining-automattic/).
>
> If are interested in becoming a maintainer and continuing the development of the framework please do get in touch with one of the developers!

<br>

<br>
<div align="center">
  <a href="https://frontity.org/">
  <img src="https://frontity.org/wp-content/uploads/2020/02/frontity-blue-logo.svg"
    width="300px"
  /> </a>
</div>
<h2 align="center">The React Framework for WordPress</h2>
<p align="center"><b>Frontity is the easiest way to create amazing websites using WordPress and React</b></p>
<br>
<p align="center">
<a href="https://community.frontity.org/">
    <img src="https://img.shields.io/discourse/users?color=blue&label=Join%20the%20community&server=https%3A%2F%2Fcommunity.frontity.org%2F&style=for-the-badge&labelColor=000000" alt="Discourse users" /> <a href="https://codesandbox.io/s/github/frontity/frontity-template"> <a href="https://www.npmjs.com/package/frontity">
    <img src="https://img.shields.io/npm/v/frontity?color=F76D64&style=for-the-badge&labelColor=000000" alt="npm badge" /> </a> <a href="https://github.com/frontity/frontity/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache%202-lightgrey?color=936AF4&label=license&style=for-the-badge&labelColor=000000" alt="License" />
  </a>
<p/>
<p align="center"><b>
  <a href="https://docs.frontity.org/getting-started/quick-start-guide">Get started </a> |
  <a href="https://codesandbox.io/s/github/frontity/frontity-template">Try demo in your browser</a> |
  <a href="https://frontity.org/learn/">Learn Frontity</a> 
  </b>
</p>
<br>

## What is Frontity Framework?

[**Frontity**](https://frontity.org/) is a **free and open source framework** for building WordPress websites based on React. It strips away the complexity that entails connecting both WordPress and React, and gives you a big head start by providing many of the most common queries already built in. In short, you can spend the bulk of your time on the development requirements of the project (e.g. the theme) and less time on setting up the project or worrying about tooling and configuration.

Frontity's unique approach, with its **ease of use and extensibility pattern** (similar to that of WordPress itself), offers [**distinct advantages**](https://docs.frontity.org/about#key-differences-from-other-react-frameworks) over other similar React frameworks:

### » It's 100% focused on WordPress

Each part of the framework has been simplified and optimized to be used with WordPress. This means the number of concepts that you as a developer need to learn are minimal. No complex configuration is necessary to get started, and the queries to the APIs that deliver the content are pre-configured for the things that developers most frequently need.

### » It's opinionated

Frontity has its own state manager and CSS-in-JS solution. Thanks to that developers don't have to figure out how to configure these tools, or learn other technologies such as Redux or GraphQL.

### » It's extensible like WordPress

Frontity powers a very flexible extensibility pattern similar to that of WordPress itself. To add new functionality or expand the capabilities of Frontity, you can use any of the existing **Frontity and npm packages** without having to build them from scratch.

Moreover, [**Frontity packages**](https://api.frontity.org/frontity-packages) (including themes) can be activated and deactivated without code changes and are reusable across projects, helping reduce both development and maintenance times.

### » It's rendered dynamically

In Frontity the HTML is rendered dynamically by a Node.js server or a serverless service. This means the HTML does not have to be rebuilt each time the content is edited or new content is published.

Because of its dynamic approach, Frontity provides a great power and reliability when it comes to frequent and real-time content updates, making it a great fit for those projects with content that might change rapidly or that is expected to grow over time.

**See the [About Frontity](https://docs.frontity.org/about) page in the docs to learn more.** 🤓


## How does Frontity work?

In a Frontity project, WordPress is used as a **headless or decoupled CMS**, just for managing the content. Frontity uses data from the WordPress REST API and generates the final HTML that is displayed in the browser using React.

With Frontity you still use your WordPress dashboard to edit and create content in exactly the same way that you are accustomed to. As you make changes content is automatically updated in your Frontity site, just as it is when using a traditional WordPress theme.

Frontity apps require both a Node.js server and a WordPress server (PHP) to run on. And there are two main Frontity Modes (architectures or configurations):

- [**Decoupled Mode**](https://docs.frontity.org/architecture/decoupled-mode)
- [**Embedded Mode**](https://docs.frontity.org/architecture/embedded-mode)

### Why a different Node.js server?

React is a JavaScript library. In order to generate HTML for site visitors or for Google, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML file with the JavaScript files included and the visitor will see the page after the JavaScript has loaded. However, this is not a good user experience and it is certainly not recommended if your site needs to be SEO friendly and to rank in search engine listings._

Frontity is prepared to be hosted either in a regular **Node.js** server or in **serverless** services. That makes it super cheap and infinitely scalable.

**The [Architecture](https://docs.frontity.org/architecture) page of the docs explains how Frontity works in detail.** 🏗


## Getting started

You'll need a WordPress installation and Node.js. See the [**Requirements**](https://docs.frontity.org/getting-started#requirements) page for more information.

If you can't wait to see what Frontity can do, head over to the [**Quick Start Guide**](https://docs.frontity.org/getting-started/quick-start-guide).

If you're new to Frontity, we recommend that you check out the [**step-by-step tutorial**](https://tutorial.frontity.org/), which will guide you through the fundamentals of building and deploying your first Frontity website.

## Documentation

The Frontity documentation is distributed across three separate sites:

1. [**docs.frontity.org**](https://docs.frontity.org/) is the generic documentation. As well as theoretical information, such as Frontity Architecture and Core Concepts, you can find many practical guides here.
2. [**api.frontity.org**](https://api.frontity.org/) is the API reference. This is where you can find detailed technical descriptions for the CLI, and for the packages and plugins available in Frontity Framework.
3. [**tutorial.frontity.org**](https://tutorial.frontity.org/) is the introductory step-by-step guide. It's designed to provide you with a deep and solid understanding of web development using Frontity.

**More learning resources, such as videos and example projects, can be found in the [Learn Frontity](https://frontity.org/learn/) page.** 📚

## Community

For general help using Frontity, please refer to the documentation and the available learning resources. If you can't find an answer in these resources you can always check out the [**Frontity Community Forum**](https://community.frontity.org/), which is packed full of answers and solutions to all sorts of Frontity questions.

The **community forum** is a great place to ask questions, help fellow users build Frontity apps, and share your projects. It's also where you can keep track of the work done for the framework, join feature discussions, and collaborate on building Frontity itself.

Frontity is dedicated to a **positive and inclusive community experience** for everyone. Read through [**this guide**](https://community.frontity.org/t/frontity-community-forum-users-guide/4399) to learn more about the forum guidelines, how it is organized, and how to get the most out of it.

### Other channels

In addition to the community forum, Frontity has other channels where you can find out more information about the project, join in discussions about it, and also get involved:

- [**GitHub**](https://github.com/frontity/frontity): for bug reports and code contributions.
- [**YouTube channel**](https://www.youtube.com/c/Frontity/): learn from Frontity videos and playlists.
- [**Newsletter**](https://frontity.org/newsletter/): designed to inform you about the latest product updates, learning resources and community news surrounding Frontity Framework.
- [**Twitter**](https://twitter.com/frontity) and the [**blog**](https://frontity.org/blog/) are also pretty good places if you're looking for news, case studies, and other updates.

## Showcase

Want to know who's using Frontity? Need some inspiration for your project? The community is always building amazing projects with Frontity, discover some of them in the [**Showcase**](https://frontity.org/showcase/) page.

## Contributing

There are different ways to support the project and get involved. These are a few things that are always welcome:

* Testing new features
* Creating themes/packages and share them on npm or GitHub
* Creating educational content like blogs, videos, courses
* Improving the documentation
* Helping the community

**See the [Contributing](https://docs.frontity.org/contributing) section of the docs for more information on how to contribute.** ✨

## License

Frontity is licensed under the terms of the [Apache 2.0](https://github.com/frontity/frontity/blob/master/LICENSE) license.


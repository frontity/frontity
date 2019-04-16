<div align="center">
  <img
    src="https://uploads.frontity.org/images/logo/frontity-letters-black-transparent-background.png"
    width="300px"
  />
</div>
<h1 align="center">
  Create amazing sites using WordPress & React
</h1>

---

> **IMPORTANT NOTE!**
>
> We are working on the beta version.
>
> - Beta Release Date: **April 30, 2019**
> - Release Candidate Date: **May 30, 2019**
> - Final v1.0 Release Date: **June 20, 2019** _– yes, that's the WordCamp EU_ 😍
>
> #### Get notified when beta is released at [Frontity.org](https://frontity.org)!

---

# » What is Frontity?

**Frontity** can be explained in two different ways:

1. As an alternative rendering engine for WordPress.
1. As a React framework to create WordPress themes.

Both are true :)

## 1. An alternative rendering engine for WordPress

In the past the only way to get HTML out of WordPress was to use its **PHP rendering engine**. Quite an old friend, isn't it? ;)

But in WordPress 4.7 the [**WP API**](https://developer.wordpress.org/rest-api/) was included in the core.

> _An API is a protocol to retrieve content from an external service._

Thanks to the **WP API**, developers are not longer limited to the **PHP rendering engine**. They can retrieve their WordPress content and use it wherever they want. A new world of possibilities started.

One of those possibilities is to create WordPress themes using React. That's where **Frontity** comes into play.

## 2. A React framework to create WordPress themes

[**React**](https://reactjs.org/) is a super powerful library for building user interfaces. It was created by **Facebook** and is taking over front-end development.

But, in spite of how amazing it is, React is just **a JavaScript library, not a framework**. It does not assume anything about the other parts in any full solution. It focuses on just one thing, and on doing that thing very well.

In order to create a WordPress theme with React, developers need to learn and configure lots of different things: _bundling, transpiling, routing, server rendering, retrieving data from WordPress, managing state, managing css, linting, testing..._

**There is a reason React frameworks exist**. For example, [Next.js](https://nextjs.org/) and [GatbsyJS](https://www.gatsbyjs.org/) are two amazing React frameworks. Both _can_ work with WordPress, but they are not focused on WordPress. Therefore, there's still some configuration and additional tooling left to the developer.

[**Frontity**](https://frontity.org), on the other hand, is an **opinionated React framework focused on WordPress**:

- **Focused on WordPress:** each part of the framework has been simplified and optimized to be used with WordPress.
- **Opinionated framework:** developers don't need to figure out what tools to use for things like css or state management.

This means everything is ready so you can jump in and create a new amazing WordPress theme using React right away! 🎉🚀

# » How does Frontity work?

**Frontity** is a React app that lives in Node.js, separated from WordPress.

- It uses the WP API to retrieve content and generate the final HTML.
- It is also capable to generate AMP pages with the same React code and CSS.

<div align="center"><img alt="Frontity & WordPress explanation" src="https://uploads.frontity.org/images/github/frontity-wordpress-explanation.png" width="600px"></div>

### Why a different Node.js server?

React is a JavaScript library. In order to generate HTML for the visitors or Google, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML with the JavaScript files and the visitor will see the page after the JavaScript has loaded, but it is not a good user experience and certainly not recommended if your site needs to rank in Google._

**Frontity** is prepared to be hosted either in a regular Node.js server or in **serverless** services like [AWS Lambda](https://aws.amazon.com/lambda), [Now](https://zeit.co/now), [Netlify](https://www.netlify.com/), [Google Functions](https://cloud.google.com/functions/) and so on. That makes it super cheap and infinitely scalable.

Oh, and by the way, **Frontity is extensible**. Right now we have extensions like _Disqus comments, OneSignal notifications, Adsense, Doubleclick, SmartAds, Google Analytics, Google Tag Manager, Custom CSS or Custom HTML_. This means, Frontity Themes won't have to reinvent the wheel and include the same functionalities over and over.

# » Open source

Frontity is licensed under the terms of the [Apache 2.0](https://github.com/frontity/frontity/blob/master/LICENSE) license.

# » Get involved 🤗

Do you love WordPress and React? Come join us at our [community forums](https://community.frontity.org)! ❤️

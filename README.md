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
> We are working on the alpha version.
>
> - Alpha Release Date: **April 20, 2019**
> - Beta Release Date: **May 20, 2019**
> - Final v1.0 Release Date: **June 20, 2019** _– yes, that's the WordCamp EU_ 😍
>
> #### Join the alpha test list at [Frontity.org](https://frontity.org)!

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

In order to create a WordPress theme with React developers need to learn and configure a lots of different things: _bundling, transpiling, routing, server rendering, retrieving data from WordPress, managing state, managing css, linting, testing..._

**There is a reason React frameworks exist**. For example, [Next.js](https://nextjs.org/) and [GatbsyJS](https://www.gatsbyjs.org/) are two amazing React frameworks. Both _can_ work with WordPress, but are not focused on WordPress. Therefore, there's still some configuration and additional tooling left to the developer.

[**Frontity**](https://frontity.org), on the other hand, is an **opinionated React framework focused on WordPress**:

- **Opinionated framework:** developers don't need to figure out what tools to use for things like css or state management.
- **Focused on WordPress:** each part of the framework has been simplified and optimized to be used with WordPress.

This means everything is ready so you can jump in and create a new amazing WordPress theme with React right now! 🎉🚀

# » How does Frontity work?

**Frontity** is a React app that lives in Node.js, separated from WordPress.

- It uses the WP API to retrieve content and generate the final HTML.
- It is also capable to generate AMP pages with the same React code and CSS.

<div align="center"><img alt="Frontity & WordPress explanation" src="https://uploads.frontity.org/images/github/frontity-wordpress-explanation.png" width="600px"></div>

### Why a different Node.js server?

React is a JavaScript library. In order to generate HTML for the visitors or Google, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML with the JavaScript files and the visitor will see the page after the JavaScript has loaded, but it is not a good user experience and certainly not recommended if your site needs to rank in Google._

**Frontity** is also prepared to be hosted in **serverless** services like [AWS Lambda](https://aws.amazon.com/lambda), [Now](https://zeit.co/now), [Netlify](https://www.netlify.com/), [Google Functions](https://cloud.google.com/functions/) and so on. That makes it super cheap and infinitely scalable.

**Frontity** is **extensible**. Right now we have extensions like _Disqus comments, OneSignal notifications, Adsense, Doubleclick, SmartAds, Google Analytics, Google Tag Manager, Custom CSS or Custom HTML_. This means, your Frontity Theme won't have to reinvent the wheel each time including stuff than can be outsourced to extensions.

# » Why Frontity?

These are some of the benefits of Frontity.

### 🚀 Lightning Fast

**Frontity** is really fast. It loads in less than 1 second.

### ⚡️ Google AMP

The same React code and CSS can be used for AMP pages.

### Zero setup

Everything is already wired up it works with any WordPress installation, either self-hosted or from wordpress.com.

# » Get involved 🤗

Do you love WordPress and React? Come join us! ❤️

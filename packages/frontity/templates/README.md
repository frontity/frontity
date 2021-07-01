# $name$

This project was bootstrapped with [Frontity](https://frontity.org/).

#### Table of Contents

- [Launch a development server](#launch-a-development-server)
- [Create your custom theme](#create-your-custom-theme)
- [Create a production-ready build](#create-a-production-ready-build)
- [Deploy](#deploy)

### Launch a development server

```
npx frontity dev
```

Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

The site will automatically reload if you make changes inside the `packages` folder. You will see the build errors in the console.

> Have a look at our [Quick Start Guide](https://docs.frontity.org/getting-started/quick-start-guide)

### Create your custom theme

```
npx frontity create-package your-custom-theme
```

Use the command `npx frontity create-package` to create a new package that can be set in your `frontity.settings.js` as your theme.

> Have a look at our blog post [How to Create a React WordPress Theme in 30 Minutes](https://frontity.org/blog/how-to-create-a-react-theme-in-30-minutes/)

### Create a production-ready build

```
npx frontity build
```

Builds the app for production to the `build` folder.

This will create a `/build` folder with a `server.js` (a [serverless function](https://vercel.com/docs/v2/serverless-functions/introduction)) file and a `/static` folder with all your javascript files and other assets.

Your app is ready to be deployed.

> Get more info about [Frontity's architecture](https://docs.frontity.org/architecture)

### Deploy

With the files generated in the _build_ you can deploy your project.

#### As a node app

Use `npx frontity serve` to run it like a normal Node app.

This command generates (and runs) a small web server that uses the generated `server.js` and `/static` to serve your content.

#### As a serverless service

Upload your `static` folder to a CDN and your `server.js` file to a serverless service, like Vercel or Netlify.

> Get more info about [how to deploy](https://docs.frontity.org/deployment) a Frontity project

---

## Frontity Community

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity?style=social)](https://twitter.com/frontity) [![Frontity GitHub Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)](https://github.com/frontity/frontity)

👋 &nbsp;We'd love for you to be part of the Frontity community. There are a variety of different ways in which you can find more information about the project, join in discussions about it, and also get involved:

- **[Learn Frontity](https://frontity.org/learn/)**: in this page you can find Frontity's primary learning resources, including documentation resources, example projects, videos, and more.
- **[Community forum](https://community.frontity.org/)**: Frontity's forum is a great place to ask questions, help fellow Frontity users, and share your projects. It's also where you can keep track of the development work, join feature discussions, and collaborate on building Frontity itself.
- **[GitHub](https://github.com/frontity/frontity)**: for bug reports and code contributions. Questions are answered in the community forum.

If you're looking for news and updates about Frontity, [Twitter](https://twitter.com/frontity) and the [blog](https://frontity.org/blog/) are pretty good places to start. You can also join the **[Frontity Newsletter](https://frontity.org/newsletter/)** and stay updated on new releases and features, learning resources, and community news.

### Contributing

Frontity welcomes contributions in all forms. There are many different ways to support the project. Check out the **[How to contribute](https://docs.frontity.org/contributing/how-to-contribute)** page for ideas on contributing and helping make Frontity better.

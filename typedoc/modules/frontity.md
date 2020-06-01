[Frontity](../README.md) › [Globals](../globals.md) › [frontity](frontity.md)

# Package: frontity

<div align="center">
  <img
    src="https://uploads.frontity.org/images/logo/frontity-letters-black-transparent-background.png"
    width="300px"
  />
</div>
<h1 align="center">
  Create amazing sites using WordPress & React
</h1>

<p align="center">
  <a href="https://frontity.org">frontity.org</a> |
  <a href="https://docs.frontity.org/getting-started?utm_source=github-readme&utm_medium=get-started-link">Get Started</a> |
  <a href="https://docs.frontity.org/frontity-features">Features</a> |
  <a href="https://docs.frontity.org/getting-started">Docs</a> |
  <a href="https://community.frontity.org/">Community</a> |
  <a href="https://twitter.com/frontity">Twitter</a>
</p>

---

> Frontity is a free and open source framework to develop WordPress themes based on ReactJS. To learn more about the framework, its basic concepts and how they work together, check out our docs:
>
> - [About Frontity framework](https://docs.frontity.org/#about-frontity-framework)
> - [Learning Frontity guide](https://docs.frontity.org/learning-frontity)
>
> If you can't wait to see what Frontity can do, head over to our [Quick Start Guide](https://docs.frontity.org/getting-started/quick-start-guide) to get up and running! Once you try it out, please [let us know](https://community.frontity.org/) how it goes! We'd love to learn more about your experience and how Frontity can help your project(s). Bug reports will be also highly appreciated.
>
> Frontity will continue to be improved during the next months, and new features will be added progressively.
>
> Feel free to [subscribe to our newsletter](https://frontity.org/#newsletter) to **get notified of the latest framework updates and news**.
>
> <div align="center"><a href="https://docs.frontity.org/getting-started?utm_source=github-readme&utm_medium=get-started-link"><strong>GET STARTED!</strong></a></div>
> <br />

---

<ul>
  <li><a href="#-what-is-frontity">What is Frontity?</a></li>
  <li><a href="#-how-does-frontity-work">How does Frontity work?</a></li>
  <li><a href="#-how-is-frontity-organized">How is Frontity organized?</a></li>
  <li><a href="#-get-involved-">Get involved 🤗</a></li>
  <li><a href="#-open-source">Open Source</a></li>
</ul>

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

---

#### Curious? Learn how to start building your website with Frontity in a few minutes >> [Get Started!](https://docs.frontity.org/getting-started)

---

# » How does Frontity work?

**Frontity** apps live in Node.js, separated from WordPress.

- It uses the WP API to retrieve content and generate the final HTML.
- It is also capable of generating AMP pages with the same React code and CSS.

<div align="center"><img alt="Frontity & WordPress explanation" src="https://uploads.frontity.org/images/github/frontity-wordpress-explanation.png" width="600px"></div>

### Why a different Node.js server?

React is a JavaScript library. In order to generate HTML for the visitors or Google, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML with the JavaScript files and the visitor will see the page after the JavaScript has loaded, but it is not a good user experience and certainly not recommended if your site needs to rank in Google._

**Frontity** is prepared to be hosted either in a regular Node.js server or in **serverless** services like [AWS Lambda](https://aws.amazon.com/lambda), [Now](https://zeit.co/now), [Netlify](https://www.netlify.com/), [Google Functions](https://cloud.google.com/functions/) and so on. That makes it super cheap and infinitely scalable.

Oh, and by the way, **Frontity is extensible**. It allows you to easily add new features to your theme via extensions and NPM packages without having to create them from scratch. Right now, we are working on extensions like _Disqus comments, OneSignal notifications, Adsense, Doubleclick, SmartAds, Google Analytics, Google Tag Manager, Custom CSS or Custom HTML_. This means, Frontity Themes won't have to reinvent the wheel and include the same functionalities over and over.

---

Discover all features here >> **[Frontity features](https://docs.frontity.org/frontity-features)**.

---

# » How is Frontity organized?

GitHub is where magic happens, but there are more channels where you can find information about the project, discuss about it and get involved:

<ul>
  <li>📖 <strong>Docs</strong>: this is the place to learn how to build amazing sites with Frontity. <a href="https://docs.frontity.org/getting-started">Get started!</a></li>
  <li>:family_man_woman_girl_boy: <strong>Community</strong>: use our forum to share any doubts, feedback and meet great people. This is your place too to share <a href="https://community.frontity.org/c/dev-talk-questions">how are you planning to use Frontity!</a></li>
  <li>🐞 <strong>GitHub</strong>: we use GitHub for bugs and pull requests, doubts are solved at the community forum.</li>
  <li>🗣 <strong>Social media</strong>: a more informal place to interact with Frontity users, reach out to us on <a href="https://twitter.com/frontity">Twitter.</a></li>
  <li>💌 <strong>Newsletter</strong>: do you want to receive the latest framework updates and news? Subscribe <a href="https://twitter.com/frontity">here.</a></li>
</ul>

# » Get involved 🤗

Do you love WordPress and React? Got questions or feedback? We'd love to hear from you. Come join our [community forum](https://community.frontity.org)! ❤️

Frontity also welcomes contributions. There are many ways to support the project (and get free swag)! If you don't know where to start, this guide might help >> [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute).

# » Open source

Frontity is licensed under the terms of the [Apache 2.0](https://github.com/frontity/frontity/blob/master/LICENSE) license.
<br />
<br />

---

Do you miss any important information? Check out [our docs](https://docs.frontity.org/getting-started) or [let us know](https://community.frontity.org/c/docs-and-tutorials).

## Index

### References

* [batch](frontity.md#batch)
* [build](frontity.md#build)
* [create](frontity.md#create)
* [create](frontity.md#create)
* [createPackage](frontity.md#createpackage)
* [dev](frontity.md#dev)
* [error](frontity.md#error)
* [info](frontity.md#info)
* [observe](frontity.md#observe)
* [serve](frontity.md#serve)
* [subscribe](frontity.md#subscribe)
* [subscribe](frontity.md#subscribe)
* [useConnect](frontity.md#useconnect)
* [warn](frontity.md#warn)

### Classes

* [EventPromised](../classes/frontity.eventpromised.md)

### Interfaces

* [Decode](../interfaces/frontity.decode.md)

### Type aliases

* [Options](frontity.md#options)
* [Options](frontity.md#options)
* [PackageJson](frontity.md#packagejson)

### Variables

* [connect](frontity.md#const-connect)
* [createStore](frontity.md#const-createstore)
* [decode](frontity.md#const-decode)
* [fetch](frontity.md#const-fetch)

### Functions

* [choosePort](frontity.md#chooseport)
* [cloneStarterTheme](frontity.md#const-clonestartertheme)
* [createFrontitySettings](frontity.md#const-createfrontitysettings)
* [createPackageJson](frontity.md#const-createpackagejson)
* [createPackageJson](frontity.md#const-createpackagejson)
* [createReadme](frontity.md#const-createreadme)
* [createSrcIndexJs](frontity.md#const-createsrcindexjs)
* [downloadFavicon](frontity.md#const-downloadfavicon)
* [ensureProjectDir](frontity.md#const-ensureprojectdir)
* [errorLogger](frontity.md#const-errorlogger)
* [fetchPackageVersion](frontity.md#const-fetchpackageversion)
* [installDependencies](frontity.md#const-installdependencies)
* [installPackage](frontity.md#const-installpackage)
* [isFrontityProjectRoot](frontity.md#const-isfrontityprojectroot)
* [isPackageNameValid](frontity.md#const-ispackagenamevalid)
* [isThemeNameValid](frontity.md#const-isthemenamevalid)
* [log](frontity.md#const-log)
* [normalizeOptions](frontity.md#const-normalizeoptions)
* [revertProgress](frontity.md#const-revertprogress)
* [subscribe](frontity.md#const-subscribe)

## References

###  batch

• **batch**:

___

###  build

• **build**:

___

###  create

• **create**:

___

###  create

• **create**:

___

###  createPackage

• **createPackage**:

___

###  dev

• **dev**:

___

###  error

• **error**:

___

###  info

• **info**:

___

###  observe

• **observe**:

___

###  serve

• **serve**:

___

###  subscribe

• **subscribe**:

___

###  subscribe

• **subscribe**:

___

###  useConnect

• **useConnect**:

___

###  warn

• **warn**:

## Type aliases

###  Options

Ƭ **Options**: *object*

*Defined in [packages/frontity/src/steps/types.ts:2](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/types.ts#L2)*

#### Type declaration:

* **name**? : *string*

* **packages**? : *string[]*

* **path**? : *string*

* **theme**? : *string*

* **typescript**? : *boolean*

___

###  Options

Ƭ **Options**: *object*

*Defined in [packages/frontity/src/steps/create-package.ts:9](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/create-package.ts#L9)*

#### Type declaration:

* **name**? : *string*

* **namespace**? : *string*

* **packagePath**? : *string*

* **projectPath**? : *string*

___

###  PackageJson

Ƭ **PackageJson**: *object*

*Defined in [packages/frontity/src/steps/types.ts:17](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/types.ts#L17)*

#### Type declaration:

* **dependencies**(): *object*

* **description**: *string*

* **keywords**: *string[]*

* **name**: *string*

* **prettier**: *object*

* **private**: *boolean*

* **scripts**(): *object*

  * **build**: *string*

  * **dev**: *string*

  * **serve**: *string*

* **version**: *string*

## Variables

### `Const` connect

• **connect**: *[ConnectFunction](../interfaces/types.connectfunction.md)* = originalConnect as ConnectFunction

*Defined in [packages/frontity/src/index.ts:15](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/index.ts#L15)*

___

### `Const` createStore

• **createStore**: *[CreateStore](../interfaces/types.createstore.md)* = originalCreateStore as CreateStore

*Defined in [packages/frontity/src/index.ts:16](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/index.ts#L16)*

___

### `Const` decode

• **decode**: *[Decode](../interfaces/frontity.decode.md)* = typeof window !== "undefined" ? decodeClient : decodeServer

*Defined in [packages/frontity/src/index.ts:24](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/index.ts#L24)*

___

### `Const` fetch

• **fetch**: *fetch* = (nodeFetch as any) as WindowOrWorkerGlobalScope["fetch"]

*Defined in [packages/frontity/src/index.ts:19](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/index.ts#L19)*

## Functions

###  choosePort

▸ **choosePort**(`host`: string, `defaultPort`: number): *any*

*Defined in [packages/frontity/src/utils/choosePort.ts:16](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/choosePort.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`host` | string |
`defaultPort` | number |

**Returns:** *any*

___

### `Const` cloneStarterTheme

▸ **cloneStarterTheme**(`theme`: string, `path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:194](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`theme` | string |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` createFrontitySettings

▸ **createFrontitySettings**(`extension`: string, `name`: string, `path`: string, `theme`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:136](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`extension` | string |
`name` | string |
`path` | string |
`theme` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` createPackageJson

▸ **createPackageJson**(`name`: string, `theme`: string, `path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:69](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`theme` | string |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` createPackageJson

▸ **createPackageJson**(`name`: string, `namespace`: string, `projectPath`: string, `packagePath`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:21](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/create-package.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`namespace` | string |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` createReadme

▸ **createReadme**(`name`: string, `path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:120](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` createSrcIndexJs

▸ **createSrcIndexJs**(`name`: string, `namespace`: string, `projectPath`: string, `packagePath`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:48](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/create-package.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`namespace` | string |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` downloadFavicon

▸ **downloadFavicon**(`path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:218](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` ensureProjectDir

▸ **ensureProjectDir**(`path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹boolean›*

*Defined in [packages/frontity/src/steps/index.ts:48](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹boolean›*

___

### `Const` errorLogger

▸ **errorLogger**(`error`: [Error](../classes/source.servererror.md#static-error), `message?`: string): *never*

*Defined in [packages/frontity/src/utils/index.ts:19](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [Error](../classes/source.servererror.md#static-error) |
`message?` | string |

**Returns:** *never*

___

### `Const` fetchPackageVersion

▸ **fetchPackageVersion**(`pkg`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹any›*

*Defined in [packages/frontity/src/utils/index.ts:39](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`pkg` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹any›*

___

### `Const` installDependencies

▸ **installDependencies**(`path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:213](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` installPackage

▸ **installPackage**(`projectPath`: string, `packagePath`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:83](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/create-package.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` isFrontityProjectRoot

▸ **isFrontityProjectRoot**(`path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹boolean›*

*Defined in [packages/frontity/src/utils/index.ts:32](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹boolean›*

___

### `Const` isPackageNameValid

▸ **isPackageNameValid**(`name`: string): *boolean*

*Defined in [packages/frontity/src/utils/index.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Const` isThemeNameValid

▸ **isThemeNameValid**(`name`: string): *boolean*

*Defined in [packages/frontity/src/utils/index.ts:14](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Const` log

▸ **log**(`msg?`: any, ...`optionalParams`: any[]): *void*

*Defined in [packages/frontity/src/utils/index.ts:48](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`msg?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

### `Const` normalizeOptions

▸ **normalizeOptions**(`defaultOptions`: [Options](frontity.md#options), `passedOptions`: [Options](frontity.md#options)): *[Options](frontity.md#options)*

*Defined in [packages/frontity/src/steps/index.ts:29](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`defaultOptions` | [Options](frontity.md#options) |
`passedOptions` | [Options](frontity.md#options) |

**Returns:** *[Options](frontity.md#options)*

___

### `Const` revertProgress

▸ **revertProgress**(`dirExisted`: boolean, `path`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:227](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`dirExisted` | boolean |
`path` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` subscribe

▸ **subscribe**(`email`: string): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹Response‹››*

*Defined in [packages/frontity/src/steps/index.ts:242](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/steps/index.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹Response‹››*

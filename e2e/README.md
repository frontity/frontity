# E2E Tests

The e2e tests allow you to run tests using a real browser. They start both a Frontity server and a WordPress server, along with a browser.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Running the tests](#running-the-tests)
  * [Adding new tests](#adding-new-tests)
  * [Installing WordPress plugins](#installing-wordpress-plugins)
  * [Configuring WordPress Database](#configuring-wordpress-database)
  * [Uploading files to WordPress](#uploading-files-to-wordpress)
- [CLI](#cli)
- [Running the Cypress tests in BrowserStack](#running-the-cypress-tests-in-browserstack)
  * [`--wp`: string](#-wp-string)
  * [`--prod`: boolean](#-prod-boolean)
  * [`--target`: "es5" | "module" | "both"](#-target-es5-module-both)
  * [`--cypress`: "open" | "run" | "browserstack" | "off"](#-cypress-open-run-browserstack-off)
  * [`--browser`: "chrome" | "firefox" | "edge"](#-browser-chrome-firefox-edge)
  * [`--suite`: "all" | string](#-suite-all-string)
  * [`--inspect`: boolean](#-inspect-boolean)
  * [`--spec`: string](#-spec-string)
  * [`--browserstack-config`: string](#-browserstack-config-string)
  * [`--browserstack-local`: string](#-browserstack-local-string)
- [Running the Selenium tests in BrowserStack](#running-the-selenium-tests-in-browserstack)

<!-- tocstop -->

## Installation

- Install Docker on your computer.
- Install the dependencies of the e2e tests: `cd e2e && npm install`.

## Usage

### Running the tests

Use the `node e2e.js` CLI:

```sh
cd e2e && node e2e.js
```

This command will:

- Start a WordPress instance in the 8080 port.
- Start a Frontity project in the 3001 port.
- Run the e2e tests using Cypress.

### Adding new tests

1. Create a Frontity site in `e2e/project/frontity.settings.js`.

1. If you need a package, you can create one in the `e2e/packages` folder. Remember to add it to the `e2e/project/package.json` and run `npm install` again from the root (`/`) so `lerna` can link the new package.

1. Create a `my-tests.spec.js` file in either:

   - The `e2e/integration/frontity-01` folder if they don't require a WordPress instance.
   - The `e2e/integration/wordpress-01` folder if they require a WordPress instance.

_In the future we may add other `frontity-xx` or `wordpress-xx` folders to be able to run tests in parallel in the CI._

Tests are written using the Cypress API. Please refer to their documentation for reference: https://docs.cypress.io/guides/overview/why-cypress.html#Writing-tests

### Installing WordPress plugins

You can use a Cypress task to install plugins in your spec file.

```js
before(() => {
  cy.task("installPlugin", { name: "some-wp-plugin" });
});
```

By default it will install the last stable version. If you want to test a specific version, you can do so using `version`:

```js
before(() => {
  cy.task("installPlugin", { name: "some-wp-plugin", version: "12.6" });
});
```

Internally, it uses the [WP CLI to install](https://developer.wordpress.org/cli/commands/plugin/install/) the plugins.

**It does not activate the plugin after installation.** If you want to activate the plugin, login in WordPress and then export the database, as explained in the "Configuring WordPress Database" section below.

If you install a WordPress plugin, it is required that you run the `removeAllPlugins` task in the `after` of your spec, like:

```js
after(() => {
  cy.task("removeAllPlugins");
});
```

### Configuring WordPress Database

Once WordPress has started, you can access it in `http://localhost:8080`.

If you need to modify the database, you can log in on `http://localhost:8080/wp-admin` with the user name `admin` and the password `password`.

After you've done your modifications, export the database to the `e2e/wp-data` folder using:

```sh
node export-db.js ./wp-data/my-test-suite/my-database.sql
```

You can replace the database in your spec file using a Cypress task:

```js
before(() => {
  cy.task("loadDatabase", {
    path: "./wp-data/my-test-suite/my-database.sql",
  });
});
```

And commit the new database along with your new tests.

If you replace the database, it is required that you run the `resetDatabase` task in the `after` of your spec, like:

```js
after(() => {
  cy.task("removeAllPlugins");
  cy.task("resetDatabase");
});
```

If you need to reset the database while you're working, you can do so with the `node reset-db.js` command.

### Uploading files to WordPress

If you need to, you can also upload files, which will end up on the `e2e/data/uploads` folder. Those files are currently shared among all the tests, although we may change that in the future.

## CLI

The `node e2e.js` script is a CLI that supports multiple arguments for running the e2e tests in different configurations.

The defaults correspond to the most common configuration when working locally, so running just `node e2e.js` will be enough to start working locally most of the time.

## Running the Cypress tests in BrowserStack

BrowserStack can be used to run the tests in the cloud. If you want to do that, create a `.env` file with your BrowserStack username and access key, and then use `node e2e.js --cypress browserstack` to start.

> 💡 Credentials can be found in the BrowserStack [Automate Dashboard](https://automate.browserstack.com/dashboard/v2), under the "ACCESS KEY" dropdown of the top bar.

By default, it will run the tests in the latest versions of Chrome, Firefox and Edge in Windows 10.

You can create your own `browserstack.json` file and use `--browserstack-config my-browserstack.json` to use it.

By default it will run BrowserStack Local with "Cypress-Local" as the local identifier, but you can turn it off by using `--browserstack-local off`.

### `--wp`: string

The WordPress version that will be used in the Docker container. For example, `--wp 5.5`.

You can use `off` to prevent WordPress from running.

WordPress won't load in these situations:

- `--wp` is `off`.
- `--cypress` is `browserstack`.
- `--suite` is not `all` or it doesn't start with `wordpress`.

Default: `latest`

### `--prod`: boolean

If Frontity runs in production mode (`npx frontity build && npx frontity server`) or in development mode (`npx frontity dev`).

Default: `false`

### `--target`: "es5" | "module" | "both"

The Frontity `target` that will be used.

Default: `both`

### `--cypress`: "open" | "run" | "browserstack" | "off"

Whether to run Cypress or not, and if it does, whether to run it in "open" mode, "run" mode, or on the BrowserStack cloud.

_The BrowserStack cloud requires the setup of a `.env` file with the username and access key. Please check the `.env-example` file._

Default: `open`

### `--browser`: "chrome" | "firefox" | "edge"

The browser used to run the tests. Only browsers supported by Cypress and installed in the system are possible.

Default: `chrome`

### `--suite`: "all" | string

The tests suite to run. `all` will run all the suites. Each suite represents a different folder in the `e2e/integrations` folder. For example `--suite wordpress-01` will only run the specs found in the `e2e/integrations/wordpress-01` folder.

Default: `all`.

### `--inspect`: boolean

If present, it will start the Frontity dev server using `node --inspect`.

Default: `false`.

### `--spec`: string

The tests spec to run. This should be the file name spec. For example if you want to run a single spec file, you should pass the name without the `.spec.js` suffix, like so:

```sh
# This will run only the script.spec.js file in the `./integrations` folder
node e2e.js --spec script
```

_It doesn't affect if Cypress is run in `"open"` mode._

Default: `null`.

### `--browserstack-config`: string

The BrowserStack configuration file. For example:

```sh
node e2e.js --browserstack-config browserstack.custom.json
```

Default: `browserstack.json`.

### `--browserstack-local`: string

The local identifier of the BrowserStack Local connection.

BrowserStack Local only runs if `--cypress` is `browserstack`. For example:

```sh
node e2e.js --cypress browserstack --browserstack-local MyLocalMachine
```

If you don't want to start BrowserStack Local, use:

```sh
node e2e.js --cypress browserstack --browserstack-local off
```

Default: `Cypress-Local`.

## Running the Selenium tests in BrowserStack

Cypress tests work great, but it is only possible to test Frontity in certain
browsers using BrowserStack. In order to ensure that the framework works in older
browsers as well, we replicate most of them in Selenium.

There are different ways of using [Selenium in
BrowserStack](https://www.browserstack.com/selenium), but in this case, we will
only use [Selenium Webdriver](https://www.browserstack.com/selenium#selenium-web-driver), their recommended way to automate tests.

The specs are divided in three main groups:

- Browsers that support [module](https://caniuse.com/?search=module).
- Browsers that support [proxy](https://caniuse.com/?search=proxy).
- Browsers that doesn't support proxy, where we want to ensure that Frontity
  works in SSR.

These tests will run in the `dev` branch the same way the Cypress ones do, but it's possible
to run them locally as well. It's possible to run the default config files, with
the combinations of browsers and operative systems already defined, or create
a custom config file if needed. These are the steps:

1. Start the e2e project locally by running `npx frontity build && npx frontity serve`. Note that running `npx frontity dev` could cause issues in old
   browsers.

1. Start BrowserStack Local by running `npm run local:macos` (or the OS you are
   using)

1. Run the configuration file using `npx wdio :config-file-path`. For
   example, to run the default module config file the command should be `npx wdio selenium/conf/module.conf.js`.

The properties in these files are defined based on [WebDriver configuration
file](https://webdriver.io/docs/configurationfile/).

This workflow will trigger the specs defined, and the results could be seen both
in the console and BrowserStack Automate tool.

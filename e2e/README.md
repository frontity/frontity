# E2E Tests

- There are two kinds of e2e tests: Ones that use custom WordPress instaces (using docker container) one ones that don't.
- We use the cypress.js tasks to manage docker containers. They are in `plugins/index.js`.
- It is highly recommended that you run the `resetDatabase` and `removeAllPlugins` tasks in the beforeEach of each test suite like:
  ```
  cy.task("resetDatabase");
  cy.task("removeAllPlugins");
  ```

## Dumping the database

You can dump the contents of the database with the `exportDatabase.sh` script:

```sh
./exportDatabase.js > ./fixtures/dump.sql
```

This is very useful for local development when you make manual changes in the WP instance and want to persist them for the future

## CLI options

The `e2e.js` script is a CLI that supports multiple options for running the e2e tests in different configurations. Check the source for available options.

## Local development workflow

If you want to run tests that use the WordPress instances

```sh
cd e2e
./e2e.js
```

If you **only** want to run the tests for instances that do not require the WordPress instances:

```sh
cd e2e
./e2e.js --suite e2e
```

It's recommended to create a .env file for convenience to pass the `WORDPRESS_VERSION` to the `docker-compose.yml` file. Example

```bash
# e2e/.env
WORDPRESS_VERSION=5.0
```

## Future improvements

We could set the following settings via environment variables instead of hardcoding them:

- WP database name (`wordpress`)
- WP database username (`root`)
- WP database password (`password`)
- WP admin username (`admin`)
- WP admin password (`password`)
- frontity project port (`3001`)
- WP instance port (`8080`)

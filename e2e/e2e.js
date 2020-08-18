#!/usr/bin/env node
const waitOn = require("wait-on");
const execa = require("execa");
const cypress = require("cypress");
const argv = require("minimist")(process.argv.slice(2));

(async () => {
  try {
    // Set the WordPress version as an environment variable to be consumed by
    // the docker-compose.yml file.
    process.env.WORDPRESS_VERSION = "latest";

    // Stop all the containers and remove all the volumes that they use (the
    // `-v` option).
    await execa("docker-compose", ["down", "-v"], {
      stdio: "inherit",
    });

    // Run all the services defined in docker-compose.yml: wp, wpcli & mysql
    // (in the background via the -d flag).
    await execa("docker-compose", ["up", "-d"], { stdio: "inherit" });

    // Wait until WordPress is responsive.
    await waitOn({
      resources: ["http-get://localhost:8080"],
      log: true,
    });

    // Give read and write permission to all files under /var/www/html in the
    // WordPress container This is fine because we are only using the instances
    // for testing.
    await execa(
      "docker-compose",
      ["run", "wp", "/bin/bash", "-c", "chmod -R 777 /var/www/html"],
      { stdio: "inherit" }
    );

    // CD into the project directory
    process.chdir("./project");

    // TODO: cd into the project folder
    // when in dev:
    //  - npx frontity dev
    // when in prod:
    //  - npx frontity build && npx frontity serve

    // build
    await execa("npx", ["frontity", "build"], {
      stdio: "inherit",
    });

    // serve
    execa("npx", ["frontity", "serve", "--port", "3001"], {
      stdio: "inherit",
    });

    // Wait for the frontity app to become available
    await waitOn({ resources: ["http-get://localhost:3001"] });

    // CD into the e2e directory
    process.chdir("..");

    // Run Cypress.
    await cypress.open({ env: { WORDPRESS_VERSION: "latest" } });

    // It seems that if we run a script as a child process we have to explicitly
    // exit with a status code so that the parent process can continue
    process.exit(0);
  } catch (err) {
    console.error(err);

    // We need to return the exit code so that the github action returns a fail
    process.exit(1);
  }
})();

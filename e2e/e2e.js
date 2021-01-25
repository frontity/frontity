#!/usr/bin/env node
// @ts-check
const waitOn = require("wait-on");
const execa = require("execa");
const cypress = require("cypress");
const argv = require("minimist")(process.argv.slice(2));
const { platform } = require("os");

/**
 * Validates the CLI arguments and throws an error if a value is not correct.
 *
 * @param arg - The CLI argument.
 * @param options - Options object. Contains `possibleValues` with all the
 * possible values.
 */
function validateArgs(arg, { possibleValues }) {
  if (!possibleValues.includes(arg)) {
    throw new Error(`${arg} is not one of "${possibleValues.join(" | ")}"`);
  }
}

let {
  "wp-version": wpVersion,
  target,
  browser,
  prod,
  cypress: cypressCommand,
  suite,
  "public-path": publicPath,
  inspect,
} = argv;

// Sane defaults for local development.
wpVersion = wpVersion || "latest";
target = target || "both";
browser = browser || "chrome";
prod = prod || false;
cypressCommand = cypressCommand || "open";
suite = suite || "all";
inspect = inspect || false;

// Flag to know if we have started Docker.
let isDockerRunning = false;

// Validate CLI args.
validateArgs(target, { possibleValues: ["es5", "module", "both"] });
validateArgs(browser, {
  possibleValues: ["firefox", "chrome", "edge", "electron"],
});
validateArgs(cypressCommand, { possibleValues: ["open", "run", "off"] });

// We have to make sure that we are runnng inside of the e2e directory The
// script assumes that files are relative to this location.
process.chdir(__dirname);

// Set the FRONTITY_MODE for the tests to rely on.
// Setting it as a CYPRESS_ env variables makes it work
// regardless of using cypress UI or github action
process.env["CYPRESS_FRONTITY_MODE"] =
  process.env["CYPRESS_FRONTITY_MODE"] || (prod ? "production" : "development");

(async () => {
  try {
    if (suite === "all" || suite.startsWith("wordpress")) {
      // Set the WordPress version as an environment variable to be consumed by
      // the docker-compose.yml file.
      process.env.WORDPRESS_VERSION = wpVersion;

      // Set the Frontity server address. In Windows and Mac we use
      // `host.docker.internal` and in Linux we use `172.17.0.1`.
      process.env.FRONTITY_SERVER =
        platform() === "darwin" || platform().startsWith("win")
          ? "http://host.docker.internal:3001"
          : "http://172.17.0.1:3001";

      // Stop all the containers and remove all the volumes that they use (the
      // `-v` option).
      await execa("docker-compose", ["down", "-v"], {
        stdio: "inherit",
      });

      // Run all the services defined in docker-compose.yml: wp, wpcli & mysql
      // (in the background via the -d flag).
      await execa("docker-compose", ["up", "-d"], { stdio: "inherit" });

      // Set the flag. We will needed it later to stop the containers.
      isDockerRunning = true;

      // Wait until WordPress is responsive.
      await waitOn({
        resources: ["http-get://localhost:8080"],
        log: true,
      });

      // Give read and write permission to all files under /var/www/html in the
      // WordPress container This is fine because we are only using the
      // instances for testing.
      await execa(
        "docker-compose",
        ["run", "--rm", "wp", "/bin/bash", "-c", "chmod -R 777 /var/www/html"],
        { stdio: "inherit" }
      );
    }

    // CD into the project directory.
    process.chdir("./project");

    if (prod) {
      let args = ["frontity", "build", "--target", target];

      // Only if publicPath was passed as a CLI argument, add it to the final
      // command.
      if (publicPath) {
        args = [...args, "--public-path", publicPath];
      }

      // Build.
      await execa("npx", args, {
        stdio: "inherit",
      });

      // Serve.
      execa("npx", ["frontity", "serve", "--port", "3001"], {
        stdio: "inherit",
      });
    } else {
      let args = inspect
        ? [
            "--inspect",
            "./node_modules/.bin/frontity",
            "dev",
            "--port",
            "3001",
            "--dont-open-browser",
          ]
        : ["frontity", "dev", "--port", "3001", "--dont-open-browser"];
      // Only if publicPath was passed as a CLI argument, add it to the final
      // command.
      if (publicPath) {
        args = [...args, "--public-path", publicPath];
      }

      // Only if target is es5, add it to the final command.
      if (target === "es5") {
        args = [...args, "--target", target];
      }

      // Dev.
      execa(inspect ? "node" : "npx", args, {
        stdio: "inherit",
      });
    }

    // Wait for the frontity app to become available.
    await waitOn({ resources: ["http-get://localhost:3001"] });

    // CD back into the e2e directory.
    process.chdir("..");

    // Workaround for a bug in Cypress, otherwise it fails with electron:
    // -max-http-header-size=1048576 is not allowed in NODE_OPTIONS.
    // eslint-disable-next-line require-atomic-updates
    process.env.NODE_OPTIONS = "";

    // Run Cypress if the `cypressCommnand` is not "off".
    if (cypressCommand !== "off") {
      if (cypressCommand === "open") {
        await cypress.open({
          env: { WORDPRESS_VERSION: wpVersion },
          browser,
        });
      } else if (cypressCommand === "run") {
        if (suite === "all") {
          await cypress.run({
            env: { WORDPRESS_VERSION: wpVersion },
            spec: `./integration/**/*.spec.js`,
            browser,
          });
        } else {
          await cypress.run({
            env: { WORDPRESS_VERSION: wpVersion },
            browser,
            spec: `./integration/${suite}/**/*.spec.js`,
          });
        }
      }

      if (isDockerRunning) {
        // Stop all the containers and remove all the volumes that they use (the
        // `-v` option).
        await execa("docker-compose", ["down", "-v"], {
          stdio: "inherit",
        });
      }

      // Exit the process to indicate that everything went fine.
      process.exit(0);
    }
  } catch (err) {
    console.error(err);

    if (isDockerRunning) {
      // Stop all the containers and remove all the volumes that they use (the
      // `-v` option).
      await execa("docker-compose", ["down", "-v"], {
        stdio: "inherit",
      });
    }

    // We need to return the exit code so that the GitHub action returns a fail.
    process.exit(1);
  }
})();

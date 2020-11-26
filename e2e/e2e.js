#!/usr/bin/env node
// @ts-check
require("dotenv").config();
const { readFile } = require("fs").promises;
const { platform } = require("os");
const waitOn = require("wait-on");
const execa = require("execa");
const cypress = require("cypress");
const argv = require("minimist")(process.argv.slice(2));
const fetch = require("node-fetch").default;

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
} = argv;

// Sane defaults for local development.
wpVersion = wpVersion || "latest";
target = target || "both";
browser = browser || "chrome";
prod = prod || false;
cypressCommand = cypressCommand || "open";
suite = suite || "all";

// Flag to know if we have started Docker or BrowserStack Local.
let isDockerRunning = false;
let isBrowserStackLocalRunning = false;

// Validate CLI args.
validateArgs(target, { possibleValues: ["es5", "module", "both"] });
validateArgs(browser, { possibleValues: ["firefox", "chrome", "edge"] });
validateArgs(cypressCommand, {
  possibleValues: ["open", "run", "off", "browserstack"],
});

// We have to make sure that we are runnng inside of the e2e directory The
// script assumes that files are relative to this location.
process.chdir(__dirname);

/**
 * Stops the processes that are still running.
 */
const stop = async () => {
  if (isDockerRunning) {
    // Stop all the containers and remove all the volumes that they use (the
    // `-v` option).
    await execa("docker-compose", ["down", "-v"], {
      stdio: "inherit",
    });
    isDockerRunning = false;
  }

  if (isBrowserStackLocalRunning) {
    // Stop BrowserStackLoca.
    await execa(
      "./browserstack-local/macOS",
      ["--key", process.env.BROWSERSTACK_ACCESS_KEY, "--daemon", "stop"],
      {
        stdio: "inherit",
      }
    );
    isBrowserStackLocalRunning = false;
  }
};

/**
 * Sleep for a number of seconds.
 *
 * @param sec - The number of seconds to wait.
 * @returns Resolves once the seconds have passed.
 */
const sleep = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

/**
 * Retrieve the status of the tests that are running.
 *
 * @param buildId - The id of the current build.
 * @returns The status of the build.
 */
const browserStackStatus = async (buildId) => {
  const response = await fetch(
    `https://api.browserstack.com/automate/cypress/v1/builds/${buildId}`,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.BROWSERSTACK_USERNAME +
              ":" +
              process.env.BROWSERSTACK_ACCESS_KEY
          ).toString("base64"),
      },
    }
  );
  const { status } = await response.json();
  return status;
};

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
      let args = ["frontity", "dev", "--port", "3001", "--dont-open-browser"];

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
      execa("npx", args, {
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

    // Run Cypress in the Browserstack cloud.
    if (cypressCommand === "browserstack") {
      if (!process.env.BROWSERSTACK_ACCESS_KEY)
        throw new Error(
          "The $BROWSERSTACK_ACCESS_KEY env variable is required. Please create one. You can use the .env file."
        );

      // Start Browserstack local.
      console.log("\nStarting BrowserStack Local...");

      switch (platform()) {
        case "darwin":
          await execa(
            "./browserstack-local/macOS",
            ["--key", process.env.BROWSERSTACK_ACCESS_KEY, "--daemon", "start"],
            {
              stdio: "inherit",
            }
          );
          break;
        case "win32":
          await execa(
            "./browserstack-local/win.exe",
            ["--key", process.env.BROWSERSTACK_ACCESS_KEY, "--daemon", "start"],
            {
              stdio: "inherit",
            }
          );
          break;
        default:
          await execa(
            "./browserstack-local/linux",
            ["--key", process.env.BROWSERSTACK_ACCESS_KEY, "--daemon", "start"],
            {
              stdio: "inherit",
            }
          );
          break;
      }

      isBrowserStackLocalRunning = true;

      // Launch the cloud tests.
      console.log("\nSending the tests to BrowserStack...");
      await execa("npx", ["browserstack-cypress", "run"], { stdio: "inherit" });

      // Get info for this build.
      const buildResults = await readFile("log/build_results.txt", "utf-8");
      const {
        buildId,
        buildUrl,
      } = /BUILD_ID=(?<buildId>[^\n]+)\nBUILD_URL=(?<buildUrl>.+)/.exec(
        buildResults
      ).groups;
      console.log(
        `\nTests started. You can take a look at the dashboard here: ${buildUrl}`
      );

      // Wait until the tests finish.
      let status = "running";
      while (status === "running") {
        console.log("Test are running, please wait...");
        await sleep(10);
        status = await browserStackStatus(buildId);
      }
      console.log(`\nTests have finished! Final status is: ${status}`);

      // Stop the processes that we started.
      await stop();
      // Exit the process to indicate that everything went fine.
      process.exit(0);
    } else if (cypressCommand !== "off") {
      // Run Cypress if the `cypressCommnand` is not "off".
      if (cypressCommand === "open") {
        await cypress.open({ env: { WORDPRESS_VERSION: wpVersion }, browser });
      } else if (cypressCommand === "run") {
        if (suite === "all") {
          await cypress.run({
            env: { WORDPRESS_VERSION: wpVersion },
            spec: `**/integration/**/*.spec.{js|ts}`,
            browser,
          });
        } else {
          await cypress.run({
            env: { WORDPRESS_VERSION: wpVersion },
            browser,
            spec: `**/integration/${suite}/**/*.spec.{js|ts}`,
          });
        }
      }

      // Stop the processes that we started.
      await stop();
      // Exit the process to indicate that everything went fine.
      process.exit(0);
    }
  } catch (err) {
    console.error(err);
    // Stop the processes that we started.
    await stop();
    // We need to return the exit code so that the GitHub action returns a fail.
    process.exit(1);
  }
})();

// Capture CTRL+C.
process.on("SIGINT", async () => {
  console.log("\n\nStopping the processes that we started, please wait.");
  // Stop the processes that we started.
  await stop();
  process.exit();
});

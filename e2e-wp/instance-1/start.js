#!/usr/bin/env node
/* eslint-disable */
const waitOn = require("wait-on");
const execa = require("execa");
const cypress = require("cypress");

// The test suites to run
const TESTS = ["wp-test.spec.js"];

const { WP_INSTANCE } = process.env;

(async () => {
  try {
    process.chdir("../project");

    // build
    await execa("npx", ["frontity", "build"], {
      shell: true,
      stdio: "inherit",
    });

    // serve
    execa("npx", ["frontity", "serve", "--port", "3001"], {
      stdio: "inherit",
    });

    // Wait for the frontity app to become available
    await waitOn({
      resources: ["http-get://localhost:3001"],
    });

    // At this point we could put additional configuration that could be specific
    // to this instance.

    // The cypress tests have to be run out of the parent dirctory
    process.chdir("..");

    // Workaround for a bug in cypress, otherwise it fails with:
    // electron: -max-http-header-size=1048576 is not allowed in NODE_OPTIONS
    process.env.NODE_OPTIONS = "";

    const testfiles = TESTS.map((t) => `./integration/${t}`).join(",");

    // Run the tests and inject the WP instance name as an env variable so
    // that it can be read out later like: `const { WP_INSTANCE } = Cypress.env();`
    await cypress.run({ spec: testfiles, env: { WP_INSTANCE } });

    // It seems that if we run a script as a child process we have to explicitly
    // exit with a status code so that the parent process can continue
    process.exit(0);
  } catch (err) {
    console.error(err);

    // We need to return the exit code so that the github action returns a fail
    process.exit(1);
  }
})();

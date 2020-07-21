#!/usr/bin/env node
/* eslint-disable */
const waitOn = require("wait-on");
const execa = require("execa");
const cypress = require("cypress");

const { installPlugin } = require("../scripts");

// The test suites to run
const TESTS = ["wp-test.spec.js"];

const { WP_INSTANCE } = process.env;

(async () => {
  try {
    // run docker
    await execa("docker-compose", ["up", "-d"], { stdio: "inherit" });

    await waitOn({
      resources: ["http-get://localhost:8080"],
      interval: 1000,
    });

    // give read and wrie permission to all files
    await execa("docker-compose", [
      "run",
      "wp",
      "/bin/bash",
      "-c",
      "chmod -R 777 /var/www/html",
    ]);

    // // Install plugins.
    await installPlugin("all-in-one-seo-pack");

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

    await waitOn({
      resources: ["http-get://localhost:3001"],
      interval: 1000,
    });

    process.chdir("..");

    // workaround for a bug:
    // electron: -max-http-header-size=1048576 is not allowed in NODE_OPTIONS
    process.env.NODE_OPTIONS = "";

    const testfiles = TESTS.map((t) => `./integration/${t}`).join(",");

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

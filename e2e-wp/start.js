#!/usr/bin/env node
const execa = require("execa");

// Get the name of the instance
// This is normally passed through standard input:
// - locally, the usr has to speify the instance they want to run the tests for like:
// npm run start -- "instance-1"
// - on the CI, this argument is provided from the github actions
const instance = process.argv[2];

if (!instance) {
  throw new Error(
    "You need to specify the WP instance for which to run the tests!"
  );
}

// The name of the instance will be reused in multiple scripts so to avoid
// passing it around, we set it as ENV variable
process.env.WP_INSTANCE = instance;

// Enter the directory of the WP instance
process.chdir(instance);

(async () => {
  try {
    // run the start script for the instance
    await execa("./start.js", [instance], { stdio: "inherit" });

    // It appears that we have to exit with explicit status codes for Github Actions
    // to fail / succeed accordingly.
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

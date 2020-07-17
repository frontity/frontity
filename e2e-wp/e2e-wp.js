#!/usr/bin/env node
const execa = require("execa");

const instance = process.argv[2];

if (!instance) {
  throw new Error("Specifiy the WP instance for which to run the tests!");
}

process.env.WP_INSTANCE = instance;

process.chdir(instance);

(async () => {
  try {
    // run the start script for the instance
    await execa("./start.js", [instance], { stdio: "inherit" });

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

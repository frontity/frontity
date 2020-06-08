#!/usr/bin/env node
const spawn = require("child_process").spawn;
const args = process.argv.slice(2);

spawn("npx", ["frontity", "create", args], {
  stdio: "inherit",
});

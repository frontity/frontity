#!/usr/bin/env node
const execa = require("execa");
const waitOn = require("wait-on");

(async () => {
  const input = process.argv[2];

  const [instance, tests] = input.split(":");

  process.chdir(instance);

  try {
    // docker
    const dockerProcess = execa("./start-e2e-docker.js");
    dockerProcess.stdout.pipe(process.stdout);
    await dockerProcess;

    process.chdir("../project");

    // build
    const buildProcess = execa("npx", ["frontity", "build"], {
      shell: true,
    });
    buildProcess.stdout.pipe(process.stdout);
    await buildProcess;

    // serve
    const serveProcess = execa("npx", ["frontity", "serve", "--port", "3001"]);
    serveProcess.stdout.pipe(process.stdout);

    await waitOn({
      resources: ["http-get://localhost:3001"],
      interval: 1000,
    });

    process.chdir("..");

    const testProcess = execa(
      "npx",
      ["cypress", "run", "--env", "HEADLESS=true", "--spec", tests],
      { shell: true }
    );
    testProcess.stdout.pipe(process.stdout);
    await testProcess;
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();

#!/usr/bin/env node
/* eslint-disable */
const waitOn = require("wait-on");
const execa = require("execa");

(async () => {
  try {
    // run docker
    await execa("docker-compose", ["up", "-d"], { stdio: "inherit" });

    await waitOn({
      resources: ["http-get://localhost:8080"],
      interval: 1000,
    });

    // Install plugins.
    // https://github.com/docker-library/wordpress/issues/417#issuecomment-514360301
    await execa.command(
      "docker run -i --user 33 \
      --volumes-from instance-1_wp_1 \
      --network container:instance-1_wp_1 \
      wordpress:cli wp plugin install all-in-one-seo-pack --activate",
      { stdio: "inherit" }
    );
  } catch (err) {
    console.error(err);

    // We need to return the exit code so that the github action returns a fail
    process.exit(1);
  }
})();

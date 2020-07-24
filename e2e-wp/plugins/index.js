/* eslint-disable */
const execa = require("execa");
const waitOn = require("wait-on");
const { installPlugin } = require("../scripts");

module.exports = (on, config) => {
  on("task", {
    installPlugin({ WP_INSTANCE, name }) {
      // Because cypress commands are async but are not promises,
      // we have to wrap all task functions with a new Promise constructor.
      // https://stackoverflow.com/a/49980928/2638310
      //
      // Asynchronous tasks HAVE TO return a promise.
      // https://docs.cypress.io/api/commands/task.html#Return-a-Promise-from-an-asynchronous-task
      //
      //
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            await installPlugin(WP_INSTANCE, name);
          } catch (err) {
            reject(err);
          }
          // A cypress task HAS to return null or return a promise that resolves to null
          // otherwise it will fail
          resolve(null);
        })();
      });
    },

    setup(WP_INSTANCE) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            // Stop all the containers and remove all the volumes that they use (the `-v` option)
            await execa(
              "docker-compose",
              ["-f", `./${WP_INSTANCE}/docker-compose.yml`, "down", "-v"],
              {
                stdio: "inherit",
              }
            );

            // Run all the services defined in docker-compose.yml: wp, wpcli & mysql
            await execa(
              "docker-compose",
              ["-f", `./${WP_INSTANCE}/docker-compose.yml`, "up", "-d"],
              { stdio: "inherit" }
            );

            // Wait until WP is responsive
            await waitOn({
              resources: ["http-get://localhost:8080"],
              log: true,
            });

            // Give read and write permission to all files under /var/www/html in the WP container
            // This is fine because we are only using the instances for testing
            await execa("docker-compose", [
              "-f",
              `./${WP_INSTANCE}/docker-compose.yml`,
              "run",
              "wp",
              "/bin/bash",
              "-c",
              "chmod -R 777 /var/www/html",
            ]);
          } catch (e) {
            reject(e);
          }

          console.log("Finished setup");

          resolve(null);
        })();
      });
    },
  });
};

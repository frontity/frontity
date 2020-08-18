/* eslint-disable */
const { initPlugin } = require("cypress-plugin-snapshots/plugin");
const execa = require("execa");

module.exports = (on, config) => {
  on("task", {
    installPlugin({ name }) {
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
            await execa.command(
              `docker-compose run --rm wpcli wp plugin install ${name} --activate`,
              { stdio: "inherit" }
            );
          } catch (err) {
            reject(err);
          }
          // A cypress task HAS to return null or return a promise that resolves to null
          // otherwise it will fail
          resolve(null);
        })();
      });
    },
  });
  initPlugin(on, config);
  return config;
};

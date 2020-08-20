/* eslint-disable */
const { initPlugin } = require("cypress-plugin-snapshots/plugin");
const execa = require("execa");

module.exports = (on, config) => {
  on("task", {
    installPlugin({ name }) {
      // Asynchronous tasks in cypress HAVE TO return a promise which resolves to a value or a null.
      // https://docs.cypress.io/api/commands/task.html#Return-a-Promise-from-an-asynchronous-task
      //
      // For this reason it's more convenient to NOT use async/await here.
      //
      return new Promise((resolve, reject) => {
        execa
          .command(
            `docker-compose run --rm wpcli wp plugin install ${name} --activate`,
            {
              stdio: "inherit",
            }
          )
          .then(() => resolve(null))
          .catch((e) => reject(e));
      });
    },
    loadDatabase({ path }) {
      return new Promise((resolve, reject) => {
        execa
          .command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ${path}`,
            {
              stdio: "inherit",
              shell: true, // Because we use file redirection (the "<") in the command
            }
          )
          .then(() => resolve(null))
          .catch((e) => reject(e));
      });
    },
    resetDatabase() {
      return new Promise((resolve, reject) => {
        execa
          .command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ./data/db.sql`,
            {
              stdio: "inherit",
              shell: true, // Because we use file redirection (the "<") in the command
            }
          )
          .then(() => resolve(null))
          .catch((e) => reject(e));
      });
    },
    removeAllPlugins() {
      return new Promise((resolve, reject) => {
        execa
          .command(
            `docker-compose exec -T wp /bin/bash -c "rm -rf /var/www/html/wp-content/plugins/*"`,
            {
              stdio: "inherit",
              shell: true,
            }
          )
          .then(() => resolve(null))
          .catch((e) => reject(e));
      });
    },
  });
  initPlugin(on, config);
  return config;
};

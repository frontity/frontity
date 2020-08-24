/* eslint-disable */
const { initPlugin } = require("cypress-plugin-snapshots/plugin");
const execa = require("execa");

module.exports = (on, config) => {
  on("task", {
    installPlugin({ name, version }) {
      return (async () => {
        try {
          await execa.command(
            `docker-compose run --rm wpcli wp plugin install ${name}${
              version ? ` --version=${version}` : ""
            }`,
            { stdio: "inherit" }
          );
          // Asynchronous tasks in cypress HAVE TO return a promise which resolves to a value or a null.
          // https://docs.cypress.io/api/commands/task.html#Return-a-Promise-from-an-asynchronous-task
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },
    loadDatabase({ path }) {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ${path}`,
            {
              stdio: "inherit",
              shell: true, // Because we use file redirection (the "<") in the command
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },
    resetDatabase() {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ./data/db.sql`,
            {
              stdio: "inherit",
              shell: true, // Because we use file redirection (the "<") in the command
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },
    removeAllPlugins() {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T wp /bin/bash -c "rm -rf /var/www/html/wp-content/plugins/*"`,
            {
              stdio: "inherit",
              shell: true,
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },
  });
  initPlugin(on, config);
  return config;
};

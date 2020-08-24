const { initPlugin } = require("cypress-plugin-snapshots/plugin");
const execa = require("execa");

/**
 * The plugins export.
 *
 * @param on - The callback from Cypress.
 * @param config - The config object from Cypress.
 *
 * @returns The modified config.
 */
module.exports = (on, config) => {
  on("task", {
    /**
     * Installs a WordPress plugin.
     *
     * Oficial WP CLI docs: https://developer.wordpress.org/cli/commands/plugin/install/.
     *
     * @param options - Options object:
     * - `name`: The name of the plugin.
     * - `version`: The version of the plugin.
     *
     * @returns Null if successful. Throws an error otherwise.
     */
    installPlugin({ name, version }) {
      return (async () => {
        try {
          await execa.command(
            `docker-compose run --rm wpcli wp plugin install ${name}${
              version ? ` --version=${version}` : ""
            }`,
            { stdio: "inherit" }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },

    /**
     * Loads a new database.
     *
     * @param options - Options object:
     * - `path`: the path where the database SQL file is located. Relative to
     * the `e2e` folder.
     *
     * @returns Null if successful. Throws an error otherwise.
     */
    loadDatabase({ path }) {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ${path}`,
            {
              stdio: "inherit",
              // Because we use file redirection (the "<") in the command.
              shell: true,
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },

    /**
     * Loads the default database.
     *
     * @returns Null if successful. Throws an error otherwise.
     */
    resetDatabase() {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T db mysql -uroot -ppassword wordpress < ./data/db.sql`,
            {
              stdio: "inherit",
              // Because we use file redirection (the "<") in the command.
              shell: true,
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },

    /**
     * Removes all the WordPress plugins.
     *
     * @returns Null if successful. Throws an error otherwise.
     */
    removeAllPlugins() {
      return (async () => {
        try {
          await execa.command(
            `docker-compose exec -T wp /bin/bash -c "rm -rf /var/www/html/wp-content/plugins/*"`,
            {
              stdio: "inherit",
            }
          );
          return null;
        } catch (err) {
          console.log(err);
        }
      })();
    },
  });

  /**
   * The initiliazation plugin required for the `cypress-plugin-snapshot`
   * package.
   */
  initPlugin(on, config);

  return config;
};

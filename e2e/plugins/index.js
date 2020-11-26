const { initPlugin } = require("cypress-plugin-snapshots/plugin");
const execa = require("execa");

const tasks = {
  installPlugin({ name, version }) {
    return (async () => {
      await execa.command(
        `docker-compose run --rm wpcli wp plugin install ${name}${
          version ? ` --version=${version}` : ""
        }`,
        { stdio: "inherit" }
      );
      return null;
    })();
  },

  loadDatabase({ path }) {
    return (async () => {
      await execa.command(
        `docker-compose exec -T db mysql -uroot -ppassword wordpress < ${path}`,
        {
          stdio: "inherit",
          // Because we use file redirection (the "<") in the command.
          shell: true,
        }
      );
      return null;
    })();
  },

  /**
   * Loads the default database.
   *
   * @returns Null if successful. Throws an error otherwise.
   */
  resetDatabase() {
    return (async () => {
      await execa.command(
        "docker-compose exec -T db mysql -uroot -ppassword wordpress < ./wp-data/default-db.sql",
        {
          stdio: "inherit",
          // Because we use file redirection (the "<") in the command.
          shell: true,
        }
      );
      return null;
    })();
  },

  /**
   * Removes all the WordPress plugins.
   *
   * Official WP CLI Docs: https://developer.wordpress.org/cli/commands/plugin/delete/.
   *
   * @returns Null if successful. Throws an error otherwise.
   */
  removeAllPlugins() {
    return (async () => {
      await execa.command(
        `docker-compose run --rm wpcli wp plugin delete --all`,
        {
          stdio: "inherit",
        }
      );
      return null;
    })();
  },

  updateOption({ name, value }) {
    return (async () => {
      await execa(
        "docker-compose",
        ["run", "--rm", "wpcli", "wp", "option", "update", name, value],
        {
          stdio: "inherit",
        }
      );
      return null;
    })();
  },
};

/**
 * The plugins export.
 *
 * @param on - The callback from Cypress.
 * @param config - The config object from Cypress.
 *
 * @returns The modified config.
 */
module.exports = (on, config) => {
  on("task", tasks);

  /**
   * The initiliazation plugin required for the `cypress-plugin-snapshot`
   * package.
   */
  initPlugin(on, config);

  return config;
};

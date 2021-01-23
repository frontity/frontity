/* eslint-disable import/no-unresolved */
import { initPlugin } from "cypress-plugin-snapshots/plugin";
import execa from "execa";

/**
 * The options of the {@link tasks.installPlugin} task.
 */
interface InstallPluginOptions {
  /**
   * The slug of the plugin in the WordPress repository. For example, for Yoast
   * it is "wordpress-seo" because the URL is
   * https://wordpress.org/plugins/wordpress-seo/.
   *
   * @example "wordpress-seo"
   */
  name: string;

  /**
   * The version of the plugin that you want to install, for example "1.13.2".
   * Defaults to "latest".
   */
  version?: string;
}

/**
 * The options for the {@link tasks.updateOption} task.
 */
interface UpdateOptionOptions {
  /**
   * The name of the option.
   */
  name: string;

  /**
   * The value to set for the option.
   */
  value: any;
}

/**
 * The options of the {@link tasks.loadDatabase} task.
 */
interface LoadDatabaseOptions {
  /**
   * The path where the database SQL file is located. Relative to
   * the `e2e` folder.
   *
   * @example "./wp-data/wp-basic-tests/dump.sql"
   */
  path: string;
}

/**
 * The options of the {@link tasks.runCommand} task.
 */
interface RunCommandOptions {
  /**
   * The command that should be run in the shell.
   *
   * @example "npx forever start app.js"
   */
  command: string;
}

const tasks = {
  /**
   * Installs a plugin in the WordPress instance.
   *
   * @param options - Defined in {@link InstallPluginOptions}.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
   */
  installPlugin({ name, version }: InstallPluginOptions) {
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

  /**
   * Loads the default database.
   *
   * @param options - Defined in {@link LoadDatabaseOptions}.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
   */
  loadDatabase({ path }: LoadDatabaseOptions) {
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
   * Resets the database to the default (empty) one.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
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
   * Official WP CLI Docs:
   * https://developer.wordpress.org/cli/commands/plugin/delete/.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
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

  /**
   * Start a server that proxies requests from WordPress, but with a different
   * URL.
   *
   * @param options - Defined in {@link RunCommandOptions}.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
   */
  runCommand({ command }: RunCommandOptions) {
    return (async () => {
      await execa.command(command, { stdio: "inherit" });
      return null;
    })();
  },

  /**
   * Update an option value using the WP CLI.
   * You use this task to update any option listed in:
   * https://developer.wordpress.org/cli/commands/option/list/.
   *
   * @param options - Defined in {@link UpdateOptionOptions}.
   *
   * @returns A promise that resolves to null if successful. Throws an error
   * otherwise.
   */
  updateOption({ name, value }: UpdateOptionOptions) {
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
 * The utility type which facilitates extracting the types for the
 * individual cypress tasks.
 */
export type taskTypes = <T extends keyof typeof tasks>(
  event: T,
  arg?: Parameters<typeof tasks[T]>[0],
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>
) => Cypress.Chainable<any>;

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

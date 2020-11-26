/**
 * The utility type which facilitates extracting the types for the
 * individual cypress tasks.
 */
export type taskTypes = <
  T extends
    | "installPlugin"
    | "loadDatabase"
    | "resetDatabase"
    | "removeAllPlugins"
    | "updateOption"
>(
  event: T,
  arg?: Parameters<
    {
      installPlugin({ name, version }: InstallPlugin): Promise<any>;
      loadDatabase({ path }: LoadDatabase): Promise<any>;

      /**
       * Loads the default database.
       *
       * @returns `null` if successful. Throws an error otherwise.
       */
      resetDatabase(): Promise<any>;

      /**
       * Removes all the WordPress plugins.
       *
       * Official WP CLI Docs: https://developer.wordpress.org/cli/commands/plugin/delete/.
       *
       * @returns Null if successful. Throws an error otherwise.
       */
      removeAllPlugins(): Promise<any>;
      updateOption({ name, value }: UpdateOption): Promise<any>;
    }[T]
  >[0],
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>
) => any;

/**
 * Installs a WordPress plugin.
 * Oficial WP CLI docs: https://developer.wordpress.org/cli/commands/plugin/install/.
 *
 * @returns Null if successful. Throws an error otherwise.
 */
interface InstallPlugin {
  /**
   * The name of the plugin.
   */
  name: string;

  /**
   * The version of the plugin.
   */
  version?: string;
}

/**
 * Loads a new database from an SQL dump file.
 *
 * @returns Null if successful. Throws an error otherwise.
 */
interface LoadDatabase {
  /**
   * The path where the database SQL file is located. Relative to
   * the `e2e` folder.
   */
  path: string;
}

/**
 * Update an option value using the WP CLI.
 * You use this task to update any option listed in:
 * https://developer.wordpress.org/cli/commands/option/list/.
 *
 * @returns Null if successful. Throws an error otherwise.
 */
interface UpdateOption {
  /**
   * The name of the option.
   */
  name: string;

  /**
   * The value to set for the option.
   */
  value: any;
}

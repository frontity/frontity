/**
 * Options passed to the `create` function.
 */
export type CreateCommandOptions = {
  /**
   * The name of the Frontity project.
   */
  name?: string;

  /**
   * Path where the app should be created.
   */
  path?: string;

  /**
   * Support for TypeScript.
   */
  typescript?: boolean;

  /**
   * Frontity packages that need to be installed.
   */
  packages?: string[];

  /**
   * Frontity starter theme to clone.
   */
  theme?: string;
};

/**
 * Settings generated in `createPackageJson` function to populate the initial
 * `package.json` file.
 */
export type PackageJson = {
  /**
   * Package name.
   */
  name: string;

  /**
   * Package version.
   */
  version: string;

  /**
   * Prevent package from being published in npm.
   */
  private: boolean;

  /**
   * Package description.
   */
  description: string;

  /**
   * Package keywords.
   */
  keywords: string[];

  /**
   * Minimum versions.
   */
  engines: {
    /**
     * Minimum version of node.
     */
    node: string;

    /**
     * Minimum version of npm.
     */
    npm: string;
  };

  /**
   * NPM scripts to work with Frontity.
   */
  scripts: {
    /**
     * The dev script, usually `frontity dev`.
     */
    dev: string;

    /**
     * The build script, usually `frontity build`.
     */
    build: string;

    /**
     * The serve script, usually `frontity serve`.
     */
    serve: string;
  };

  /**
   * The prettier configuration acording to the Frontity coding standards.
   */
  prettier: object;

  /**
   * The dependencies of the Frontity project.
   */
  dependencies: {
    [key: string]: string;
  };
};

import chalk from "chalk";
import { errorLogger } from "../utils";

/**
 * Options for the {@link buildCommand} function.
 */
interface BuildOptions {
  /**
   * Builds the project for production.
   *
   * @defaultValue `false`
   */
  development?: boolean;

  /**
   * Create bundles with "es5", "module" or both.
   *
   * @defaultValue `"both"`
   */
  target?: "es5" | "module" | "both";

  /**
   * Set the public path for static assets.
   *
   * @defaultValue `"/static/"`
   */
  publicPath?: string;

  /**
   * Create HTML files for bundle analyzing.
   *
   * @defaultValue `false`
   */
  analyze?: boolean;
}

/**
 * Build the project for production.
 *
 * This function is executed by the CLI when running the `npx frontity build`
 * command.
 *
 * @param options - Object of type {@link BuildOptions}.
 */
const buildCommand = async ({
  development = false,
  target = "both",
  publicPath = "/static/",
  analyze = false,
}: BuildOptions) => {
  // Try getting the `build` function from `@frontity/core`.
  let build: (...options: any[]) => Promise<void>;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    build = require("@frontity/core").build;
  } catch (error) {
    const message =
      `Make sure that you are running ${chalk.green(
        "frontity"
      )} inside a Frontity project.\n` +
      `If so try installing ${chalk.green(
        "@frontity/core"
      )} again with ${chalk.green("npm i @frontity/core")}.\n`;
    errorLogger(error, message);
  }

  // Generate options for the core's `build` function.
  const options = {
    mode: development ? "development" : "production",
    target,
    publicPath,
    analyze,
  };

  try {
    await build(options);
  } catch (error) {
    errorLogger(error);
  }
};

export default buildCommand;

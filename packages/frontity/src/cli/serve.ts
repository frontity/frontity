import serveCommand from "../commands/serve";
import { errorLogger } from "../utils";

/**
 * The options for the {@link serve} command.
 */
interface ServeOptions {
  /**
   * The port that should be used to open the server.
   *
   * It can be also configured using the `FRONTITY_SERVE_PORT` env variable.
   *
   * @example
   * ```sh
   * # This will start Frontity in http://localhost:3003.
   * npx frontity serve --port 3003
   * ```
   *
   * @defaultValue "3000"
   */
  port?: string;

  /**
   * Indicates if the server should be started in HTTPS mode.
   *
   * The certificates used are stored internally in the Frontity core and are
   * not meant to be used in production, only in local development.
   *
   * It can be also configured using the `FRONTITY_SERVE_HTTPS` env variable.
   *
   * @example
   * ```sh
   * # This will start Frontity in https://localhost:3000.
   * npx frontity serve --https
   * ```
   *
   * @defaultValue false
   */
  https?: boolean;
}

/**
 * The serve CLI command, usually run with `npx frontity serve`.
 *
 * It takes args from the CLI and checks for the presence of environment
 * variables. Then, it runs the serve command programatically.
 *
 * @param options - Defined in {@link ServeOptions}.
 */
const serve = async ({
  port = process.env.FRONTITY_SERVE_PORT || "3000",
  https = !!process.env.FRONTITY_SERVE_HTTPS,
}: ServeOptions) => {
  // Check `port` parameter.
  if (port && Number.isNaN(parseInt(port, 10))) {
    errorLogger(new Error(`The port number specified is not valid: ${port}.`));
  }

  // Execute `serve` command.
  serveCommand({ port: parseInt(port, 10), https });
};

export default serve;

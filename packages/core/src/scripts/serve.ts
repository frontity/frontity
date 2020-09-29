import "./utils/envs";
import { resolve } from "path";
import createServer from "./utils/create-server";

const appDir = resolve(process.cwd(), "build/server.js");

/**
 * Options for {@link serve}.
 */
interface ServeOptions {
  /**
   * The port number to use.
   */
  port: number;
  /**
   * Whether to start the server with `https` using a local self-signed
   * certificate.
   */
  isHttps: boolean;
}

/**
 * Create a node server and run the server.js bundle.
 *
 * @param options - Defined in {@link ServeOptions}.
 */
const serve = async ({ isHttps, port }: ServeOptions): Promise<void> => {
  const app = require(appDir).default;
  const server = await createServer({ app, isHttps });
  server.listen(port);
  console.log(
    `\n\nSERVER STARTED -- Listening @ ${
      isHttps ? "https" : "http"
    }://localhost:${port}\n`
  );
};

export default serve;

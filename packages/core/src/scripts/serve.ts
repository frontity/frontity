import "./utils/envs";
import { resolve } from "path";
// import Argv from "minimist";
import createServer from "./utils/create-server";

// const argv = Argv(process.argv.slice(2));
const appDir = resolve(process.cwd(), "build/server.js");

// Creates a node server and runs the server.js bundle.
export default async ({
  isHttps,
  port
}: {
  port: number;
  isHttps: boolean;
}): Promise<void> => {
  let app;
  try {
    app = require(appDir).default;
  } catch (error) {
    throw new Error(
      'Something went wrong. Did you forget to run "frontity build"?'
    );
  }
  const server = await createServer({ app, isHttps });
  server.listen(port);
  console.log(
    `\n\nSERVER STARTED -- Listening @ ${
      isHttps ? "https" : "http"
    }://localhost:${port}\n`
  );
};

// (process as NodeJS.EventEmitter).on("unhandledRejection", (error: Error) => {
//   console.error(error);
//   process.exit(1);
// });

// serve({
//   port: argv.port || 3000,
//   isHttps: !!argv.h || !!argv.https
// });

import "./utils/env-and-defaults";
import { resolve } from "path";
import Argv from "minimist";
import createServer from "./utils/create-server";

const argv = Argv(process.argv.slice(2));
const appDir = resolve(process.env.CWD, "build/server.js");

const serve = async ({
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
    console.log(
      'Something went wrong. Did you forget to run "frontity build"?\n'
    );
    process.exit(1);
  }
  const server = await createServer({ app, isHttps });
  server.listen(port);
  console.log(
    `\n\nSERVER STARTED -- Listening @ ${
      isHttps ? "https" : "http"
    }://localhost:${port}\n`
  );
};

(process as NodeJS.EventEmitter).on("unhandledRejection", (error: Error) => {
  console.error(error);
  process.exit(1);
});

serve({
  port: argv.port || 3000,
  isHttps: !!argv.h || !!argv.https
});

export default serve;

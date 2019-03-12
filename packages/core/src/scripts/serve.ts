import Argv from "minimist";
import { createServer } from "./utils";
import app from "../../build/server";

const argv = Argv(process.argv.slice(2));

const serve = async ({
  isHttps,
  port
}: {
  port: number;
  isHttps: boolean;
}): Promise<void> => {
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

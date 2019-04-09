import { MultiCompiler } from "webpack";
import express from "express";
import createServer from "./create-server";
import { Mode } from "../../types";

// Create an express app ready to be used with webpack-dev-middleware.
export default async ({
  mode,
  port,
  isHttps,
  es5
}: {
  mode: Mode;
  port: number;
  isHttps: boolean;
  es5: boolean;
}): Promise<{
  app: express.Express;
  done: (compiler: MultiCompiler) => void;
}> => {
  // Create the app.
  const app = express();
  // Use the http or https modules to create the server.
  const server = await createServer({ app, isHttps });
  // Start listening once webpack has finished.
  let clientFinished = false;
  let serverFinished = false;
  const start = () => {
    if (clientFinished && serverFinished) {
      server.listen(port, () => {
        console.log(
          `\n\nSERVER STARTED -- Listening @ ${
            isHttps ? "https" : "http"
          }://localhost:${port}\n  - mode: ${mode}\n  - client: ${
            es5 ? "es5" : "esModules"
          }`
        );
      });
    }
  };
  // Check if webpack has finished (both the client and server bundles).
  const done = (compiler: MultiCompiler) => {
    compiler.compilers[0].hooks.done.tapAsync(
      "frontity-dev-server",
      (_, cb) => {
        clientFinished = true;
        start();
        cb();
      }
    );
    compiler.compilers[1].hooks.done.tapAsync(
      "frontity-dev-server",
      (_, cb) => {
        serverFinished = true;
        start();
        cb();
      }
    );
  };
  return { app, done };
};

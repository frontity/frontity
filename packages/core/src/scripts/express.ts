import { readFile } from "fs-extra";
import express from "express";
import { Mode } from "../types";
import * as http from "http";
import * as https from "https";
import webpack = require("webpack");

// Create HTTP or HTTPS server using a self-signed certificate.
const createServer = async ({
  app,
  isHttps = true
}: {
  app: express.Express;
  isHttps: boolean;
}): Promise<http.Server | https.Server> => {
  if (isHttps) {
    const key = await readFile("../certs/localhost.key");
    const cert = await readFile("../certs/localhost.cert");
    const options: https.ServerOptions = { key, cert };
    return https.createServer(options, app);
  }
  return http.createServer(app);
};

// Serve static files and set the headers for them.
export const staticFiles = ({
  buildDir
}: {
  buildDir: string;
}): express.Router => {
  const router: express.Router = express.Router();
  router.get("/static", express.static(`${buildDir}/static/`));
  return router;
};

export const createApp = async ({
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
  done: (compiler: webpack.MultiCompiler) => void;
}> => {
  // Create the server.
  const app = express();
  // Create a function to start listening after webpack has finished.
  const server = await createServer({ app, isHttps });
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
  const done = (compiler: webpack.MultiCompiler) => {
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

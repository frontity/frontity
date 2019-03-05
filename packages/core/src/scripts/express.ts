import { readFile } from "fs-extra";
import express from "express";
import { Mode } from "../types";
import * as http from "http";
import * as https from "https";

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
  port = 3000,
  isHttps = false
}: {
  mode: Mode;
  port: number;
  isHttps: boolean;
}): Promise<{
  app: express.Express;
  done: () => false | http.Server | https.Server;
}> => {
  // Create the server.
  const app = express();
  // Create a function to start listening after webpack has finished.
  let isBuilt = false;
  const server = await createServer({ app, isHttps });
  const done = () =>
    !isBuilt &&
    server.listen(port, () => {
      isBuilt = true;
      console.log(
        `\nSERVER STARTED (${mode}) -- Listening @ ${
          isHttps ? "https" : "http"
        }://localhost:${port}`
      );
    });
  return { app, done };
};

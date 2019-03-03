import { readFile } from "fs-extra";
import * as express from "express";
import { Headers, Robots, Mode } from "../types";
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
  return http.createServer({}, app);
};

// Add headers from frontity.config.js.
export const headers = ({ headers }: { headers: Headers }) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.header(key, value);
  });
  next();
};

// Return robots from frontity.config.js.
export const robots = ({ robots }: { robots: Robots }): express.Router => {
  const router: express.Router = express.Router();
  router.get("/robots.txt", function(req, res) {
    res.type("text/plain");
    res.send(robots);
  });
  return router;
};

// Serve static files and set the headers for them.
export const staticFiles = ({
  buildDir,
  staticHeaders = {}
}: {
  buildDir: string;
  staticHeaders: Headers;
}): express.Router => {
  const router: express.Router = express.Router();
  router.get(
    "/static",
    express.static(`${buildDir}/static/`, {
      setHeaders: res => {
        Object.entries(staticHeaders).forEach(([key, value]) => {
          res.header(key, value);
        });
      }
    })
  );
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
  done: () => http.Server | https.Server;
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

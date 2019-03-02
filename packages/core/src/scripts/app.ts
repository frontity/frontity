import { readFile } from 'fs-extra';
import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Headers, Robots } from '../config/types';
import * as http from 'http';
import * as https from 'https';

// Create HTTP or HTTPS server using a self-signed certificate.
const createServer = async ({
  app,
  isHttps = true,
}: {
  app: Express;
  isHttps: boolean;
}): Promise<http.Server | https.Server> => {
  if (isHttps) {
    const key = await readFile('../certs/localhost.key');
    const cert = await readFile('../certs/localhost.cert');
    const options: https.ServerOptions = { key, cert };
    return https.createServer(options, app);
  }
  return http.createServer({}, app);
};

// Add headers from frontity.config.js.
export const headers = ({ headers }: { headers: Headers }) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.header(key, value);
  });
  next();
};

// Return robots from frontity.config.js.
export const robots = ({ robots }: { robots: Robots }): Router => {
  const router: Router = Router();
  router.get('/robots.txt', function(req, res) {
    res.type('text/plain');
    res.send(robots);
  });
  return router;
};

// Serve static files and set the headers for them.
export const staticFiles = ({
  buildDir,
  staticHeaders = {},
}: {
  buildDir: string;
  staticHeaders: Headers;
}): Router => {
  const router: Router = Router();
  router.get(
    '/static',
    express.static(`${buildDir}/static/`, {
      setHeaders: res => {
        Object.entries(staticHeaders).forEach(([key, value]) => {
          res.header(key, value);
        });
      },
    })
  );
  return router;
};

export const createApp = async () => {
  // Create the server.
  const app = express();
  // Create a function to start listening after webpack has finished.
  let isBuilt = false;
  const server = await createServer(app);
  const done = () =>
    !isBuilt &&
    server.listen(process.env.PORT, () => {
      isBuilt = true;
      console.log(
        `\nSERVER STARTED (${process.env.MODE}) -- Listening @ ${
          process.env.HTTPS_SERVER ? 'https' : 'http'
        }://localhost:${process.env.PORT}`
      );
    });
  return { app, done };
};

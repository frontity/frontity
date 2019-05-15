import { readFile } from "fs-extra";
import express from "express";
import * as http from "http";
import * as https from "https";

// Create HTTP or HTTPS server using a self-signed certificate.
export default async ({
  app,
  isHttps = true
}: {
  app: express.Express;
  isHttps: boolean;
}): Promise<http.Server | https.Server> => {
  if (isHttps) {
    const key = await readFile("src/certs/localhost.key");
    const cert = await readFile("src/certs/localhost.cert");
    const options: https.ServerOptions = { key, cert };
    return https.createServer(options, app);
  }
  return http.createServer(app);
};

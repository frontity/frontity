import * as Argv from "minimist";
import { ensureDir, emptyDir } from "fs-extra";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware = require("webpack-hot-server-middleware");
import getConfig from "../config";
import { Mode } from "../types";
import { createApp } from "./express";

const buildDir = "build";
const argv = Argv(process.argv.slice(2));

// Disable Webpack deprecation warning:
// (node:33456) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
// @ts-ignore
// process.noDeprecation = true;

const dev = async ({
  isHttps,
  mode,
  port,
  es5
}: {
  port: number;
  isHttps: boolean;
  mode: Mode;
  es5: boolean;
}): Promise<void> => {
  // Create the build directory if it doesn't exist.
  await ensureDir(buildDir);

  // Remove all the files inside the build directory.
  await emptyDir(buildDir);

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp({ mode, port, isHttps });

  // Get FrontityConfig for webpack.
  const frontityConfig = getConfig({ mode });

  // Start a custom webpack-dev-server.
  const compiler = webpack([
    es5 ? frontityConfig.webpack.es5 : frontityConfig.webpack.module,
    frontityConfig.webpack.node
  ]);
  const clientCompiler = compiler.compilers[0];
  const options = {
    stats: { colors: true, progress: true },
    writeToDisk: true
  };
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  compiler.plugin("done", done);
};

process.on("unhandledRejection", (error: Error) => {
  console.error(error);
  process.exit(1);
});

dev({
  mode: !!argv.p || argv.production ? "production" : "development",
  port: argv.port || 3000,
  isHttps: !!argv.h || !!argv.https,
  es5: !!argv.es5
});

export default dev;

import Argv from "minimist";
import { ensureDir, emptyDir } from "fs-extra";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import getConfig from "../config";
import { Mode } from "../types";
import { createApp } from "./express";

const buildDir = "build";
const argv = Argv(process.argv.slice(2));

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
  const { app, done } = await createApp({ mode, port, isHttps, es5 });

  // Get FrontityConfig for webpack.
  const frontityConfig = getConfig({ mode });

  // Build and wait until webpack finished the client first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the client webpack.
  const clientWebpack = es5
    ? frontityConfig.webpack.es5
    : frontityConfig.webpack.module;
  const clientCompiler = webpack(clientWebpack);
  await new Promise(resolve => clientCompiler.run(resolve));

  // Start a custom webpack-dev-server.
  const compiler = webpack([clientWebpack, frontityConfig.webpack.node]);
  app.use(
    webpackDevMiddleware(compiler, { publicPath: "/static", writeToDisk: true })
  );
  app.use(webpackHotMiddleware(compiler.compilers[0]));
  app.use(webpackHotServerMiddleware(compiler));

  // Start listening once webpack finishes.
  done(compiler);
};

(process as NodeJS.EventEmitter).on("unhandledRejection", (error: Error) => {
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

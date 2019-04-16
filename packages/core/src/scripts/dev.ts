import "./utils/env-and-defaults";
import Argv from "minimist";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { getAllSites } from "@frontity/file-settings";
import createApp from "./utils/create-app";
import HotServer from "./utils/hot-server";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import getFrontity from "../config/frontity";
import { Mode } from "../types";
import cleanBuildFolders from "./utils/clean-build-folders";
import { webpackAsync } from "./utils/webpack";

const argv = Argv(process.argv.slice(2));

// Start Frontity development environment.
const dev = async ({
  isHttps,
  mode,
  port,
  target
}: {
  port: number;
  isHttps: boolean;
  mode: Mode;
  target: "es5" | "module";
}): Promise<void> => {
  // Get config from frontity.config.js files.
  const frontityConfig = getFrontity();
  const { outDir } = frontityConfig;

  // Create the directories if they don't exist, clean them if they do.
  await cleanBuildFolders({ outDir });

  // Get all sites configured in frontity.settings.js with their packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server, one for each client site.
  const entryPoints = await generateEntryPoints({
    sites,
    outDir
  });

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp({ mode, port, isHttps, target });

  // Get config for webpack, babel and frontity.
  const config = getConfig({ mode, entryPoints });

  // Build and wait until webpack finished the client first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the client Webpack.
  const clientWebpack =
    target === "es5" ? config.webpack.es5 : config.webpack.module;
  await webpackAsync(clientWebpack);

  // Start a custom webpack-dev-server.
  const compiler = webpack([clientWebpack, config.webpack.server]);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientWebpack.output.publicPath,
      writeToDisk: true,
      stats: {
        all: false,
        hash: false,
        assets: true,
        colors: true,
        errors: true,
        warnings: true,
        errorDetails: true,
        excludeAssets: /chunks\..*?\.json/
      }
    })
  );
  app.use(webpackHotMiddleware(compiler.compilers[0]));
  app.use(HotServer(compiler));

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
  isHttps: !!argv.s || !!argv.https,
  target: argv.target || "module"
});

export default dev;

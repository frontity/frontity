import defaults from "./utils/env-and-defaults";
import Argv from "minimist";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { getAllSites } from "@frontity/file-settings";
import createApp from "./utils/create-app";
import HotServer from "./utils/hot-server";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import { Mode } from "../types";
import cleanBuildFolders from "./utils/clean-build-folders";

const argv = Argv(process.argv.slice(2), {
  boolean: ["p", "h", "es5", "https"],
  string: ["outDir", "mode", "port"]
});

// Start Frontity development environment.
const dev = async ({
  isHttps,
  mode,
  port,
  es5,
  outDir
}: {
  port: number;
  isHttps: boolean;
  mode: Mode;
  es5: boolean;
  outDir: string;
}): Promise<void> => {
  // Create the directories if they don't exist.
  await cleanBuildFolders({ outDir });

  // Get all packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server.
  const entryPoints = await generateEntryPoints({ sites, outDir });

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp({ mode, port, isHttps, es5 });

  // Get FrontityConfig for webpack.
  const frontityConfig = getConfig({ mode, outDir, entryPoints });

  // Build and wait until webpack finished the client first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the client webpack.
  const clientWebpack = es5
    ? frontityConfig.webpack.es5
    : frontityConfig.webpack.module;
  const clientCompiler = webpack(clientWebpack);
  await new Promise(resolve => clientCompiler.run(resolve));

  // Start a custom webpack-dev-server.
  const compiler = webpack([clientWebpack, frontityConfig.webpack.server]);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: "/static",
      writeToDisk: true,
      stats: {
        all: false,
        hash: false,
        assets: true,
        colors: true,
        errors: true,
        warnings: true,
        errorDetails: true,
        excludeAssets: "client-chunks.json"
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
  isHttps: !!argv.h || !!argv.https,
  es5: !!argv.es5,
  outDir: argv.outDir || defaults.outDir
});

export default dev;

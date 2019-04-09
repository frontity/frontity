import defaults from "./utils/env-and-defaults";
import Argv from "minimist";
import { join } from "path";
import { remove } from "fs-extra";
import webpack from "webpack";
import { getAllSites } from "@frontity/file-settings";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import { Mode } from "../types";
import cleanBuildFolders from "./utils/clean-build-folders";

const argv = Argv(process.argv.slice(2));

const webpackAsync = (config: webpack.Configuration): Promise<void> =>
  new Promise((resolve, reject) => {
    webpack(config).run(err => {
      if (err) reject(err);
      else resolve();
    });
  });

const build = async ({
  mode,
  outDir,
  es5
}: {
  mode: Mode;
  outDir: string;
  es5: boolean;
}): Promise<void> => {
  console.log(`mode: ${mode}\n`);

  // Create the directories if they don't exist.
  await cleanBuildFolders({ outDir });

  // Get all packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server.
  const entryPoints = await generateEntryPoints({ sites, outDir });

  // Get FrontityConfig for webpack.
  const frontityConfig = getConfig({ mode, outDir, entryPoints });

  // Build and wait until webpack finished the clients first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the clients.
  console.log("Building es5 bundle");
  await webpackAsync(frontityConfig.webpack.es5);
  // In es5 mode we don't build module to make sure the scripts
  // used in the html are es5 scripts.
  if (!es5) {
    console.log("Building module bundle");
    await webpackAsync(frontityConfig.webpack.module);
  }
  console.log("Building server bundle");
  await webpackAsync(frontityConfig.webpack.server);
  console.log();

  // Remove the bundling folder after the build in production because
  // it is not needed anymore.
  if (mode === "production") await remove(join(outDir, "bundling"));
};

(process as NodeJS.EventEmitter).on("unhandledRejection", (error: Error) => {
  console.error(error);
  process.exit(1);
});

build({
  mode: !!argv.p || argv.production ? "production" : "development",
  outDir: argv.outDir || defaults.outDir,
  es5: !!argv.es5
});

export default build;

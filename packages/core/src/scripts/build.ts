import defaults from "./utils/env-and-defaults";
import Argv from "minimist";
import { join } from "path";
import { remove } from "fs-extra";
import { getAllSites } from "@frontity/file-settings";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import { Mode } from "../types";
import cleanBuildFolders from "./utils/clean-build-folders";
import { webpackAsync } from "./utils/webpack";

const argv = Argv(process.argv.slice(2));

const build = async ({
  mode,
  outDir,
  target
}: {
  mode: Mode;
  outDir: string;
  target: "both" | "es5" | "module";
}): Promise<void> => {
  console.log(`mode: ${mode}\n`);

  // Create the directories if they don't exist. Clean them if they do.
  await cleanBuildFolders({ outDir });

  // Get all sites configured in frontity.settings.js with their packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server, one for each client site.
  const entryPoints = await generateEntryPoints({ sites, outDir });

  // Get FrontityConfig for Webpack.
  const frontityConfig = getConfig({ mode, outDir, entryPoints });

  // Build and wait until webpack finished the clients first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the clients.
  //
  // If target is both or es5, build the es5 bundle.
  if (target !== "module") {
    console.log("Building es5 bundle");
    await webpackAsync(frontityConfig.webpack.es5);
  }
  // If target is both or module, build the module bundle.
  if (target !== "es5") {
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
  mode: !!argv.d || argv.development ? "development" : "production",
  outDir: argv.outDir || defaults.outDir,
  target: argv.target || "both"
});

export default build;

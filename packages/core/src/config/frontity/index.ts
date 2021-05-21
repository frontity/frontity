import { FrontityConfig } from "@frontity/types/config";

/**
 * Create the Frontity configuration.
 *
 * @returns The Frontity config object.
 */
const config = (): FrontityConfig => ({
  outDir: "build",
});

export default config;

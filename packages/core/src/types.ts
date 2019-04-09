import { TransformOptions } from "babel-core";
import { Configuration } from "webpack";

export type Mode = "development" | "production";
export type Target = "module" | "es5" | "server";

export interface BabelConfigs {
  module: TransformOptions;
  es5: TransformOptions;
  server: TransformOptions;
}

export interface WebpackConfigs {
  module: Configuration;
  es5: Configuration;
  server: Configuration;
}

export interface FrontityConfig {
  babel: BabelConfigs;
  webpack: WebpackConfigs;
}

export interface EntryPoints {
  name: string;
  path: string;
}

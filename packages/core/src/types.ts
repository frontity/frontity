import { TransformOptions } from "babel-core";
import { Configuration } from "webpack";

export type Mode = "development" | "production";
export type Target = "module" | "es5" | "node";

export interface BabelConfigs {
  module: TransformOptions;
  es5: TransformOptions;
  node: TransformOptions;
}

export interface WebpackConfigs {
  module: Configuration;
  es5: Configuration;
  node: Configuration;
}

export interface FrontityConfig {
  babel: BabelConfigs;
  webpack: WebpackConfigs;
}

import { TransformOptions } from "babel-core";
import { Configuration } from "webpack";

export type Mode = "development" | "production";
export type Target = "module" | "es5" | "node";

export interface Headers {
  [key: string]: string;
}

export type Robots = string;

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

export interface HeaderConfig {
  static: Headers;
  dynamic: Headers;
}

export interface FrontityConfig {
  headers: HeaderConfig;
  robots: Robots;
  babel: BabelConfigs;
  webpack: WebpackConfigs;
}

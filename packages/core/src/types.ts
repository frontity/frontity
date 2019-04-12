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
  outDir: string;
}

export interface Config {
  babel: BabelConfigs;
  webpack: WebpackConfigs;
  frontity: FrontityConfig;
}

export interface EntryPoints {
  name: string;
  path: string;
}

export type Template = ({
  html,
  scriptTags,
  linkTags
}: {
  html: string;
  scriptTags?: string;
  linkTags?: string;
}) => string;

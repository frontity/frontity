import { TransformOptions } from "@babel/core";
import { Configuration } from "webpack";

/**
 * The Frontity modes.
 */
export type Mode = "development" | "production";

/**
 * The bundle targets.
 */
export type Target = "module" | "es5" | "server";

/**
 * Interface for babel configs.
 */
export interface BabelConfigs {
  /**
   * The transform options for module entry.
   */
  module: TransformOptions;

  /**
   * The transform options for ecmascript5 entry.
   */
  es5: TransformOptions;

  /**
   * The transform options for server entry.
   */
  server: TransformOptions;
}

/**
 * The webpack configurations interface.
 */
export interface WebpackConfigs {
  /**
   * The module entry configuration.
   */
  module: Configuration;

  /**
   * The ecmascript5 entry configuration.
   */
  es5: Configuration;

  /**
   * The server entry configuration.
   */
  server: Configuration;
}

/**
 * Frontity configs.
 */
export interface FrontityConfig {
  /**
   * The output directory.
   */
  outDir: string;
}

/**
 * The configuration interface.
 */
export interface Config {
  /**
   * The babel configs.
   */
  babel: BabelConfigs;

  /**
   * The webpack configs.
   */
  webpack: WebpackConfigs;

  /**
   * The fonrtity specific configurations.
   */
  frontity: FrontityConfig;
}

/**
 * The entry points.
 */
export interface EntryPoints {
  /**
   * The name for the entry point.
   */
  name: string;

  /**
   * The path for the current entry point.
   */
  path: string;
}

/**
 * The helmet head tags.
 */
export type HeadTags = {
  /**
   * The body attributes.
   */
  bodyAttributes: string;

  /**
   * The html attributes.
   */
  htmlAttributes: string;

  /**
   * The list of head tags to be appended.
   */
  head: string[];
};

/**
 * The template function.
 */
export type Template = ({
  html,
  scripts,
  head,
  htmlAttributes,
  bodyAttributes,
}: {
  /**
   * The html string.
   */
  html: string;

  /**
   * A list of scripts to be appended.
   */
  scripts: [];

  /**
   * The list of head tags to be added.
   */
  head: [];

  /**
   * The html attributes to be added to the head.
   */
  htmlAttributes?: string;

  /**
   * The body attributes.
   */
  bodyAttributes?: string;
}) => string;

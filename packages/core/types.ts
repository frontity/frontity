import {
  BabelConfig,
  WebpackConfig,
  FrontityConfig,
} from "@frontity/types/config";

/**
 * Interface for babel configs.
 */
export interface BabelConfigs {
  /**
   * The Babel configuration for module entry.
   */
  module: BabelConfig;

  /**
   * The Babel configuration for ecmascript5 entry.
   */
  es5: BabelConfig;

  /**
   * The Babel configuration for server entry.
   */
  server: BabelConfig;
}

/**
 * The webpack configurations interface.
 */
export interface WebpackConfigs {
  /**
   * The module Webpack configuration.
   */
  module: WebpackConfig;

  /**
   * The ecmascript5 Webpack configuration.
   */
  es5: WebpackConfig;

  /**
   * The server Webpack configuration.
   */
  server: WebpackConfig;
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

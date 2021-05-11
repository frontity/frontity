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
 * The Webpack configuration.
 */
export type WebpackConfig = Configuration;

/**
 * The Babel configuration.
 */
export type BabelConfig = TransformOptions;

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
 * Customize the Babel configuration.
 */
export interface BabelCustomizer {
  (options: {
    /**
     * The object containing the Babel configuration.
     */
    config: BabelConfig;

    /**
     * The running mode.
     */
    mode: Mode;

    /**
     * The current target of the config.
     */
    target: Target;
  }): void;
}

/**
 * Customize the Webpack configuration.
 */
export interface WebpackCustomizer {
  (options: {
    /**
     * The object containing the Webpack configuration.
     */
    config: WebpackConfig;

    /**
     * The running mode.
     */
    mode: Mode;

    /**
     * The current target of the config.
     */
    target: Target;
  }): void;
}

/**
 * Customize the Frontity configuration.
 */
export interface FrontityCustomizer {
  (options: {
    /**
     * The object containing the Frontity configuration.
     */
    config: FrontityConfig;

    /**
     * The running mode.
     */
    mode: Mode;
  }): void;
}

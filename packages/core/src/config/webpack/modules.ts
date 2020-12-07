import hash from "hash-it";
import { Configuration } from "webpack";
import babelCore from "@babel/core/package.json";
import babelLoader from "babel-loader/package.json";
import { Target, BabelConfigs, Mode } from "../../../types";

/**
 * The options of the {@link module} function.
 */
interface ModuleOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;

  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The configurations of Babel, generated in a previous step.
   */
  babel: BabelConfigs;
}

/**
 * Generate the object for Webpack's entry configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/entry-context/.
 *
 * @param options - Defined in {@link EntryOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const module = ({
  target,
  babel,
  mode,
}: ModuleOptions): Configuration["module"] => ({
  rules: [
    {
      // Support for js, jsx, ts and tsx files.
      test: /\.(j|t)sx?$/,
      // Do not try to transpile the files of webpack, core-js or the
      // regenerator-runtime because they break if we do so.
      exclude: [/\bcore-js\b/, /\bwebpack\b/, /\bregenerator-runtime\b/],
      use: {
        loader: "babel-loader",
        options: {
          // Don't use the babelrc file of the root.
          babelrc: false,
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // A unique hash using @babel/core's version, the babel-loader's version,
          // and the contents of babel.
          cacheIdentifier: `${hash({
            babelCoreVersion: babelCore.version,
            babelLoaderVersion: babelLoader.version,
            babel: babel,
          })}`,
          // Instead, use the babel options directly from our babel object.
          ...babel[target],
        },
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: (file: string): string => {
              const filename = /([^/\\]+)\.(?:png|jpe?g|gif|svg)$/.exec(
                file
              ) || ["", "image"];
              return mode === "development"
                ? `${filename[1]}.[ext]`
                : `${filename[1]}-[hash].[ext]`;
            },
            outputPath: "images",
            emitFile: target !== "server",
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: "raw-loader",
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          name: (file: string): string => {
            const filename = /([^/\\]+)\.(?:woff(2)?|ttf|eot)$/.exec(file) || [
              "",
              "font",
            ];
            return mode === "development"
              ? `${filename[1]}.[ext]`
              : `${filename[1]}-[hash].[ext]`;
          },
          outputPath: "fonts",
          limit: 8192,
          emitFile: target !== "server",
        },
      },
    },
  ],
});

export default module;

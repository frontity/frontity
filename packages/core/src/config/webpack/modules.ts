import hash from "hash-it";
import { Configuration } from "webpack";
import babelCore from "@babel/core/package.json";
import babelLoader from "babel-loader/package.json";
import { Target, BabelConfigs, Mode } from "../../../types";

export default ({
  target,
  babel,
  mode,
}: {
  target: Target;
  babel: BabelConfigs;
  mode: Mode;
}): Configuration["module"] => ({
  rules: [
    {
      // Support for js, jsx, ts and tsx files.
      test: /\.(j|t)sx?$/,
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

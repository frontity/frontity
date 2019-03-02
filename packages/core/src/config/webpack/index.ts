import path from "path";
import webpack, { Configuration } from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import { Env, Mode, WebpackConfigs } from "../types";
import name from "./name";
import target from "./target";
import devtool from "./devtool";
import entry from "./entry";
import output from "./output";
import modules from "./modules";
import resolve from "./resolve";
import plugins from "./plugins";

export default (mode: Mode): WebpackConfigs => {
  const getConfig = (env: Env): Configuration => {
    const config: Configuration = {
      name: name({ env }),
      target: target({ env }),
      devtool: devtool({ env, mode }),
      entry: entry({ env, mode }),
      output: output({ env, mode }),
      module: modules({ env, mode }),
      resolve: resolve({ env, mode }),
      plugins: plugins({ env, mode })
    };
    return config;
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    node: getConfig("node")
  };
};

const config: webpack.Configuration = {
  name: "client",
  target: "web",
  devtool: "eval",
  entry: {
    main: [
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false`,
      path.resolve(__dirname, `../client/public-path.js`),
      path.resolve(__dirname, `../client`)
    ]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, `../../.build/${process.env.MODE}/client`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            ...babelrc.devClient
          }
        }
      }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};

if (process.env.ANALYZE) {
  const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
  const Visualizer = require("webpack-visualizer-plugin");
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../../analyize/pwa/client-dev-analyzer.html",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "../../analyize/pwa/client-dev-stats.json"
    })
  );
  config.plugins.push(
    new Visualizer({
      filename: "../../analyize/pwa/client-dev-visualizer.html"
    })
  );
}

module.exports = config;

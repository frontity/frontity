import { resolve as resolvePath } from "path";
import { WebpackConfig } from "@frontity/types/config";

const rootPath = process.cwd();

/**
 * Generate the object for Webpack's resolve configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/resolve/.
 *
 * @returns The configuration object for Webpack.
 */
const resolve = (): WebpackConfig["resolve"] => ({
  // Automatically resolve extensions for js, jsx, ts and tsx files.
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  // Alias the build folder to get access to it directly, without relying on were
  // the node_module folder is. Useful for things like import "build/client-stats.json".
  alias: {
    build: resolvePath(rootPath, "build"),
    // Force ramda to be the esModule version to support tree-shaking.
    "ramda/src": "ramda/es",
    // Avoid dynamic imports with Koa require.
    "any-promise": "promise-monofill",
  },
  fallback: {
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    console: require.resolve("console-browserify"),
    constants: require.resolve("constants-browserify"),
    crypto: require.resolve("crypto-browserify"),
    domain: require.resolve("domain-browser"),
    events: require.resolve("events"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    punycode: require.resolve("punycode"),
    process: require.resolve("process/browser"),
    querystring: require.resolve("querystring-es3"),
    stream: require.resolve("stream-browserify"),
    string_decoder: require.resolve("string_decoder"),
    sys: require.resolve("util"),
    timers: require.resolve("timers-browserify"),
    tty: require.resolve("tty-browserify"),
    url: require.resolve("url"),
    util: require.resolve("util"),
    vm: require.resolve("vm-browserify"),
    zlib: require.resolve("browserify-zlib"),
  },
});

export default resolve;

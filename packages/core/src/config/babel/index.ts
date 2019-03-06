import { TransformOptions } from "babel-core";
import { Target, Mode, BabelConfigs } from "../../types";

const targets = {
  // Browsers with <script type="module"></script> support.
  module: { esmodules: true },
  // Browsers with Proxy support, which is needed by Overmind.
  // For older browsers (ie8-11) we support AMP fallback.
  es5: {
    browsers: [
      "and_chr >= 67",
      "and_ff >= 18",
      "and_uc >= 11.8",
      "android >= 67",
      "not android <= 4.4.4",
      "chrome >= 49",
      "edge >= 12",
      "firefox >= 18",
      "ios_saf >= 10",
      "not op_mini all",
      "op_mob >= 46",
      "opera >= 36",
      "safari >= 10",
      "samsung >= 5"
    ]
  },
  // Node version used by AWS Lambda.
  node: { node: "8.10" }
};

export default ({ mode }: { mode: Mode }): BabelConfigs => {
  const getConfig = (target: Target): TransformOptions => {
    const presets = [
      // Instead of using a TS transpiler, this removes the typescript code.
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: targets[target]
          // esModules and CJS don't work well together so this is here
          // to be able to parse node_modules, where there are many modules
          // still using CJS. It will probably break tree shaking, so we need
          // to check that later. Another option would be the opposite:
          // https://www.npmjs.com/package/babel-plugin-transform-commonjs-es2015-modules
          // modules: target !== "node" ? "false" : "commonjs"
        }
      ],
      "@babel/preset-react"
    ];
    const plugins = [
      // Support for dynamic imports: import("./my-file")
      "@babel/plugin-syntax-dynamic-import",
      // Needed for loadable-component SSR.
      "@loadable/babel-plugin",
      // Support for the rest spread: { ...obj }
      "@babel/plugin-proposal-object-rest-spread",
      // Support for the class props: class MyClass { myProp = 'hi there' }
      "@babel/plugin-proposal-class-properties",
      // Transform lodash imports to cherry-pick: import add from 'lodash/add'
      "babel-plugin-lodash"
    ];
    return {
      presets,
      plugins
    };
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    node: getConfig("node")
  };
};

import { TransformOptions } from "@babel/core";
import { TargetsOptions } from "@babel/preset-env";
import { Target, BabelConfigs } from "../../../types";

const targets: Record<"module" | "es5" | "server", TargetsOptions> = {
  /**
   * Browsers with `<script type="module"></script>` support. This is the list.
   * - `android >= 61`
   * - `chrome >= 61`
   * - `edge >= 16`
   * - `firefox >= 60`
   * - `ios >= 10.3`
   * - `opera >= 48`
   * - `safari >= 10.1`
   * - `samsung >= 8.2`.
   *  */
  module: { esmodules: true },

  /**
   * Browsers with Proxy support, which is required by Frontity.
   * Frontity supports SSR/AMP fallback for these old browsers.
   */
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
      "samsung >= 5",
    ],
  },

  /**
   * Minimum Node version supported by Frontity.
   */
  server: { node: "10" },
};

/**
 * Generate the Babel configuration.
 *
 * @param target - The type of target: "module", "es5" or "server".
 *
 * @returns The Babel configuration object.
 */
const getConfig = (target: Target): TransformOptions => {
  const presets = [
    // Instead of using a TS transpiler, this removes the typescript code.
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: targets[target],
        useBuiltIns: "usage",
        corejs: "3",
        modules: false,
        bugfixes: true,
      },
    ],
    [
      "@babel/preset-react",
      {
        // This one turns on the jsx-runtime
        runtime: "automatic",
        // This option allows emotion to adopt the jsx-runtime and make
        // the css prop work
        importSource: "@emotion/react",
      },
    ],
  ];
  const plugins = [
    //
    // Babel plugin for Emotion CSS property and other goodness.
    [
      "@emotion/babel-plugin",
      {
        importMap: {
          frontity: {
            css: {
              canonicalImport: ["@emotion/react", "css"],
            },
            // TODO: Filled an issue on emotion side for this https://github.com/emotion-js/emotion/issues/2218
            // keyframes: {
            //   canonicalImport: ["@emotion/react", "keyframes"],
            // },
            Global: {
              canonicalImport: ["@emotion/react", "Global"],
            },
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
            },
          },
        },
      },
    ],
    // Support for babel macros. See: https://community.frontity.org/t/tailwindcss-with-babel-macro-plugin-and-css-in-js/1040
    "babel-plugin-macros",
    // Support for dynamic imports: import("./my-file")
    "@babel/plugin-syntax-dynamic-import",
    // Needed for loadable-component SSR.
    "@loadable/babel-plugin",
    // Support for the rest spread: { ...obj }
    "@babel/plugin-proposal-object-rest-spread",
    // Support for the class props: class MyClass { myProp = 'hi there' }
    "@babel/plugin-proposal-class-properties",
    // Cherry-pick Lodash modules
    "babel-plugin-lodash",
    // Transform inline environment variables (for process.env.CWD)
    [
      "babel-plugin-transform-inline-environment-variables",
      {
        include: ["CWD"],
      },
    ],
  ];
  return {
    compact: true,
    sourceType: "unambiguous",
    presets,
    plugins,
  };
};

/**
 * The configuration objects of Babel, one for each type.
 *
 * @returns An object containing the three Babel configurations.
 */
export default (): BabelConfigs => ({
  module: getConfig("module"),
  es5: getConfig("es5"),
  server: getConfig("server"),
});

/**
 * These are the polyfills that will be added for "module" if they are found in
 * the code:
 *
 * `es.symbol.description { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.symbol.async-iterator { "android":"61", "chrome":"61", "edge":"16", "ios":"10.3", "opera":"48", "safari":"10.1" }`
 * `es.symbol.match { "edge":"16" }`
 * `es.symbol.replace { "edge":"16" }`
 * `es.symbol.search { "edge":"16" }`
 * `es.symbol.split { "edge":"16" }`
 * `es.array.flat { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.array.flat-map { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.array.index-of { "ios":"10.3", "safari":"10.1" }`
 * `es.array.iterator { "android":"61", "chrome":"61", "opera":"48", "samsung":"8.2" }`
 * `es.array.last-index-of { "ios":"10.3", "safari":"10.1" }`
 * `es.array.reverse { "ios":"10.3", "safari":"10.1" }`
 * `es.array.slice { "ios":"10.3", "safari":"10.1" }`
 * `es.array.sort { "android":"61", "chrome":"61", "ios":"10.3", "opera":"48", "safari":"10.1" }`
 * `es.array.splice { "ios":"10.3", "safari":"10.1" }`
 * `es.array.unscopables.flat { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.array.unscopables.flat-map { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.array-buffer.constructor { "ios":"10.3", "safari":"10.1" }`
 * `es.array-buffer.slice { "ios":"10.3", "safari":"10.1" }`
 * `es.math.hypot { "android":"61", "chrome":"61", "opera":"48", "samsung":"8.2" }`
 * `es.number.parse-float { "ios":"10.3", "safari":"10.1" }`
 * `es.number.to-fixed { "edge":"16" }`
 * `es.object.assign { "edge":"16" }`
 * `es.object.define-getter { "android":"61", "chrome":"61", "opera":"48" }`
 * `es.object.define-setter { "android":"61", "chrome":"61", "opera":"48" }`
 * `es.object.from-entries { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.object.lookup-getter { "android":"61", "chrome":"61", "opera":"48" }`
 * `es.object.lookup-setter { "android":"61", "chrome":"61", "opera":"48" }`
 * `es.promise { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.promise.finally { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.reflect.set { "edge":"16" }`
 * `es.regexp.constructor { "edge":"16" }`
 * `es.regexp.flags { "edge":"16" }`
 * `es.regexp.to-string { "edge":"16" }`
 * `es.string.ends-with { "edge":"16" }`
 * `es.string.includes { "edge":"16" }`
 * `es.string.match { "edge":"16" }`
 * `es.string.pad-end { "ios":"10.3", "safari":"10.1" }`
 * `es.string.pad-start { "ios":"10.3", "safari":"10.1" }`
 * `es.string.replace { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.string.search { "edge":"16" }`
 * `es.string.split { "edge":"16" }`
 * `es.string.starts-with { "edge":"16" }`
 * `es.string.trim { "ios":"10.3", "safari":"10.1" }`
 * `es.string.trim-end { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.string.trim-start { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `es.typed-array.float32-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.float64-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.int8-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.int16-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.int32-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.uint8-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.uint8-clamped-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.uint16-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.uint32-array { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.from { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.of { "ios":"10.3", "safari":"10.1" }`
 * `es.typed-array.to-locale-string { "edge":"16" }`
 * `web.dom-collections.iterator { "android":"61", "chrome":"61", "edge":"16", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `web.immediate { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `web.queue-microtask { "android":"61", "chrome":"61", "edge":"16", "firefox":"60", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `web.url { "android":"61", "chrome":"61", "edge":"16", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `web.url.to-json { "android":"61", "chrome":"61", "edge":"16", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`
 * `web.url-search-params { "android":"61", "chrome":"61", "edge":"16", "ios":"10.3", "opera":"48", "safari":"10.1", "samsung":"8.2" }`.
 *
 */

/**
 * These are the polyfills that will be added for "es5" if they are found in
 * the code:
 *
 * `es.symbol { "edge":"12", "firefox":"18" }`
 * `es.symbol.description { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.symbol.async-iterator { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.symbol.has-instance { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.is-concat-spreadable { "edge":"12", "firefox":"18" }`
 * `es.symbol.iterator { "edge":"12", "firefox":"18" }`
 * `es.symbol.match { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.replace { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.search { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.species { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.split { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.symbol.to-primitive { "edge":"12", "firefox":"18" }`
 * `es.symbol.to-string-tag { "edge":"12", "firefox":"18" }`
 * `es.symbol.unscopables { "edge":"12", "firefox":"18" }`
 * `es.array.concat { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.array.copy-within { "firefox":"18" }`
 * `es.array.every { "edge":"12", "firefox":"18" }`
 * `es.array.fill { "firefox":"18" }`
 * `es.array.filter { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.array.find { "edge":"12", "firefox":"18" }`
 * `es.array.find-index { "edge":"12", "firefox":"18" }`
 * `es.array.flat { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.array.flat-map { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.array.for-each { "edge":"12", "firefox":"18" }`
 * `es.array.from { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.array.includes { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.array.index-of { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10" }`
 * `es.array.iterator { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.array.join { "edge":"12" }`
 * `es.array.last-index-of { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10" }`
 * `es.array.map { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.array.of { "edge":"12", "firefox":"18" }`
 * `es.array.reduce { "edge":"12", "firefox":"18" }`
 * `es.array.reduce-right { "edge":"12", "firefox":"18" }`
 * `es.array.reverse { "ios":"10", "safari":"10" }`
 * `es.array.slice { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10" }`
 * `es.array.some { "edge":"12", "firefox":"18" }`
 * `es.array.sort { "chrome":"49", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.array.species { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.array.splice { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10" }`
 * `es.array.unscopables.flat { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.array.unscopables.flat-map { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.array-buffer.constructor { "edge":"12", "firefox":"18", "ios":"10", "safari":"10" }`
 * `es.array-buffer.is-view { "firefox":"18" }`
 * `es.array-buffer.slice { "firefox":"18", "ios":"10", "safari":"10" }`
 * `es.date.to-primitive { "edge":"12", "firefox":"18" }`
 * `es.function.has-instance { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.json.to-string-tag { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.map { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.math.acosh { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.math.asinh { "edge":"12", "firefox":"18" }`
 * `es.math.atanh { "edge":"12", "firefox":"18" }`
 * `es.math.cbrt { "firefox":"18" }`
 * `es.math.clz32 { "firefox":"18" }`
 * `es.math.cosh { "edge":"12", "firefox":"18" }`
 * `es.math.expm1 { "edge":"12", "firefox":"18" }`
 * `es.math.fround { "firefox":"18" }`
 * `es.math.hypot { "android":"67", "chrome":"49", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.math.imul { "edge":"12", "firefox":"18" }`
 * `es.math.log10 { "firefox":"18" }`
 * `es.math.log1p { "firefox":"18" }`
 * `es.math.log2 { "firefox":"18" }`
 * `es.math.sign { "firefox":"18" }`
 * `es.math.sinh { "edge":"12", "firefox":"18" }`
 * `es.math.tanh { "firefox":"18" }`
 * `es.math.to-string-tag { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.math.trunc { "firefox":"18" }`
 * `es.number.constructor { "edge":"12", "firefox":"18" }`
 * `es.number.epsilon { "firefox":"18" }`
 * `es.number.is-safe-integer { "firefox":"18" }`
 * `es.number.max-safe-integer { "firefox":"18" }`
 * `es.number.min-safe-integer { "firefox":"18" }`
 * `es.number.parse-float { "edge":"12", "firefox":"18", "ios":"10", "safari":"10" }`
 * `es.number.parse-int { "edge":"12", "firefox":"18" }`
 * `es.number.to-fixed { "edge":"12" }`
 * `es.object.assign { "edge":"12", "firefox":"18" }`
 * `es.object.define-getter { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.object.define-setter { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.object.entries { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.object.freeze { "edge":"12", "firefox":"18" }`
 * `es.object.from-entries { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.object.get-own-property-descriptor { "edge":"12", "firefox":"18" }`
 * `es.object.get-own-property-descriptors { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.object.get-own-property-names { "edge":"12", "firefox":"18" }`
 * `es.object.get-prototype-of { "edge":"12", "firefox":"18" }`
 * `es.object.is { "firefox":"18" }`
 * `es.object.is-extensible { "edge":"12", "firefox":"18" }`
 * `es.object.is-frozen { "edge":"12", "firefox":"18" }`
 * `es.object.is-sealed { "edge":"12", "firefox":"18" }`
 * `es.object.keys { "edge":"12", "firefox":"18" }`
 * `es.object.lookup-getter { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.object.lookup-setter { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.object.prevent-extensions { "edge":"12", "firefox":"18" }`
 * `es.object.seal { "edge":"12", "firefox":"18" }`
 * `es.object.set-prototype-of { "firefox":"18" }`
 * `es.object.to-string { "edge":"12", "firefox":"18" }`
 * `es.object.values { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.parse-int { "firefox":"18" }`
 * `es.promise { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.promise.finally { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.reflect.apply { "edge":"12", "firefox":"18" }`
 * `es.reflect.construct { "edge":"12", "firefox":"18" }`
 * `es.reflect.define-property { "edge":"12", "firefox":"18" }`
 * `es.reflect.delete-property { "firefox":"18" }`
 * `es.reflect.get { "firefox":"18" }`
 * `es.reflect.get-own-property-descriptor { "firefox":"18" }`
 * `es.reflect.get-prototype-of { "firefox":"18" }`
 * `es.reflect.has { "firefox":"18" }`
 * `es.reflect.is-extensible { "firefox":"18" }`
 * `es.reflect.own-keys { "firefox":"18" }`
 * `es.reflect.prevent-extensions { "firefox":"18" }`
 * `es.reflect.set { "edge":"12", "firefox":"18" }`
 * `es.reflect.set-prototype-of { "firefox":"18" }`
 * `es.regexp.constructor { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.regexp.exec { "edge":"12", "firefox":"18" }`
 * `es.regexp.flags { "edge":"12", "firefox":"18" }`
 * `es.regexp.to-string { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.set { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.code-point-at { "edge":"12", "firefox":"18" }`
 * `es.string.ends-with { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.from-code-point { "edge":"12", "firefox":"18" }`
 * `es.string.includes { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.iterator { "edge":"12", "firefox":"18" }`
 * `es.string.match { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.pad-end { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.string.pad-start { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.string.raw { "edge":"12", "firefox":"18" }`
 * `es.string.repeat { "edge":"12", "firefox":"18" }`
 * `es.string.replace { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.string.search { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.split { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `es.string.starts-with { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.string.trim { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.string.trim-end { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.string.trim-start { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.float32-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.float64-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.int8-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.int16-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.int32-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.uint8-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.uint8-clamped-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.uint16-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.uint32-array { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.copy-within { "edge":"12", "firefox":"18" }`
 * `es.typed-array.every { "edge":"12", "firefox":"18" }`
 * `es.typed-array.fill { "edge":"12", "firefox":"18" }`
 * `es.typed-array.filter { "edge":"12", "firefox":"18" }`
 * `es.typed-array.find { "edge":"12", "firefox":"18" }`
 * `es.typed-array.find-index { "edge":"12", "firefox":"18" }`
 * `es.typed-array.for-each { "edge":"12", "firefox":"18" }`
 * `es.typed-array.from { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.includes { "edge":"12", "firefox":"18" }`
 * `es.typed-array.index-of { "edge":"12", "firefox":"18" }`
 * `es.typed-array.iterator { "edge":"12", "firefox":"18" }`
 * `es.typed-array.join { "edge":"12", "firefox":"18" }`
 * `es.typed-array.last-index-of { "edge":"12", "firefox":"18" }`
 * `es.typed-array.map { "edge":"12", "firefox":"18" }`
 * `es.typed-array.of { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `es.typed-array.reduce { "edge":"12", "firefox":"18" }`
 * `es.typed-array.reduce-right { "edge":"12", "firefox":"18" }`
 * `es.typed-array.reverse { "edge":"12", "firefox":"18" }`
 * `es.typed-array.set { "edge":"12" }`
 * `es.typed-array.slice { "edge":"12", "firefox":"18" }`
 * `es.typed-array.some { "edge":"12", "firefox":"18" }`
 * `es.typed-array.sort { "edge":"12", "firefox":"18" }`
 * `es.typed-array.subarray { "edge":"12" }`
 * `es.typed-array.to-locale-string { "edge":"12", "firefox":"18" }`
 * `es.typed-array.to-string { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.weak-map { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `es.weak-set { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36" }`
 * `web.dom-collections.for-each { "chrome":"49", "edge":"12", "firefox":"18", "opera":"36", "samsung":"5" }`
 * `web.dom-collections.iterator { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `web.immediate { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `web.queue-microtask { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `web.url { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `web.url.to-json { "android":"67", "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`
 * `web.url-search-params { "chrome":"49", "edge":"12", "firefox":"18", "ios":"10", "opera":"36", "safari":"10", "samsung":"5" }`.
 */

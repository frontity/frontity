/**
 * This regular expression is used for the ts-node ignores: ts-node will
 * transpile any packages from the `@frontity` org, with `frontity` in the name
 * (for example `some-frontity-package`), frontity.settings files,
 * frontity.config files, and any TypeScript files that people import.
 *
 * This ts-node transpilation is only used outside of Webpack, so mostly for
 * things that people import in their frontity.settings or frontity.config
 * files.  Once Webpack runs, all the files are transpiled.
 */
export default ["node_modules(\\/|\\\\)(?!.*(frontity|\\.ts$))"];

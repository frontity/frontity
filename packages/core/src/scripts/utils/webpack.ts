import chalk from "chalk";
import webpack from "webpack";

/**
 * Wrapper to run `webpack` asynchronously.
 *
 * @param config - Webpack's config object, defined in {@link
 * webpack.Configuration}.
 *
 * @returns A promise that resolves when Webpack finishes.
 */
export const webpackAsync = (
  config: webpack.Configuration
): Promise<webpack.Compiler> =>
  new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      // Fatal Webpack errors, like wrong configuration.
      if (err) return reject(err);

      const info = stats.toJson();
      // Compilation errors, like missing modules, syntax errors, etc.
      if (stats.hasErrors()) return reject(new Error(info.errors.join("\n\n")));

      // Compilation warnings, like dynamic modules, performance issues, etc.
      if (stats.hasWarnings())
        console.warn(`\n${chalk.yellow(info.warnings.join("\n\n"))}\n`);

      // Compilation was successful.
      return resolve(compiler);
    });
  });

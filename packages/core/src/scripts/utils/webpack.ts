import webpack from "webpack";

// This is the same as running webpack() but async.
export const webpackAsync = (
  config: webpack.Configuration
): Promise<webpack.Compiler> =>
  new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err) => {
      if (err) reject(err);
      else resolve(compiler);
    });
  });

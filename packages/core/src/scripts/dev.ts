import { ensureDir, emptyDir } from 'fs-extra';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';
import { createApp } from './app';

const buildDir = 'build';

const dev = async ({ isHttps }: { isHttps: boolean }): Promise<void> => {
  // Create the build directory if it doesn't exist.
  await ensureDir(buildDir);

  // Remove all the files inside the build directory.
  await emptyDir(buildDir);

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp();

  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { stats: { colors: true, progress: true } };
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  compiler.plugin('done', done);
};

process.on('unhandledRejection', (error: Error) => {
  console.error(error);
  process.exit(1);
});

export default dev;

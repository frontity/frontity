import path from "path";
import { RequestHandler } from "express";
import { MultiCompiler } from "webpack";
import requireFromString from "require-from-string";
import sourceMapSupport from "source-map-support";

const interopRequireDefault = obj => {
  return obj && obj.__esModule ? obj.default : obj;
};

const isMultiCompiler = compiler => {
  // Duck typing as `instanceof MultiCompiler` fails when npm decides to
  // install multiple instances of webpack.
  return compiler && compiler.compilers;
};

const findCompiler = (multiCompiler, name) => {
  return multiCompiler.compilers.filter(
    compiler => compiler.name.indexOf(name) === 0
  );
};

const findStats = (multiStats, name) => {
  return multiStats.stats.filter(
    stats => stats.compilation.name.indexOf(name) === 0
  );
};

const getFilename = (serverStats, outputPath, chunkName) => {
  const assetsByChunkName = serverStats.toJson().assetsByChunkName;
  const filename = assetsByChunkName[chunkName] || "";
  // If source maps are generated `assetsByChunkName.main`
  // will be an array of filenames.
  return path.join(
    outputPath,
    Array.isArray(filename)
      ? filename.find(asset => /\.js$/.test(asset))
      : filename
  );
};

const getServerRenderer = (filename, buffer) => {
  const errMessage = `The 'server' compiler must export a function in the form of \`(options) => (req, res, next) => void\``;

  const serverRenderer = interopRequireDefault(
    requireFromString(buffer.toString(), filename)
  );
  if (typeof serverRenderer !== "function") {
    throw new Error(errMessage);
  }

  return serverRenderer;
};

function installSourceMapSupport(fs) {
  sourceMapSupport.install({
    // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
    // lands we can be less aggressive and explicitly invalidate the source
    // map cache when Webpack recompiles.
    emptyCacheBetweenOperations: true,
    retrieveFile(source) {
      try {
        return fs.readFileSync(source, "utf8");
      } catch (ex) {
        // Doesn't exist
      }
    }
  });
}

const createConnectHandler = (error, serverRenderer) => (req, res, next) => {
  if (error) {
    return next(error);
  }
  serverRenderer(req, res, next);
};

function webpackHotServerMiddleware(
  multiCompiler: MultiCompiler
): RequestHandler {
  if (!isMultiCompiler(multiCompiler)) {
    throw new Error(
      `Expected webpack compiler to contain both a 'client' and/or 'server' config`
    );
  }

  const serverCompiler = findCompiler(multiCompiler, "server")[0];
  const clientCompilers = findCompiler(multiCompiler, "client");

  if (!serverCompiler) {
    throw new Error(`Expected a webpack compiler named 'server'`);
  }

  const outputFs = serverCompiler.outputFileSystem;
  const outputPath = serverCompiler.outputPath;

  installSourceMapSupport(outputFs);

  let serverRenderer;
  let error = false;

  const doneHandler = multiStats => {
    error = false;

    const serverStats = findStats(multiStats, "server")[0];
    // Server compilation errors need to be propagated to the client.
    if (serverStats.compilation.errors.length) {
      error = serverStats.compilation.errors[0];
      return;
    }

    let clientStatsJson = null;

    if (clientCompilers.length) {
      const clientStats = findStats(multiStats, "client");
      clientStatsJson = clientStats.map(obj => obj.toJson());

      if (clientStatsJson.length === 1) {
        clientStatsJson = clientStatsJson[0];
      }
    }

    const filename = getFilename(serverStats, outputPath, "main");
    const buffer = outputFs.readFileSync(filename);
    try {
      serverRenderer = getServerRenderer(filename, buffer);
    } catch (ex) {
      error = ex;
    }
  };

  multiCompiler.hooks.done.tap("WebpackHotServerMiddleware", doneHandler);

  return function() {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    return createConnectHandler(error, serverRenderer).apply(null, arguments);
  };
}

export default webpackHotServerMiddleware;

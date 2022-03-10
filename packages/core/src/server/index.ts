/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./public-path";
import Koa from "koa";
import { get } from "koa-route";
import serve from "koa-static";
import mount from "koa-mount";
import { Context, Package } from "@frontity/types";
import { exists } from "fs";
import { promisify } from "util";
import { scriptsStats } from "./middlewares/scripts-stats";
import { settingsAndStore } from "./middlewares/settings-and-store";
import { capabilitiesAndActions } from "./middlewares/capabilities-and-actions";
import { serverSideRendering } from "./middlewares/server-side-rendering";
import { errorHandling } from "./middlewares/error-handling";
import { storeMiddlewares } from "./middlewares/store-middlewares";

/**
 * Options for {@link server}.
 */
interface ServerOptions {
  /**
   * A map of module names to Frontity packages.
   */
  packages: {
    [moduleName: string]: Package;
  };
}

/**
 * Create the Frontity server.
 *
 * @param options - Options passed when creating the server. Defined in {@link
 * ServerOptions}.
 *
 * @returns A Frontity server which is a request handler callback for node's
 * native http/http2 server.
 */
const server = ({ packages }: ServerOptions): ReturnType<Koa["callback"]> => {
  const app = new Koa();

  // Catch and print errors in development. This must be the first middlware
  // because does a try/catch of the rest.
  app.use(errorHandling);

  // The module stats middleware.
  app.use(scriptsStats);

  // Setup the settings and store.
  app.use(settingsAndStore(packages));

  // Serve static files.
  app.use(async (ctx, next) => {
    const publicPath = ctx.state.store.state.frontity.options.publicPath.replace(
      /^(?:https?:)?\/\/([^/])+/,
      ""
    );

    // Serve the static files.
    return mount(
      publicPath,
      serve("build/static", {
        setHeaders(res) {
          // 'Cache-Control' needs to be Capitalized, otherwise, koa-static will overwrite it
          // see: https://github.com/koajs/send/blob/527048b6280d1c1f50b554317a248cc2d8151be8/index.js#L145
          res.setHeader(
            "Cache-Control",
            "max-age=31536000,s-maxage=31536000,immutable"
          );
          res.setHeader("Access-Control-Allow-Origin", "*");
        },
      })
    )(ctx, next);
  });

  // Serve robots.txt from root or default if it doesn't exists.
  app.use(
    get("/robots.txt", async (ctx, next) => {
      if (await promisify(exists)("./robots.txt")) {
        await serve("./")(ctx, next);
      } else {
        ctx.type = "text/plain";
        ctx.body = "User-agent: *\nAllow: /";
      }
    })
  );

  /**
   * A helper function for setting 404 status. It's used to ignore HMR if not in
   * dev mode or old browser open.
   *
   * @param ctx - The Koa app context.
   */
  const return404 = (ctx: Context) => {
    ctx.status = 404;
  };
  app.use(get("/__webpack_hmr", return404));
  app.use(get("/static/([a-z0-9]+\\.hot-update\\.json)", return404));

  // Return Frontity favicon for favicon.ico.
  app.use(get("/favicon.ico", serve("./")));

  // Add capabilities and run actions.
  app.use(capabilitiesAndActions);

  // Add the server middlewares exposed by packages.
  app.use(storeMiddlewares(app));

  // Sever Side Rendering with the defined
  // template and render method.
  app.use(serverSideRendering);

  return app.callback();
};

export default server;

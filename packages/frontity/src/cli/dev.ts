import dev from "../commands/dev";
import { errorLogger } from "../utils";

export default async ({
  target = process.env.FRONTITY_TARGET || "module",
  port = process.env.FRONTITY_PORT || "3000",
  https = !!process.env.FRONTITY_HTTPS,
  production = !!process.env.FRONTITY_PRODUCTION,
  publicPath = process.env.FRONTITY_PUBLIC_PATH || "/static/",
  dontOpenBrowser = !!process.env.FRONTITY_DONT_OPEN_BROWSER,
}: {
  target?: string;
  port?: string;
  https?: boolean;
  production?: boolean;
  publicPath?: string;
  dontOpenBrowser?: boolean;
}) => {
  // Check `target` parameter.
  if (target && target !== "es5" && target !== "module") {
    errorLogger(
      new Error(
        `The target specified is invalid: "${target}". Use either "module" or "es5".`
      )
    );
  }

  // Check `port` parameter.
  if (port && Number.isNaN(parseInt(port, 10))) {
    errorLogger(new Error(`The port number specified is not valid: ${port}.`));
  }

  // Execute `dev` command.
  dev({
    target: target as "es5" | "module",
    port: parseInt(port, 10),
    production,
    https,
    publicPath,
    dontOpenBrowser,
  });
};

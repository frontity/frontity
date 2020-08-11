import build from "../commands/build";
import { errorLogger } from "../utils";

export default async ({
  target = process.env.FRONTITY_BUILD_TARGET || "both",
  development = !!process.env.FRONTITY_BUILD_DEVELOPMENT,
  publicPath = process.env.FRONTITY_BUILD_PUBLIC_PATH || "/static/",
}: {
  target?: string;
  development?: boolean;
  publicPath?: string;
}) => {
  // Check `target` parameter.
  if (target && target !== "es5" && target !== "module" && target !== "both") {
    errorLogger(
      new Error(
        `The target specified is invalid: "${target}". Use either "module", "es5" or "both".`
      )
    );
  }

  // Execute `build` command.
  build({
    target: target as "es5" | "module" | "both",
    development,
    publicPath,
  });
};

import { Configuration } from "webpack";
import { Target } from "../../../types";

export default ({
  target
}: {
  target: Target;
}): Configuration["performance"] => ({
  ...(target === "server"
    ? {
        maxEntrypointSize: 3000000,
        maxAssetSize: 3000000
      }
    : {
        maxEntrypointSize: 300000,
        maxAssetSize: 300000
      })
});

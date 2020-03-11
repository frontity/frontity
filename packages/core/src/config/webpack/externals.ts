import { Configuration } from "webpack";
import { Target } from "../../../types";

export default ({
  target
}: {
  target: Target;
}): Configuration["externals"] => ({
  ...(target !== "server" && {
    he: "{}",
    "node-fetch": "window.fetch",
    url: "{ URL: window.URL }"
  })
});

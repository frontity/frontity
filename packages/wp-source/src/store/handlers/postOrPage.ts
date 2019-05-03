import { Handler } from "../../types";
import postHandler from "./post";
import pageHandler from "./page";

const postOrPageHandler: Handler = async (ctx, { path, params }) => {
  for (let handler of [postHandler, pageHandler]) {
    try {
      await handler(ctx, { path, params });
      break;
    } catch (e) {
      // Assume `handler` failed because no entity was found.
      // Continue and try the next handler.
    }
  }
};

export default postOrPageHandler;

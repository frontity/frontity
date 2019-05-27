import { Handler } from "../../../";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postType: Handler = async (ctx, { path, params, libraries }) => {
  const handlers = [post, page, attachment];

  let failedHandlers = 0;

  for (let handler of handlers) {
    try {
      await handler(ctx, { path, params, libraries });
      break;
    } catch (e) {
      failedHandlers += 1;

      if (failedHandlers === handlers.length)
        throw new Error("Entity not found by handler `postType`.");
    }
  }
};

export default postType;

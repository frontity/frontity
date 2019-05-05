import { Handler } from "../../types";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postType: Handler = async (ctx, { path, params }) => {
  for (let handler of [post, page, attachment]) {
    try {
      await handler(ctx, { path, params });
      break;
    } catch (e) {
      // Assume `handler` failed because no entity was found.
      // Continue and try the next handler.
    }
  }
};

export default postType;

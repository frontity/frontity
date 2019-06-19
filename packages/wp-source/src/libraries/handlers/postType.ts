import { Handler } from "../../../";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postType: Handler = async (source, { route, params, libraries }) => {
  const handlers = [post, page, attachment];

  let tries = 0;

  for (let handler of handlers) {
    try {
      await handler(source, { route, params, libraries });
      break;
    } catch (e) {
      if (++tries === handlers.length) throw e;
    }
  }
};

export default postType;

import { Handler } from "../../../";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postTypes: Handler = async ({ route, params, state, libraries }) => {
  const handlers = [post, page, attachment];

  let tries = 0;

  for (let handler of handlers) {
    try {
      await handler({ route, params, state, libraries });
      break;
    } catch (e) {
      if (++tries === handlers.length) throw e;
    }
  }
};

export default postTypes;

import { Handler } from "../../../types";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postType: Handler = async ({ route, params, state, libraries }) => {
  const handlers = [post, page, attachment];

  let tries = 0;

  for (const handler of handlers) {
    try {
      await handler({ route, params, state, libraries });
      break;
    } catch (e) {
      tries += 1;
      if (tries === handlers.length) throw e;
    }
  }
};

export default postType;

import { Handler } from "../../../types";
import post from "./post";
import page from "./page";
import attachment from "./attachment";

const postType: Handler = async ({ route, params, state, libraries }) => {
  const handlers = [post, page, attachment];
  let isHandled = false;

  for (const handler of handlers) {
    try {
      await handler({ route, params, state, libraries });
      // If a handler ends without errors,
      // set "isHandled" to true and exit the loop.
      isHandled = true;
      break;
    } catch (e) {
      // ignore handler errors
    }
  }

  // If "isHandled" is false, that means all handlers in "handlers" have failed.
  if (!isHandled) {
    const { id, slug } = params;
    throw new Error(
      `post type with ${slug ? `slug "${slug}"` : `id "${id}"`} not found`
    );
  }
};

export default postType;

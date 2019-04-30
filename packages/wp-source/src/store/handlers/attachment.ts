import { Handler, EntityData } from "../../types";
import { populate } from "../helpers";

const attachmentHandler: Handler = async (ctx, { path, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { id, slug } = params;

  let attachment: EntityData;
  let getParams:
    | {
        slug?: string;
      }
    | {
        include?: string;
      };

  // First, search attachment with the given slug
  if (id) {
    attachment = state.attachment[params.id];
    getParams = { include: id };
  } else if (slug) {
    attachment = Object.values(state.attachment).find(a => a.slug === slug);
    getParams = { slug };
  } else {
    state.dataMap[path].is404 = true;
    return;
  }

  // If none is found
  if (!attachment) {
    const response = await effects.api.get({
      endpoint: "media",
      params: { ...getParams, _embed: true }
    });

    [attachment] = await populate(ctx, response);
  }

  // Init data
  const data = state.data(path);
  if (attachment && !data.isAttachment) {
    const { type, id } = attachment;
    state.dataMap[path] = {
      type,
      id,
      isPostType: true,
      isAttachment: true,
      isFetching: true
    };
  }
};

export default attachmentHandler;

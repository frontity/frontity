import { Handler } from "../../types";
import { normalize } from "./utils";

const attachmentHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  // First, search attachment with the given slug
  let attachment: any = Object.values(state.post).find(
    (a: any) => a.slug === slug
  );

  // If none is found
  if (!attachment) {
    const response = await effects.api.get({
      endpoint: "media",
      params: { slug, _embed: true }
    });

    const entities = await normalize(response);
    [attachment] = entities;
    actions.populate({ entities });
  }

  // Init data
  if (attachment) {
    const { type, id, link } = attachment;
    Object.assign(state.data[name], {
      type,
      id,
      link,
      isPostType: true,
      isMedia: true,
      isAttachment: true,
    });
  } else {
    Object.assign(state.data[name], {
      is404: true
    });
  }
};

export default attachmentHandler;

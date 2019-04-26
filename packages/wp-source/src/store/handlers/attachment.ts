import { Handler, EntityData } from "../../types";
import { populate } from "../helpers";

const attachmentHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { id } = params;

  // First, search attachment with the given slug
  let attachment: EntityData = state.attachment[id];

  // If none is found
  if (!attachment) {
    const response = await effects.api.get({
      endpoint: "media",
      params: { include: id, _embed: true }
    });

    [attachment] = await populate(ctx, response);
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
      isAttachment: true
    });
  }
};

export default attachmentHandler;

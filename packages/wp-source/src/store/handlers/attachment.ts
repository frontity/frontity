import { Handler, EntityData } from "../../types";
import { populate } from "../helpers";

const attachmentHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // First, search attachment with the given slug
  let attachment: EntityData = state.attachment[params.id];

  // If none is found
  if (!attachment) {
    const response = await effects.api.get({
      endpoint: "media",
      params: { include: params.id, _embed: true }
    });

    [attachment] = await populate(ctx, response);
  }

  // Init data
  const data = state.data(name);
  if (attachment && !data.isAttachment) {
    const { type, id } = attachment;
    state.dataMap[name] = {
      type,
      id,
      isPostType: true,
      isAttachment: true,
      isFetching: true
    };
  }
};

export default attachmentHandler;

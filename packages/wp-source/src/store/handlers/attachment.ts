import { Handler } from "../../types";

const attachmentHandler: Handler = async (ctx, { path, params }) => {
  const state = ctx.state.source;
  const { api, populate} = ctx.effects.source;

  let { id, slug } = params;

  // Search attachment in store 
  let attachment = id
    ? state.attachment[id]
    : Object.values(state.attachment).find(a => a.slug === slug);

  // Get from REST API if no attachment was found
  if (!attachment) {
    const response = await api.get({
      endpoint: "media",
      params: { ...(id ? { include: id } : { slug }), _embed: true }
    });

    [{ id }] = await populate(state, response);
  }

  // Init data
  state.dataMap[path] = {
    id,
    type: "attachment",
    isPostType: true,
    isAttachment: true,
    isFetching: true
  };
};

export default attachmentHandler;

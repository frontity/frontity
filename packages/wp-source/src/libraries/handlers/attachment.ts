import { Handler } from "../../../";

const attachmentHandler: Handler = async (
  state,
  { path, params, libraries }
) => {
  const { api, populate } = libraries.source;

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

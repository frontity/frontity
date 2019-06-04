import { Handler } from "../../../";

const attachmentHandler: Handler = async (
  source,
  { route, params, libraries }
) => {
  const { api, populate } = libraries.source;

  let { id, slug } = params;

  // Search attachment in store
  let attachment = id
    ? source.attachment[id]
    : Object.values(source.attachment).find(a => a.slug === slug);

  // Get from REST API if no attachment was found
  if (!attachment) {
    const response = await api.get({
      endpoint: "media",
      params: { ...(id ? { include: id } : { slug }), _embed: true }
    });

    [{ id }] = await populate(source, response);
  }

  // Init data
  source.data[route] = {
    id,
    type: "attachment",
    isPostType: true,
    isAttachment: true,
    isFetching: true
  };
};

export default attachmentHandler;

import { Handler } from "../../../types";

const attachmentHandler: Handler = async ({
  route,
  params,
  state,
  libraries
}) => {
  const { source } = state;
  const { api, populate } = libraries.source;

  let { id } = params;
  const { slug } = params;

  // Search attachment in store
  const attachment = id
    ? source.attachment[id]
    : Object.values(source.attachment).find(a => a.slug === slug);

  // Get from REST API if no attachment was found
  if (!attachment) {
    const response = await api.get({
      endpoint: "media",
      params: { ...(id ? { include: id } : { slug }), _embed: true }
    });

    const populated = await populate({ response, state });

    if (populated.length === 0)
      throw new Error(
        `attachment with ${slug ? `slug "${slug}"` : `id "${id}"`} not found`
      );

    [{ id }] = populated;
  }

  // Init data
  Object.assign(source.data[route], {
    id,
    type: "attachment",
    isPostType: true,
    isAttachment: true
  });
};

export default attachmentHandler;

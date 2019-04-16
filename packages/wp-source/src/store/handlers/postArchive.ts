import { Handler } from "../types";

const postArchiveHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const hasNotPage =
    !(state.data[name].page && state.data[name].page[page]);

  let isOk: boolean;
  let entities: any;
  let total: number;
  let totalPages: number;

  if (hasNotPage) {
    ({ isOk, entities, total, totalPages } = await effects.api.get({
      endpoint: "posts",
      params: { search: params.s, page }
    }));

    // Throw an error if the request has failed
    if (!isOk) throw new Error();

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init data
  Object.assign(state.data[name], {
    type: 'post',
    isArchive: true,
    isPostTypeArchive: true,
    isPostArchive: true,
    isHome: true,
    total,
    totalPages
  });

  // Add the page if it doesn't exist
  if (hasNotPage) {
    state.data[name].page = state.data[name].page || [];
    state.data[name].page[page || 1] = entities.map(({ type, id, link }) => ({
      type,
      id,
      link
    }));
  }
};

export default postArchiveHandler;

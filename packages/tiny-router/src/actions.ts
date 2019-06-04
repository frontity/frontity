import TinyRouter from "..";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries
}) => routeOrParams => {
  const { getParams, getRoute } = libraries.source;
  const { path, page, query } = getParams(routeOrParams);
  const route = getRoute(routeOrParams);

  state.router.path = path;
  state.router.page = page;
  state.router.query = query;

  if (state.frontity.platform === "client" && !isPopState) {
    window.history.pushState({ path, page, query: { ...query } }, "", route);
    if (state.router.autoFetch) actions.source.fetch({ path, page, query });
  } else {
    isPopState = false;
  }
};

export const init: TinyRouter["actions"]["router"]["init"] = ({
  state,
  actions,
  libraries
}) => {
  if (state.frontity.platform === "server") {
    // Populate the router info with the initial path and page.
    const params = libraries.source.getParams(state.frontity.initial);
    state.router.path = params.path;
    state.router.page = params.page;
    state.router.query = params.query;
  } else {
    // Replace the current url with the same one but with state.
    const { path, page, query } = state.router;
    window.history.replaceState({ path, page, query: { ...query } }, "");
    // Listen to changes in history.
    window.addEventListener("popstate", ({ state: params }) => {
      isPopState = true;
      actions.router.set(params);
    });
  }
};

export const beforeSSR: TinyRouter["actions"]["router"]["beforeSSR"] = async ({
  state,
  actions
}) => {
  if (state.router.autoFetch) await actions.source.fetch(state.router);
};

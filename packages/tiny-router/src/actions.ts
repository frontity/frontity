import TinyRouter from "..";
import { parsePath, addFinalSlash } from "./utils";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  libraries
}) => routeOrParams => {
  const { getParams, getRoute } = libraries.source;
  const params = getParams(routeOrParams);
  const route = getRoute(routeOrParams);

  state.router.path = params.path;
  state.router.page = params.page;
  state.router.query = params.query;

  if (state.frontity.platform === "client" && !isPopState) {
    window.history.pushState(params, "", route);
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
    window.history.replaceState({ path, page, query }, "");
    // Listen to changes in history.
    window.addEventListener("popstate", ({ state: params }) => {
      isPopState = true;
      actions.router.set(params);
    });
  }
};

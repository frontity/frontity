import TinyRouter from "../types";
import { warn } from "frontity";

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries,
}) => (link, options = {}): void => {
  // normalizes link
  if (libraries.source && libraries.source.normalize)
    link = libraries.source.normalize(link);

  // sets state default value.
  if (!options.state) options.state = {};

  state.router.link = link;
  state.router.state = options.state;

  if (
    options.method === "push" ||
    (!options.method && state.frontity.platform === "client")
  ) {
    state.router.method = "push";
    window.history.pushState(options.state, "", link);
    if (state.router.autoFetch) actions.source.fetch(link);
  } else if (options.method === "replace") {
    state.router.method = "replace";
    window.history.replaceState(options.state, "", link);
    if (state.router.autoFetch) actions.source.fetch(link);
  } else if (options.method === "pop") {
    state.router.method = "pop";
  }
};

export const init: TinyRouter["actions"]["router"]["init"] = ({
  state,
  actions,
  libraries,
}) => {
  if (state.frontity.platform === "server") {
    // Populate the router info with the initial path and page.
    state.router.link =
      libraries.source && libraries.source.normalize
        ? libraries.source.normalize(state.frontity.initialLink)
        : state.frontity.initialLink;
  } else {
    // Replace the current url with the same one but with state.
    window.history.replaceState({ ...state.router.state }, "");
    // Listen to changes in history.
    window.addEventListener("popstate", (event) => {
      if (event.state) {
        actions.router.set(
          location.pathname + location.search + location.hash,
          { method: "pop", state: event.state }
        );
      }
    });
  }
};

export const beforeSSR: TinyRouter["actions"]["router"]["beforeSSR"] = ({
  state,
  actions,
}) => async ({ ctx }) => {
  if (state.router.autoFetch) {
    if (actions.source && actions.source.fetch) {
      await actions.source.fetch(state.router.link);
      const data = state.source.get(state.router.link);
      if (data.isError) {
        ctx.status = data.errorStatus;
      }
    } else {
      warn(
        "You are trying to use autoFetch but no source package is installed."
      );
    }
  }
};

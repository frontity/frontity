import { warn } from "frontity";
import clone from "ramda/src/clone";
import TinyRouter from "../types";

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries,
}) => (link, options = {}) => {
  // Normalizes link.
  if (libraries.source && libraries.source.normalize)
    link = libraries.source.normalize(link);

  // Sets state default value.
  if (!options.state) options.state = {};

  if (state.router.link !== link) state.router.previous = state.router.link;
  state.router.link = link;
  state.router.state = options.state;

  if (
    options.method === "push" ||
    (!options.method && state.frontity.platform === "client")
  ) {
    window.history.pushState(clone(options.state), "", link);
    if (state.router.autoFetch) actions.source.fetch(link);
  } else if (options.method === "replace") {
    window.history.replaceState(clone(options.state), "", link);
    if (state.router.autoFetch) actions.source.fetch(link);
  }
};

export const updateState: TinyRouter["actions"]["router"]["updateState"] = ({
  state,
}) => (browserState) => {
  state.router.state = browserState;
  window.history.replaceState(clone(browserState), "", state.router.link);
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
    window.history.replaceState(clone(state.router.state), "");
    // Listen to changes in history.
    window.addEventListener("popstate", (event) => {
      if (event.state) {
        actions.router.set(
          location.pathname + location.search + location.hash,
          // We are casting types here because `pop` is used only internally,
          // therefore we don't want to expose it in the types for users.
          { method: "pop", state: event.state } as {
            method: any;
            state: object;
          }
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

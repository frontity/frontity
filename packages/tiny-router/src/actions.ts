import TinyRouter from "../types";
import { warn } from "frontity";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries,
}) => (link): void => {
  // normalizes link
  if (libraries.source && libraries.source.normalize)
    link = libraries.source.normalize(link);

  state.router.link = link;

  if (state.frontity.platform === "client" && !isPopState) {
    window.history.pushState({ link }, "", link);
    if (state.router.autoFetch) actions.source.fetch(link);
  } else {
    isPopState = false;
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
    window.history.replaceState({ link: state.router.link }, "");
    // Listen to changes in history.
    window.addEventListener("popstate", ({ state }) => {
      isPopState = true;
      actions.router.set(state.link);
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

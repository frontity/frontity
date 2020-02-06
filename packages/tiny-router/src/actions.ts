import TinyRouter from "../types";
import { decode } from "frontity";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries
}) => (link): void => {
  // It's possible that the link contains unescaped entities like &amp; or &nbsp;
  link = decode(link);

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
  libraries
}) => {
  if (state.frontity.platform === "server") {
    // It's possible that the link contains unescaped entities like &amp; or &nbsp;
    const link = decode(state.frontity.initialLink);

    // Populate the router info with the initial path and page.
    state.router.link =
      libraries.source && libraries.source.normalize
        ? libraries.source.normalize(link)
        : link;
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

export const beforeSSR: TinyRouter["actions"]["router"]["beforeSSR"] = async ({
  state,
  actions
}) => {
  if (state.router.autoFetch) {
    if (actions.source && actions.source.fetch)
      await actions.source.fetch(state.router.link);
    else
      console.warn(
        "You are trying to use autoFetch but no source package is installed."
      );
  }
};

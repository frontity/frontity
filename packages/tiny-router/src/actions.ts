import TinyRouter from "..";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries
}) => link => {
  const { normalize } = libraries.source;
  // normalizes link
  link = normalize(link);

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
    // Populate the router info with the initial path and page.
    state.router.link = libraries.source.normalize(state.frontity.initialLink);
    console.log(state.frontity.initialLink, state.router.link);
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
  if (state.router.autoFetch) await actions.source.fetch(state.router.link);
};

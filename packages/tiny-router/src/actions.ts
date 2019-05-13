import TinyRouter from "..";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = state => pathOrObj => {
  const path = typeof pathOrObj === "string" ? pathOrObj : pathOrObj.path;
  const page = typeof pathOrObj === "string" ? 1 : pathOrObj.page;

  state.router.path = path;
  state.router.page = page;

  if (state.frontity.platform === "client" && !isPopState) {
    window.history.pushState({ path, page }, "", path);
  } else {
    isPopState = false;
  }
};

export const init: TinyRouter["actions"]["router"]["init"] = state => {
  if (state.frontity.platform === "server") {
    // Populate the router info with the initial path and page.
    state.router.path = state.frontity.initial.path;
    state.router.page = state.frontity.initial.page;
  } else {
    // Replace the current url with the same one but with state.
    window.history.replaceState(
      { path: state.router.path, page: state.router.page },
      ""
    );
    // Listen to changes in history.
    window.addEventListener("popstate", ({ state: { path, page } }) => {
      isPopState = true;
      set(state)({ path, page });
    });
  }

  if (typeof window !== "undefined") {
  }
};

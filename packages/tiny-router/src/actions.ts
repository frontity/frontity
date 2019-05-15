import TinyRouter from "..";
import { parsePath } from "./utils";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = ({
  state
}) => pathOrObj => {
  let path: string;
  let page: number;

  if (typeof pathOrObj === "string") {
    ({ path, page } = parsePath(pathOrObj));
  } else {
    ({ path, page } = pathOrObj);
  }

  state.router.path = path;
  state.router.page = page;

  if (state.frontity.platform === "client" && !isPopState) {
    window.history.pushState({ path, page }, "", path);
  } else {
    isPopState = false;
  }
};

export const init: TinyRouter["actions"]["router"]["init"] = ({
  state,
  actions
}) => {
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
      actions.router.set({ path, page });
    });
  }
};

import TinyRouter from "../type";

let isPopState = false;

export const set: TinyRouter["actions"]["router"]["set"] = state => pathOrObj => {
  const path = typeof pathOrObj === "string" ? pathOrObj : pathOrObj.path;
  const page = typeof pathOrObj === "string" ? null : pathOrObj.page;

  state.router.path = path;
  state.router.page = page;

  if (typeof window !== "undefined" && !isPopState) {
    window.history.pushState({ path, page }, "", path);
  } else {
    isPopState = false;
  }
};

export const init: TinyRouter["actions"]["router"]["init"] = state => {
  if (typeof window !== "undefined") {
    const { path, page } = state.router;

    // init first state
    window.history.replaceState({ path, page }, "");

    // listen to changes in history
    window.addEventListener("popstate", ({ state: { path, page } }) => {
      isPopState = true;
      set(state)({ path, page });
    });
  }
};

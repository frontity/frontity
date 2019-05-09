import { State, PathOrObj } from "../../type";

const set = (state: State) => (pathOrObj: PathOrObj) => {
  const path = typeof pathOrObj === "string" ? pathOrObj : pathOrObj.path;
  const page = typeof pathOrObj === "string" ? null : pathOrObj.page;

  state.router.path = path;
  state.router.page = page;

  if (typeof window !== "undefined") {
    window.history.pushState({ path, page }, "", path);
  }
};

const init = (state: State) => {
  if (typeof window !== "undefined") {
    window.addEventListener("popstate", ({ state: { path, page } }) =>
      set(state)({ path, page })
    );
  }
};

export default { set, init };

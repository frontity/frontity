import { Actions } from "./types";

const actions: Actions = {
  set: ({ state }, pathOrObj) => {
    if (typeof pathOrObj === "string") {
      state.path = pathOrObj;
      state.page = null;
    } else {
      state.path = pathOrObj.path;
      state.page = pathOrObj.page;
    }
  }
};

export default actions;

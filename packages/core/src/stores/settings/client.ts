// TODO: File left out of Typescript until we change it with our state manager.
import state from "./state";
import { rehydrate } from "overmind";
import { Settings } from "./types";

const settings: Settings = {
  state,
  onInitialize: ({ state }) => {
    // Hydrate Overmind.
    const mutations = document.getElementById("__OVERMIND_MUTATIONS__");
    if (mutations) rehydrate(state, JSON.parse(mutations.innerHTML));
  }
};

export default settings;

// TODO: Typescript not finished until we change it with our state manager.
import state from "./state";
import { Settings } from "./types";

const settings: Settings = {
  state,
  actions: {
    addSettings: (_, { state, settings }) => {
      state.settings.frontity = settings.settings;
      state.settings.frontity.name = settings.name;
      state.settings.frontity.mode = settings.mode;
      settings.packages.forEach(pkg => {
        Object.entries(pkg.settings).forEach(([namespace, settings]) => {
          state.settings[namespace] = settings;
        });
      });
    }
  }
};

export default settings;

// TODO: File left out of Typescript until we change it with our state manager.

export default {
  state: {
    frontity: {}
  },
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

import Theme from "./components/layout";
import MarsTheme from "../../";

const marsTheme: MarsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    theme: Theme
  },
  actions: {
    theme: {
      beforeSSR: async ({ state, actions }) => {
        await actions.source.fetch(state.router.path);
      }
    }
  }
};

export default marsTheme;

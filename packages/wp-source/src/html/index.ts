import { state, actions, effects } from "../store";

const WpSource =  {
  name: "@frontity/wp-source",
  state: {
    settings: {
      source: {
        apiUrl: "https://test.frontity.io",
        isCom: false,
      },
    },
    source: state,
  },
  actions: {
    source: actions,
  },
  libraries: {
    source: effects,
  },
}

export default WpSource;
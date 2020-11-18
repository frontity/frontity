import Root from "./components";
import SmartAdserver from "../types";
import SmartAd from "./components/smart-ad";

const smartAdserver: SmartAdserver = {
  name: "@frontity/smart-adserver",
  roots: {
    smartAdserver: Root,
  },
  state: {
    fills: {
      smartAdserver: {},
    },
    smartAdserver: {
      isLoaded: false,
    },
  },
  libraries: {
    fills: {
      smartAdserver: {
        SmartAd,
      },
    },
  },
};

export default smartAdserver;

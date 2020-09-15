import smartAdserver from "./components";
import SmartAdserver from "../types";

const SmartAdserver: SmartAdserver = {
  roots: {
    smartAdserver,
  },
  state: {
    fills: {
      smartAdserver: {},
    },
  },
  libraries: {
    fills: {
      SmartAd: {},
    },
  },
};

export default SmartAdserver;

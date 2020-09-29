import smartAdserver from "./components";
import SmartAdserver from "../types";
import SmartAd from "./components/smart-ad";

const SmartAdserver: SmartAdserver = {
  roots: {
    smartAdserver,
  },
  state: {
    fills: {
      smartAdserver: {},
    },
    smartAdserver: {},
  },
  libraries: {
    fills: {
      smartAdserver: { SmartAd },
    },
  },
};

export default SmartAdserver;

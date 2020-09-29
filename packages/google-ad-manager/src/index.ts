import GoogleAdManager from "../types";
import Root from "./components";
import GooglePublisherTag from "./components/google-publisher-tag";

const googleAdManager: GoogleAdManager = {
  roots: {
    googleAdManager: Root,
  },
  state: {
    fills: {
      googleAdManager: {},
    },
  },
  libraries: {
    fills: {
      googleAdManager: {
        GooglePublisherTag,
      },
    },
  },
};

export default googleAdManager;

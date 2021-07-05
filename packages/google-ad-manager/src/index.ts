import GoogleAdManager from "../types";
import { loadable } from "frontity";

const GooglePublisherTag = loadable(
  () => import("./components/google-publisher-tag")
);

const AmpAd = loadable(() => import("./components/amp-ad"));

const googleAdManager: GoogleAdManager = {
  name: "@frontity/google-ad-manager",
  state: {
    fills: {
      googleAdManager: {},
    },
  },
  libraries: {
    fills: {
      googleAdManager: {
        GooglePublisherTag,
        AmpAd,
      },
    },
  },
};

export default googleAdManager;

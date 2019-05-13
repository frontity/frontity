import { Settings } from "frontity/types";
import MarsTheme from "@frontity/mars-theme";
import TinyRouter from "@frontity/tiny-router";
import WpSource from "@frontity/wp-source/src/type";

const settings: Settings<MarsTheme | TinyRouter | WpSource> = {
  name: "mars-theme-example",
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          apiUrl: "https://test.frontity.io/wp-json/wp/v2/"
        }
      }
    }
  ]
};

module.exports = settings;

import { Settings } from "frontity/types";
import MarsTheme from "@frontity/mars-theme";
import TinyRouter from "@frontity/tiny-router";
import WpSource from "@frontity/wp-source";

const settings: Settings<MarsTheme | TinyRouter | WpSource> = {
  name: "mars-theme-example",
  state: {
    frontity: {
      url: "https://test.frontity.io",
      title: "Test Frontity Blog",
      description: "Useful content for Frontity development",
      navbar: [
        ["Home", "/"],
        ["Nature", "/category/nature/"],
        ["Travel", "/category/travel/"],
        ["Japan", "/tag/japan/"],
        ["About Us", "/about-us/"]
      ]
    }
  },
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          apiUrl: "https://test.frontity.io/wp-json/"
        }
      }
    }
  ]
};

module.exports = settings;

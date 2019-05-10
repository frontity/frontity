import Settings from "@frontity/types/settings";
import MarsTheme from "@frontity/mars-theme/type";

const settings: Settings<MarsTheme> = {
  name: "mars-theme-example",
  packages: ["@frontity/mars-theme", "@frontity/tiny-router"]
};

module.exports = settings;

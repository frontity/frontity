import { Package } from "@frontity/types";
import Router from "@frontity/router";

interface MarsTheme extends Package {
  name: "@frontity/mars-theme";
  roots: {
    theme: React.ReactType;
  };
  state: {
    router: Router["state"]["router"];
  };
}

export default MarsTheme;

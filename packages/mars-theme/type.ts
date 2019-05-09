import { Package, Namespaces } from "@frontity/types";

interface MarsTheme extends Package {
  name: "@frontity/mars-theme";
  namespaces: Namespaces<"theme">;
  roots: {
    theme: React.ReactType;
  };
}

export default MarsTheme;

import { AllSettings, Package } from "./src/types";

type MyThemePackage = Package & {
  name: "my-theme";
  namespaces?: ("theme" | "router")[];
  settings?: {
    theme: {
      color: string;
    };
    router?: {
      url?: string;
    };
  };
};

type MySourcePackage = Package & {
  name: "my-source";
  settings?: {
    api: string;
  };
};

const settings: AllSettings<MyThemePackage | MySourcePackage> = [
  {
    packages: [
      "@frontity/theme",
      {
        name: "my-theme",
        settings: {
          theme: {
            color: "#FFF"
          }
        }
      },
      {
        name: "my-source",
        settings: {
          api: "https://..."
        }
      }
    ]
  }
];

export default settings;

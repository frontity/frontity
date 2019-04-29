import { Settings, Package } from "../";

// Package
{
  // 1. Custom package extending from Package.
  interface Package1 extends Package {
    name: "package-1";
    namespaces: "namespace1"[];
    state: {
      settings: {
        namespace1: {
          prop1: string;
        };
      };
    };
  }

  const package1: Settings<Package1> = {
    packages: [
      {
        name: "package-1"
      }
    ]
  };

  // 2. Two different packages extending from Package.
  interface Package2 extends Package {
    name: "package-2";
    namespaces: ("namespace2" | "namespace3")[];
    state: {
      settings: {
        namespace2: {
          prop2: string;
          prop3?: number;
        };
        namespace3: {
          prop4: boolean;
        };
      };
    };
  }

  const package2: Settings<Package1 | Package2> = {
    packages: [
      {
        name: "package-1",
        namespaces: ["namespace1"],
        settings: {
          namespace1: {
            prop1: ""
          }
        }
      },
      {
        name: "package-2",
        namespaces: ["namespace2"],
        settings: {
          namespace2: {
            prop2: ""
          }
        }
      }
    ]
  };
}

test("Types are fine!", () => {});

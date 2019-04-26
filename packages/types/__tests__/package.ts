import Settings from "../settings";
import Package from "../package";

// Package
{
  // 1. Custom package extending from Package.
  interface Package1 extends Package {
    name: "package-1";
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
    settings: {
      namespace1: {
        someSetting: string;
        optionalSetting?: boolean;
      };
    };
  }

  const package2: Settings<Package1 | Package2> = {
    packages: [
      {
        name: "package-1"
      },
      {
        name: "package-2",
        settings: {
          namespace1: {
            someSetting: "some setting"
          }
        }
      }
    ]
  };
}

test("Types are fine!", () => {});

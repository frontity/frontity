import { Settings, Package } from "../types";

// Settings
{
  // 1. Minimal mono settings.
  const settings1: Settings = {
    packages: []
  };

  // 2. Minimal multi settings.
  const settings2: Settings = [
    {
      name: "site-1",
      packages: []
    }
  ];

  // 3. Settings with minimal base settings, name and mode.
  const settings3: Settings = {
    name: "site",
    mode: "html",
    settings: {
      url: "https://mysite.com"
    },
    packages: []
  };

  // 4. Settings with full base settings.
  const settings4: Settings = {
    name: "site",
    mode: "html",
    settings: {
      url: "https://mysite.com",
      timezone: 1,
      title: "My Site",
      language: "en",
      otherSetting: "other setting" // Extra setting
    },
    packages: []
  };

  // 5. Settings with string packages.
  const settings5: Settings = {
    packages: ["package-1", "package-2"]
  };

  // 6. Settings with minimal object packages.
  const settings6: Settings = {
    packages: [
      {
        name: "package-1"
      },
      {
        name: "package-2"
      }
    ]
  };

  // 7. Settings with full object package.
  const settings7: Settings = {
    packages: [
      {
        name: "package-1",
        active: true,
        namespaces: ["namespace1", "namespace2"],
        settings: {
          namespace1: {
            someSetting: "some setting of namespace 1"
          },
          namespace2: {
            otherSetting: "other setting of namespace 2"
          }
        }
      }
    ]
  };
}

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

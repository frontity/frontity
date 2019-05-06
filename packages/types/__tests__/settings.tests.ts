import { Settings } from "..";

// Settings
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
      exclude: ["namespace1", "namespace2"],
      settings: {
        namespace3: {
          someSetting: "some setting of namespace 1"
        },
        namespace2: {
          otherSetting: "other setting of namespace 2"
        }
      }
    }
  ]
};

test("Types are fine!", () => {});

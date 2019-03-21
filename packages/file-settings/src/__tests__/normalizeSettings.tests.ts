import normalizeSettings, { mergeSettings } from "../normalizeSettings";
import mockedMonoSettings from "./mocks/normalizeSettings/monoSettings.json";
import mockedMultiSettings from "./mocks/normalizeSettings/multiSettings.json";

const expectedMono = {
  name: "mono-settings",
  mode: "amp",
  settings: {
    timezone: 0,
    language: "es"
  },
  packages: [
    {
      name: "@frontity/theme",
      active: true
    },
    {
      name: "@frontity/wp-source",
      active: true
    }
  ]
};

const expectedMulti = [
  {
    name: "mmulti-settings-html",
    mode: "html",
    settings: {
      timezone: 0,
      language: "en"
    },
    packages: [
      {
        name: "@frontity/theme-html",
        active: true
      },
      {
        name: "@frontity/wp-source",
        active: true
      }
    ]
  },
  {
    name: "unique-settings-amp",
    mode: "amp",
    settings: {
      timezone: 0,
      language: "en"
    },
    packages: [
      {
        name: "@frontity/theme-amp",
        active: true
      },
      {
        name: "@frontity/wp-source",
        active: false
      }
    ]
  }
];

describe("mergeSettings", () => {
  test("should work with packages as strings or objects, and overriden settings", () => {
    const result = mergeSettings(mockedMonoSettings);
    expect(result).toEqual(expectedMono);
  });
});

describe("normalizeSettings", () => {
  test("should work when param `settings` is an object", () => {
    const result = normalizeSettings(mockedMonoSettings);
    expect(result).toEqual(expectedMono);
  });
  test("should work when param `settings` is an array", () => {
    const result = normalizeSettings(mockedMultiSettings);
    expect(result).toEqual(expectedMulti);
  });
});

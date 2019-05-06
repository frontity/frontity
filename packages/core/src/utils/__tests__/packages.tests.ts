import { getVariable, isNotExcluded } from "../packages";
import { NormalizedSettings, NormalizedPackage } from "@frontity/file-settings";

describe("getVariable", () => {
  test("should generate different variable names for different packages", () => {
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org-package", "mode")
    );
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("org-package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("@org/package", "html")).not.toBe(
      getVariable("@org/package", "amp")
    );
  });
});

const baseSettings: NormalizedSettings = {
  name: "site",
  mode: "html",
  settings: {
    timezone: 1,
    language: "en"
  },
  packages: []
};

const basePackage: NormalizedPackage = {
  name: "package1",
  active: true,
  exclude: [],
  settings: {}
};

describe("isNotExcluded", () => {
  test.skip("should throw if package does not exists", () => {
    const settings: NormalizedSettings = {
      ...baseSettings,
      packages: [basePackage]
    };
    expect(() =>
      isNotExcluded({
        settings,
        package: "doesnt-exist",
        namespace: "namespace1"
      })
    ).toThrow();
  });
  test.skip("should return false if package is excluded", () => {
    const settings: NormalizedSettings = {
      ...baseSettings,
      packages: [
        {
          ...basePackage,
          exclude: ["namespace1"]
        }
      ]
    };
    expect(
      isNotExcluded({ settings, package: "package1", namespace: "namespace1" })
    ).toBe(false);
  });
  test.skip("should return true if package is not excluded", () => {
    const settings: NormalizedSettings = {
      ...baseSettings,
      packages: [basePackage]
    };
    expect(
      isNotExcluded({ settings, package: "package1", namespace: "namespace1" })
    ).toBe(true);
  });
});

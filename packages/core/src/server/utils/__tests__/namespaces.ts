import { NormalizedSettings } from "@frontity/file-settings";
import { getNamespaces, Packages } from "../namespaces";
import { getVariable } from "../../../utils/packages";

const defaultSettings = {
  name: "site-1",
  mode: "html",
  settings: {
    timezone: 0,
    language: "en"
  }
};

describe("getNamespaces", () => {
  test("should throw if two namespaces are equal", () => {
    const settings: NormalizedSettings = {
      ...defaultSettings,
      packages: [{ name: "@org/package-1" }, { name: "@org/package-2" }]
    };
    const packages: Packages = {
      [getVariable("@org/package-1", "html")]: {
        ns1: {}
      },
      [getVariable("@org/package-2", "html")]: {
        ns1: {}
      }
    };
    expect(() => getNamespaces({ settings, packages })).toThrow(
      'You have two packages that use the "ns1" namespace. Please remove one of them.'
    );
  });
  test("should only include namespaces of the namespace field", () => {
    const settings: NormalizedSettings = {
      ...defaultSettings,
      packages: [{ name: "@org/package-1", namespaces: ["ns1", "ns2"] }]
    };
    const packages: Packages = {
      [getVariable("@org/package-1", "html")]: {
        ns1: {},
        ns2: {},
        ns3: {}
      }
    };
    expect(getNamespaces({ settings, packages })).toEqual({ ns1: {}, ns2: {} });
  });
});

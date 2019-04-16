import getPackages from "../getAllSites";
import * as importSettings from "../importSettings";
import mockedMonoSettings from "./mocks/getAllSites/monoSettings.json";
import mockedMultiSettings from "./mocks/getAllSites/multiSettings.json";
import mockedDeactivatedPackage from "./mocks/getAllSites/deactivatedPackage.json";
import mockedNamespacedPackage from "./mocks/getAllSites/namespacedPackage.json";

jest.mock("../importSettings");

describe("getPackages", () => {
  const mockedImportSettings = importSettings as jest.Mocked<
    typeof importSettings
  >;

  afterEach(() => {
    mockedImportSettings.default.mockReset();
  });

  test("should work when `allSettings` is an object", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedMonoSettings);
    const result = await getPackages();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [
          { name: "@frontity/theme", namespaces: [] },
          { name: "@frontity/wp-source", namespaces: [] }
        ]
      }
    ]);
  });

  test("should work when `allSettings` is an array", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedMultiSettings);
    const result = await getPackages();
    expect(result).toEqual([
      {
        name: "settings-html",
        mode: "html",
        packages: [
          { name: "@frontity/theme-html", namespaces: [] },
          { name: "@frontity/wp-source-html", namespaces: [] }
        ]
      },
      {
        name: "settings-amp",
        mode: "amp",
        packages: [
          { name: "@frontity/theme-amp", namespaces: [] },
          { name: "@frontity/wp-source-amp", namespaces: [] }
        ]
      }
    ]);
  });

  test("should filter out inactive packages", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedDeactivatedPackage);
    const result = await getPackages();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [{ name: "@frontity/theme", namespaces: [] }]
      }
    ]);
  });

  test("should pass on correct namespaces", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedNamespacedPackage);
    const result = await getPackages();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [
          { name: "@frontity/theme", namespaces: ["ns1", "ns2"] },
          { name: "@frontity/wp-source", namespaces: [] }
        ]
      }
    ]);
  });
});

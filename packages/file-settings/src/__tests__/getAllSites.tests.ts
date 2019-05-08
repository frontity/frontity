import getAllSites from "../getAllSites";
import * as importSettings from "../importSettings";
import mockedMonoSettings from "./mocks/getAllSites/monoSettings.json";
import mockedMultiSettings from "./mocks/getAllSites/multiSettings.json";
import mockedDeactivatedPackage from "./mocks/getAllSites/deactivatedPackage.json";
import mockedNamespacedPackage from "./mocks/getAllSites/namespacedPackage.json";

jest.mock("../importSettings");

describe("getAllSites", () => {
  const mockedImportSettings = importSettings as jest.Mocked<
    typeof importSettings
  >;

  afterEach(() => {
    mockedImportSettings.default.mockReset();
  });

  test("should work when `allSettings` is an object", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedMonoSettings);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [
          { name: "@frontity/theme", exclude: [] },
          { name: "@frontity/wp-source", exclude: [] }
        ]
      }
    ]);
  });

  test("should work when `allSettings` is an array", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedMultiSettings);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "settings-html",
        mode: "html",
        packages: [
          { name: "@frontity/theme-html", exclude: [] },
          { name: "@frontity/wp-source-html", exclude: [] }
        ]
      },
      {
        name: "settings-amp",
        mode: "amp",
        packages: [
          { name: "@frontity/theme-amp", exclude: [] },
          { name: "@frontity/wp-source-amp", exclude: [] }
        ]
      }
    ]);
  });

  test("should filter out inactive packages", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedDeactivatedPackage);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [{ name: "@frontity/theme", exclude: [] }]
      }
    ]);
  });

  test("should pass on correct exclude", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedNamespacedPackage);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "html",
        packages: [
          { name: "@frontity/theme", exclude: ["ns1", "ns2"] },
          { name: "@frontity/wp-source", exclude: [] }
        ]
      }
    ]);
  });
});

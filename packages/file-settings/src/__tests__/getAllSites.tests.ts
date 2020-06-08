import getAllSites from "../getAllSites";
import * as importSettings from "../importSettings";
import mockedMonoSettings from "./mocks/getAllSites/monoSettings.json";
import mockedMultiSettings from "./mocks/getAllSites/multiSettings.json";
import mockedDeactivatedPackage from "./mocks/getAllSites/deactivatedPackage.json";

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
        mode: "default",
        packages: ["@frontity/theme", "@frontity/wp-source"],
      },
    ]);
  });

  test("should work when `allSettings` is an array", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedMultiSettings);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "settings-default",
        mode: "default",
        packages: ["@frontity/theme-default", "@frontity/wp-source-default"],
      },
      {
        name: "settings-amp",
        mode: "amp",
        packages: ["@frontity/theme-amp", "@frontity/wp-source-amp"],
      },
    ]);
  });

  test("should filter out inactive packages", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedDeactivatedPackage);
    const result = await getAllSites();
    expect(result).toEqual([
      {
        name: "mono-settings",
        mode: "default",
        packages: ["@frontity/theme"],
      },
    ]);
  });
});

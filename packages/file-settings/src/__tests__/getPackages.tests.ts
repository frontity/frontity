import getPackages from "../getPackages";
import * as getSettings from "../getSettings";
import packagesStrings from "./mocks/packagesStrings.json";
import packagesObjects from "./mocks/packagesObjects.json";
import packagesMixed from "./mocks/packagesMixed.json";

jest.mock("../getSettings");

describe("Packages > `getPackages` returns the right packages when", () => {
  const mockedGetSettings = getSettings as jest.Mocked<typeof getSettings>;

  afterEach(() => {
    mockedGetSettings.default.mockReset();
  });

  test("all packages are strings", async () => {
    mockedGetSettings.default.mockResolvedValue(packagesStrings);
    const result = await getPackages({ url: "https://frontity.org" });
    expect(result).toEqual(["@frontity/theme", "@frontity/wp-source"]);
  });

  test("all packages are objects", async () => {
    mockedGetSettings.default.mockResolvedValue(packagesObjects);
    const result = await getPackages({ url: "https://frontity.org" });
    expect(result).toEqual(["@frontity/theme", "@frontity/wp-source"]);
  });

  test("some packages are objects and others are strings", async () => {
    mockedGetSettings.default.mockResolvedValue(packagesMixed);
    const result = await getPackages({ url: "https://frontity.org" });
    expect(result).toEqual(["@frontity/theme", "@frontity/wp-source"]);
  });
});

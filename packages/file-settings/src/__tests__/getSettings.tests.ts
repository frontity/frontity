import getSettings from "../getSettings";
import * as importSettings from "../importSettings";
import mockedMonoSettings from "./mocks/getSettings/monoSettings.json";
import mockedSettingsWithLengthOne from "./mocks/getSettings/settingsWithLengthOne.json";
import mockedSettingsWithNames from "./mocks/getSettings/settingsWithNames.json";
import mockedSettingsWithOneMatch from "./mocks/getSettings/settingsWithOneMatch.json";
import mockedSettingsWithMatches from "./mocks/getSettings/settingsWithMatches.json";

jest.mock("../importSettings");

describe("getSettings", () => {
  const mockedImportSettings = importSettings as jest.Mocked<
    typeof importSettings
  >;

  afterEach(() => {
    mockedImportSettings.default.mockReset();
  });

  test("should work when `allSettings` is not an array", async () => {
    mockedImportSettings.default.mockResolvedValueOnce(mockedMonoSettings);
    const settings = await getSettings({ url: "https://frontity.org" });
    expect(settings.name).toBe("mono-settings");
  });

  test("should work when `allSettings` is an array of length 1", async () => {
    mockedImportSettings.default.mockResolvedValueOnce(
      mockedSettingsWithLengthOne
    );
    const settings = await getSettings({ url: "https://frontity.org" });
    expect(settings.name).toBe("settings-with-length-one");
  });

  test("should work when `name` is passed as a param", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithNames);
    const settings = [
      await getSettings({
        name: "settings-one",
      }),
      await getSettings({
        name: "settings-two",
      }),
    ];
    expect(settings[0].name).toBe("settings-one");
    expect(settings[1].name).toBe("settings-two");
  });

  test("should throw when an unexistent `name` is passed as a param", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithNames);
    await expect(
      getSettings({ name: "fake-name", url: "https://frontity.org" })
    ).rejects.toThrow("Do not exist any settings named 'fake-name'.");
  });

  test("should work when one of the settings matches `url`", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithOneMatch);
    const settings = await getSettings({
      url: "https://frontity.org/amp/",
    });
    expect(settings.name).toBe("settings-with-match");
  });

  test("should work when more than one of the settings matches `url`", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithMatches);
    const settings = await getSettings({
      url: "https://frontity.org/page/about-us",
    });
    expect(settings.name).toBe("settings-with-large-match");
  });

  test("should work when none of the settings matches `url` but one doesn't have `match` defined", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithOneMatch);
    const settings = await getSettings({
      url: "https://frontity.org",
    });
    expect(settings.name).toBe("settings-without-match");
  });

  test("should work when none of the settings matches `url` and all have `match` defined", async () => {
    mockedImportSettings.default.mockResolvedValue(mockedSettingsWithMatches);
    const settings = await getSettings({
      url: "https://not.frontity.org",
    });
    expect(settings.name).toBe("settings-with-short-match");
  });
});

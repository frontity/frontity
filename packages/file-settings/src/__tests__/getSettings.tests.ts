import getSettings from "../getSettings";
import * as utils from "../utils";
import allSettingsNotArray from "./mocks/allSettingsNotArray.json";
import allSettingsLengthOne from "./mocks/allSettingsLengthOne.json";
import allSettingsWithNames from "./mocks/allSettingsWithNames.json";
import allSettingsOneMatch from "./mocks/allSettingsOneMatch.json";
import allSettingsManyMatches from "./mocks/allSettingsManyMatches.json";

jest.mock("../utils");

describe("`getSettings` should return the right settings when:", () => {
  const mockedUtils = utils as jest.Mocked<typeof utils>;

  afterEach(() => {
    mockedUtils.importSettingsFromFile.mockReset();
  });

  test("`allSettings` is not an array", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValueOnce(
      allSettingsNotArray
    );
    const settings = await getSettings({ url: "https://frontity.org" });
    expect(settings.name).toBe("allsettings-not-array");
  });

  test("`allSettings` is an array of length 1", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValueOnce(
      allSettingsLengthOne
    );
    const settings = await getSettings({ url: "https://frontity.org" });
    expect(settings.name).toBe("allsettings-length-one");
  });

  test("`name` is passed as a param", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValue(allSettingsWithNames);
    const settings = [
      await getSettings({
        name: "settings-one",
        url: "https://frontity.org"
      }),
      await getSettings({
        name: "settings-two",
        url: "https://frontity.org"
      })
    ];
    expect(settings[0].name).toBe("settings-one");
    expect(settings[1].name).toBe("settings-two");
  });

  test("one of the settings matches `url`", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValue(allSettingsOneMatch);
    const settings = await getSettings({
      url: "https://frontity.org/amp/"
    });
    expect(settings.name).toBe("settings-with-match");
  });

  test("more than one of the settings matches `url`", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValue(
      allSettingsManyMatches
    );
    const settings = await getSettings({
      url: "https://frontity.org/page/about-us"
    });
    expect(settings.name).toBe("settings-with-large-match");
  });

  test("none of the settings matches `url` but one settings doesn't have `matches` defined", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValue(allSettingsOneMatch);
    const settings = await getSettings({
      url: "https://frontity.org"
    });
    expect(settings.name).toBe("settings-without-match");
  });
  test("none of the settings matches `url` and all settings have `matches` defined", async () => {
    mockedUtils.importSettingsFromFile.mockResolvedValue(
      allSettingsManyMatches
    );
    const settings = await getSettings({
      url: "https://not.frontity.org"
    });
    expect(settings.name).toBe("settings-with-short-match");
  });
});

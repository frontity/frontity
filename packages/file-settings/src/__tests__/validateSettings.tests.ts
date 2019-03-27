import validateSettings from "../validateSettings";
import mockedSettingsMissingName from "./mocks/validateSettings/settingsMissingName.json";
import mockedSettingsRepeatedName from "./mocks/validateSettings/settingsRepeatedName.json";
import mockedPackageMissingName from "./mocks/validateSettings/packageMissingName.json";
import mockedPackageRepeatedName from "./mocks/validateSettings/packageRepeatedName.json";
import mockedMonoSettings from "./mocks/normalizeSettings/monoSettings.json";

describe("validateSettings", () => {
  test("should throw if some multi settings is missing its name", () => {
    expect(() => validateSettings(mockedSettingsMissingName as any)).toThrow(
      "All the settings must have a unique name."
    );
  });

  test("should throw if some multi settings has a repeated name", () => {
    expect(() => validateSettings(mockedSettingsRepeatedName)).toThrow(
      "All the settings must have a unique name."
    );
  });

  test("should not throw if mono settings is missing its name", () => {
    expect(() => validateSettings(mockedMonoSettings)).not.toThrow();
  });

  test("should throw if some package is missing its name", () => {
    expect(() => validateSettings(mockedPackageMissingName as any)).toThrow(
      "All the packages must have a unique name."
    );
  });

  test("should throw if some package has a repeated name", () => {
    expect(() => validateSettings(mockedPackageRepeatedName as any)).toThrow(
      "All the packages must have a unique name."
    );
  });
});

import path from "path";
import { importSettingsFromFile } from "../utils";
import defaultSettings from "../../frontity.settings";

jest.mock("path");

describe("File Settings › Utils", () => {
  const mockedPath = path as jest.Mocked<typeof path>;

  afterEach(() => {
    mockedPath.resolve.mockReset();
  });

  test("`importSettingsFromFile` returns the custom settings from a TS file", async () => {
    mockedPath.resolve.mockImplementation(
      cwd => cwd + "/src/__tests__/mocks/ts/frontity.settings"
    );

    const result = await importSettingsFromFile();

    expect(result).toEqual({
      name: "custom-settings-ts"
    });
  });

  test("`importSettingsFromFile` returns the custom settings from a JS file", async () => {
    mockedPath.resolve.mockImplementation(
      cwd => cwd + "/src/__tests__/mocks/js/frontity.settings"
    );

    const result = await importSettingsFromFile();

    expect(result).toEqual({
      name: "custom-settings-js"
    });
  });

  test("`importSettingsFromFile` returns the default settings", async () => {
    mockedPath.resolve.mockImplementation(
      cwd => cwd + "/non-existent-path/frontity.settings"
    );

    const result = await importSettingsFromFile();

    expect(result).toBe(defaultSettings);
  });
});

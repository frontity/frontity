import path from "path";
import importSettings from "../importSettings";
import { UniqueSettings } from "../types";

jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;

describe("`importSettings` should return the settings when", () => {
  afterEach(() => {
    mockedPath.resolve.mockReset();
  });

  test("settings are defined in a TS file", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/src/__tests__/mocks/importSettings/ts/${file}`
    );
    const result = (await importSettings()) as UniqueSettings;
    expect(result.name).toBe("custom-settings-ts");
  });

  test("settings are defined in a JS file", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/src/__tests__/mocks/importSettings/js/${file}`
    );
    const result = (await importSettings()) as UniqueSettings;
    expect(result.name).toBe("custom-settings-js");
  });
});

describe("`importSettings` should throw an error when", () => {
  afterEach(() => {
    mockedPath.resolve.mockReset();
  });

  test("a settings file doesn't exist", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/non/existet/path/${file}`
    );
    await expect(importSettings()).rejects.toThrow(
      "A Frontity settings file doesn't exist"
    );
  });
});

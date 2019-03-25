import path from "path";
import importSettings from "../importSettings";
import { NormalizedMono } from "../types";

jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;

describe("importSettings", () => {
  afterEach(() => {
    mockedPath.resolve.mockReset();
  });

  test("should work when settings are defined in a TS file", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/src/__tests__/mocks/importSettings/ts/${file}`
    );
    const result = (await importSettings()) as NormalizedMono;
    expect(result.name).toBe("custom-settings-ts");
  });

  test("should work when settings are defined in a JS file", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/src/__tests__/mocks/importSettings/js/${file}`
    );
    const result = (await importSettings()) as NormalizedMono;
    expect(result.name).toBe("custom-settings-js");
  });

  test("should throw when it doesn't exist a settings file", async () => {
    mockedPath.resolve.mockImplementation(
      (cwd, file) => `${cwd}/non/existet/path/${file}`
    );
    await expect(importSettings()).rejects.toThrow(
      "A Frontity settings file doesn't exist"
    );
  });
});

import fs from "fs";
import { isEmptyDir, isGitRepository, checkMandatoryParams } from "../utils";

jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("checkMandatoryParams", () => {
  test("throws if no params are passed", () => {
    expect(() => (checkMandatoryParams as any)()).toThrow(
      "The parameter `params` is mandatory in `checkMandatoryParams`."
    );
    expect(() => (checkMandatoryParams as any)({})).toThrow(
      "The parameter `params` is mandatory in `checkMandatoryParams`."
    );
  });

  test("throws if at least one of the params passed is undefined", () => {
    expect(() => checkMandatoryParams({ someParam: undefined })).toThrow(
      "The parameter `someParam` is mandatory in `expect`."
    );
    expect(() =>
      checkMandatoryParams({ someParam: undefined, otherParam: undefined })
    ).toThrow(
      "The parameters `someParam`, `otherParam` are mandatory in `expect`."
    );
  });

  test("does nothing if none of the params passed is undefined", () => {
    expect(() =>
      checkMandatoryParams({ someParam: "someValue" })
    ).not.toThrow();
  });
});

describe("isEmptyDir", () => {
  test("returns true for an empty dir", () => {
    mockedFs.readdirSync.mockReturnValueOnce([]);
    expect(isEmptyDir(__dirname)).toBe(true);
  });

  test("returns true for an empty GitHub repo", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([
      "README.md",
      ".git",
      "LICENSE",
      ".gitignore"
    ]);
    expect(isEmptyDir(__dirname)).toBe(true);
  });

  test("returns false for a non-empty dir", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce(["some-file"]);
    expect(isEmptyDir(__dirname)).toBe(false);
  });

  test("throws for a non-existent dir", () => {
    (mockedFs.readdirSync as any).mockImplementation(() => {
      const error: any = new Error();
      error.code = "ENOENT";
      throw error;
    });
    expect(() => isEmptyDir(__dirname)).toThrow(
      "The path provided to `isEmptyDir` does not exist."
    );
  });
});

describe("isGitRepository", () => {
  test("returns true if the dir is a git repository", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([".git"]);
    expect(isGitRepository(__dirname)).toBe(true);
  });

  test("returns false if the dir is not a git repository", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([]);
    expect(isGitRepository(__dirname)).toBe(false);
  });

  test("throws for a non-existent dir", () => {
    (mockedFs.readdirSync as any).mockImplementation(() => {
      const error: any = new Error();
      error.code = "ENOENT";
      throw error;
    });
    expect(() => isGitRepository(__dirname)).toThrow(
      "The path provided to `isGitRepository` does not exist."
    );
  });
});

import fs from "fs";
import { resolve } from "path";
import { isEmptyDir, isGitRepository } from "../utils";

jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("isEmptyDir", () => {
  test("returns true for an empty dir", () => {
    mockedFs.readdirSync.mockReturnValueOnce([]);
    expect(isEmptyDir()).toBe(true);
  });

  test("returns true for an empty GitHub repo", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([
      "README.md",
      ".git",
      "LICENSE",
      ".gitignore"
    ]);
    expect(isEmptyDir()).toBe(true);
  });

  test("returns false for a non-empty dir", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce(["some-file"]);
    expect(isEmptyDir()).toBe(false);
  });

  test("throws for a non-existent dir", () => {
    (mockedFs.readdirSync as any).mockImplementation(() => {
      const error: any = new Error();
      error.code = "ENOENT";
      throw error;
    });
    expect(() => isEmptyDir()).toThrow(
      "The path provided to `isEmptyDir` does not exist."
    );
  });
});

describe("isGitRepository", () => {
  test("returns true if the dir is a git repository", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([".git"]);
    expect(isGitRepository()).toBe(true);
  });
  test("returns false if the dir is not a git repository", () => {
    (mockedFs.readdirSync as any).mockReturnValueOnce([]);
    expect(isGitRepository()).toBe(false);
  });
  test("throws for a non-existent dir", () => {
    (mockedFs.readdirSync as any).mockImplementation(() => {
      const error: any = new Error();
      error.code = "ENOENT";
      throw error;
    });
    expect(() => isGitRepository()).toThrow(
      "The path provided to `isGitRepository` does not exist."
    );
  });
});

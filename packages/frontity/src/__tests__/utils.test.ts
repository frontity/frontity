import { isPackageNameValid, fetchPackageVersion } from "../utils";
import * as fetch from "node-fetch";

describe("isPackageNameValid", () => {
  describe("package.json requirements", () => {
    // Tests extracted from https://docs.npmjs.com/files/package.json#name
    test("The name must be less than or equal to 214 characters", () => {
      const str214length = new Array(215).join("a");
      expect(isPackageNameValid(str214length)).toBe(false);
    });
    test("The name can’t start with a dot", () => {
      const strStartWithDot = ".aaa";
      expect(isPackageNameValid(strStartWithDot)).toBe(false);
    });
    test("The name can’t start with an underscore", () => {
      const strStartWithUnderscore = "_aaa";
      expect(isPackageNameValid(strStartWithUnderscore)).toBe(false);
    });
    test("New packages must not have uppercase letters in the name", () => {
      const strUppercase1 = "Aaa";
      const strUppercase2 = "aAa";
      const strUppercase3 = "aaA";
      expect(isPackageNameValid(strUppercase1)).toBe(false);
      expect(isPackageNameValid(strUppercase2)).toBe(false);
      expect(isPackageNameValid(strUppercase3)).toBe(false);
    });
    test("The name can’t contain any non-URL-safe characters", () => {
      // Unsafe characters extracted from this site:
      // https://perishablepress.com/stop-using-unsafe-characters-in-urls/
      const unsafeChars = "$+!*'(),;?:=&@/";
      unsafeChars.split("").map((char) => {
        expect(isPackageNameValid(`a${char}a`)).toBe(false);
      });
    });
  });
  describe("Unix and Windows folder name requirements", () => {
    test("The folder name can’t contain any non-safe characters", () => {
      // Unsafe characters extracted from this question:
      // https://serverfault.com/questions/242110/which-common-charecters-are-illegal-in-unix-and-windows-filesystems
      const unsafeChars = '\\/:*?"<>|';
      unsafeChars.split("").map((char) => {
        expect(isPackageNameValid(`a${char}a`)).toBe(false);
      });
    });
  });
  describe("Use a valid package", () => {
    test("A plain name is working", () => {
      // Unsafe characters extracted from this question:
      // https://serverfault.com/questions/242110/which-common-charecters-are-illegal-in-unix-and-windows-filesystems
      expect(isPackageNameValid("frontity")).toBe(true);
    });
    test("A name with dots is working", () => {
      // Unsafe characters extracted from this question:
      // https://serverfault.com/questions/242110/which-common-charecters-are-illegal-in-unix-and-windows-filesystems
      expect(isPackageNameValid("frontity.org.cool")).toBe(true);
    });
    test("A name with dots and dashes is working", () => {
      // Unsafe characters extracted from this question:
      // https://serverfault.com/questions/242110/which-common-charecters-are-illegal-in-unix-and-windows-filesystems
      expect(isPackageNameValid("frontity-org.cool")).toBe(true);
    });
    test("A name with more than one dash is working", () => {
      // Unsafe characters extracted from this question:
      // https://serverfault.com/questions/242110/which-common-charecters-are-illegal-in-unix-and-windows-filesystems
      expect(isPackageNameValid("frontity-org-cool")).toBe(true);
    });
  });
});

describe("fetchPackageVersion", () => {
  const mockedFetch = jest.spyOn(fetch, "default");

  beforeEach(() => {
    mockedFetch.mockReset();
  });

  test("should return the latest version if found in the NPM registry", async () => {
    mockedFetch.mockResolvedValueOnce(
      new fetch.Response(`{"dist-tags":{"latest":"1.0.0"}}`)
    );
    await expect(fetchPackageVersion("some-package")).resolves.toBe("1.0.0");
    expect(mockedFetch).toHaveBeenCalledWith(
      "https://registry.npmjs.com/some-package"
    );
  });

  test("should throw an error otherwise", async () => {
    mockedFetch.mockResolvedValueOnce(
      new fetch.Response(`{"error":"Not found"}`)
    );
    await expect(fetchPackageVersion("non-existent")).rejects.toThrow();
    expect(mockedFetch).toHaveBeenCalledWith(
      "https://registry.npmjs.com/non-existent"
    );
  });
});

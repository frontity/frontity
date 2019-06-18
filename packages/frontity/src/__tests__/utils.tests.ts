import { isPackageNameValid } from "../utils";

describe("isPackageNameValid", () => {
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
    // but with @ and / removed to allow folders and orgs.
    const unsafeChars = "$-_.+!*'(),;?:=&";
    unsafeChars.split("").map(char => {
      expect(isPackageNameValid(`a${char}a`)).toBe(false);
    });
  });
});

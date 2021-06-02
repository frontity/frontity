import ignore from "../ts-node-ignore";

const ignoreRegExp = new RegExp(ignore[0]);

describe("ts-node ignores", () => {
  it("should ignore javascript files inside node_modules", () => {
    const paths = [
      "node_modules/index.js",
      "node_modules/some-package/index.js",
      "node_modules/@org/some-package/index.js",
      "node_modules/@org/some-package/folder/index.js",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(true);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(true);
    }
  });

  it("should not ignore typescript files", () => {
    const paths = [
      "index.ts",
      "node_modules/index.ts",
      "node_modules/some-package/index.ts",
      "node_modules/@org/some-package/index.ts",
      "node_modules/@org/some-package/folder/index.ts",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });

  it("should not ignore frontity settings", () => {
    const paths = ["frontity.settings.js", "frontity.settings.ts"];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });

  it("should not ignore javascript files outside node_modules", () => {
    const paths = [
      "index.js",
      "some-package/index.js",
      "@org/some-package/index.js",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });

  it("should not ignore frontity.config files", () => {
    const paths = [
      "node_modules/@org/some-package/frontity.config.js",
      "node_modules/some-package/frontity.config.js",
      "some-package/frontity.config.js",
      "node_modules/@org/some-package/frontity.config.ts",
      "node_modules/some-package/frontity.config.ts",
      "some-package/frontity.config.ts",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });

  it("should not ignore packages from `@frontity`", () => {
    const paths = [
      "node_modules/@frontity/some-package/index.js",
      "@frontity/some-package/index.js",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });

  it("should not ignore packages with `frontity` in the name", () => {
    const paths = [
      "node_modules/@org/some-frontity-package/index.js",
      "node_modules/some-frontity-package/index.js",
    ];
    for (const path of paths) {
      expect(ignoreRegExp.test(path)).toBe(false);
      expect(ignoreRegExp.test(path.replace(/\//g, "\\"))).toBe(false);
    }
  });
});

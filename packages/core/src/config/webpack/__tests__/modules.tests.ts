import { exclude } from "../modules";

describe("Transpilation excludes", () => {
  it("should exclude webpack from transpilation", () => {
    const paths = [
      "../webpack",
      "node_modules/webpack",
      "node_modules/webpack/",
      "node_modules/webpack/internal.js",
    ];
    for (const path of paths) {
      expect(exclude.some((regex) => regex.exec(path))).toBe(true);
      expect(
        exclude.some((regex) => regex.exec(path.replace(/\//g, "\\")))
      ).toBe(true);
    }
  });

  it("should exclude core-js from transpilation", () => {
    const paths = [
      "../core-js",
      "node_modules/core-js",
      "node_modules/core-js/",
      "node_modules/core-js/internal.js",
    ];
    for (const path of paths) {
      expect(exclude.some((regex) => regex.exec(path))).toBe(true);
      expect(
        exclude.some((regex) => regex.exec(path.replace(/\//g, "\\")))
      ).toBe(true);
    }
  });

  it("should exclude regenerator-runtime from transpilation", () => {
    const paths = [
      "../regenerator-runtime",
      "node_modules/regenerator-runtime",
      "node_modules/regenerator-runtime/",
      "node_modules/regenerator-runtime/internal.js",
    ];
    for (const path of paths) {
      expect(exclude.some((regex) => regex.exec(path))).toBe(true);
      expect(
        exclude.some((regex) => regex.exec(path.replace(/\//g, "\\")))
      ).toBe(true);
    }
  });

  it("should not exclude package with webpack names from transpilation", () => {
    const paths = [
      "../my-webpack-package",
      "node_modules/my-webpack-package",
      "node_modules/my-webpack-package/",
      "node_modules/my-webpack-package/internal.js",
    ];
    for (const path of paths) {
      expect(exclude.some((regex) => regex.exec(path))).toBe(false);
      expect(
        exclude.some((regex) => regex.exec(path.replace(/\//g, "\\")))
      ).toBe(false);
    }
  });
});

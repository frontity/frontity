import { exclude } from "../modules";

describe("Transpilation excludes", () => {
  it("should exclude webpack from transpilation (Unix)", () => {
    expect(exclude.some((regex) => regex.exec("../webpack"))).toBe(true);
    expect(exclude.some((regex) => regex.exec("node_modules/webpack"))).toBe(
      true
    );
    expect(exclude.some((regex) => regex.exec("node_modules/webpack/"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules/webpack/internal.js"))
    ).toBe(true);
  });

  it("should exclude webpack from transpilation (Windows)", () => {
    expect(exclude.some((regex) => regex.exec("..\\webpack"))).toBe(true);
    expect(exclude.some((regex) => regex.exec("node_modules\\webpack"))).toBe(
      true
    );
    expect(exclude.some((regex) => regex.exec("node_modules\\webpack\\"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules\\webpack\\internal.js"))
    ).toBe(true);
  });

  it("should exclude core-js from transpilation (Unix)", () => {
    expect(exclude.some((regex) => regex.exec("../core-js"))).toBe(true);
    expect(exclude.some((regex) => regex.exec("node_modules/core-js"))).toBe(
      true
    );
    expect(exclude.some((regex) => regex.exec("node_modules/core-js/"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules/core-js/internal.js"))
    ).toBe(true);
  });

  it("should exclude core-js from transpilation (Windows)", () => {
    expect(exclude.some((regex) => regex.exec("..\\core-js"))).toBe(true);
    expect(exclude.some((regex) => regex.exec("node_modules\\core-js"))).toBe(
      true
    );
    expect(exclude.some((regex) => regex.exec("node_modules\\core-js\\"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules\\core-js\\internal.js"))
    ).toBe(true);
  });

  it("should exclude regenerator-runtime from transpilation (Unix)", () => {
    expect(exclude.some((regex) => regex.exec("../regenerator-runtime"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules/regenerator-runtime"))
    ).toBe(true);
    expect(
      exclude.some((regex) => regex.exec("node_modules/regenerator-runtime/"))
    ).toBe(true);
    expect(
      exclude.some((regex) =>
        regex.exec("node_modules/regenerator-runtime/internal.js")
      )
    ).toBe(true);
  });

  it("should exclude regenerator-runtime from transpilation (Windows)", () => {
    expect(exclude.some((regex) => regex.exec("..\\regenerator-runtime"))).toBe(
      true
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules\\regenerator-runtime"))
    ).toBe(true);
    expect(
      exclude.some((regex) => regex.exec("node_modules\\regenerator-runtime\\"))
    ).toBe(true);
    expect(
      exclude.some((regex) =>
        regex.exec("node_modules\\regenerator-runtime\\internal.js")
      )
    ).toBe(true);
  });

  it("should not exclude package with webpack names from transpilation (Unix)", () => {
    expect(exclude.some((regex) => regex.exec("../my-webpack-package"))).toBe(
      false
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules/my-webpack-package"))
    ).toBe(false);
    expect(
      exclude.some((regex) => regex.exec("node_modules/my-webpack-package/"))
    ).toBe(false);
    expect(
      exclude.some((regex) =>
        regex.exec("node_modules/my-webpack-package/internal.js")
      )
    ).toBe(false);
  });

  it("should not exclude package with webpack names from transpilation (Windows)", () => {
    expect(exclude.some((regex) => regex.exec("..\\my-webpack-package"))).toBe(
      false
    );
    expect(
      exclude.some((regex) => regex.exec("node_modules\\my-webpack-package"))
    ).toBe(false);
    expect(
      exclude.some((regex) => regex.exec("node_modules\\my-webpack-package\\"))
    ).toBe(false);
    expect(
      exclude.some((regex) =>
        regex.exec("node_modules\\my-webpack-package\\internal.js")
      )
    ).toBe(false);
  });
});

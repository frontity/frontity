import ignore from "../ts-node-ignore";

const ignoreRegExp = new RegExp(ignore[0]);

describe("ts-node ignores", () => {
  it("should ignore javascript files inside node_modules", () => {
    expect(ignoreRegExp.test("node_modules/index.js")).toBe(true);
    expect(ignoreRegExp.test("node_modules/some-package/index.js")).toBe(true);
    expect(ignoreRegExp.test("node_modules/@org/some-package/index.js")).toBe(
      true
    );
    expect(
      ignoreRegExp.test("node_modules/@org/some-package/folder/index.js")
    ).toBe(true);
  });

  it("should not ignore typescript files", () => {
    expect(ignoreRegExp.test("index.ts")).toBe(false);
    expect(ignoreRegExp.test("node_modules/index.ts")).toBe(false);
    expect(ignoreRegExp.test("node_modules/some-package/index.ts")).toBe(false);
    expect(ignoreRegExp.test("node_modules/@org/some-package/index.ts")).toBe(
      false
    );
    expect(
      ignoreRegExp.test("node_modules/@org/some-package/folder/index.ts")
    ).toBe(false);
  });

  it("should not ignore frontity settings", () => {
    expect(ignoreRegExp.test("frontity.settings.js")).toBe(false);
    expect(ignoreRegExp.test("frontity.settings.ts")).toBe(false);
  });

  it("should not ignore javascript files outside node_modules", () => {
    expect(ignoreRegExp.test("index.js")).toBe(false);
    expect(ignoreRegExp.test("some-package/index.js")).toBe(false);
    expect(ignoreRegExp.test("@org/some-package/index.js")).toBe(false);
  });

  it("should not ignore frontity.config files", () => {
    expect(
      ignoreRegExp.test("node_modules/@org/some-package/frontity.config.js")
    ).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/some-package/frontity.config.js")
    ).toBe(false);
    expect(ignoreRegExp.test("some-package/frontity.config.js")).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/@org/some-package/frontity.config.ts")
    ).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/some-package/frontity.config.ts")
    ).toBe(false);
    expect(ignoreRegExp.test("some-package/frontity.config.ts")).toBe(false);
  });

  it("should not ignore packages from `@frontity`", () => {
    expect(
      ignoreRegExp.test("node_modules/@frontity/some-package/index.js")
    ).toBe(false);
    expect(ignoreRegExp.test("@frontity/some-package/index.js")).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/@frontity/some-package/index.ts")
    ).toBe(false);
    expect(ignoreRegExp.test("@frontity/some-package/index.ts")).toBe(false);
  });

  it("should not ignore packages with `frontity` in the name", () => {
    expect(
      ignoreRegExp.test("node_modules/@org/some-frontity-package/index.js")
    ).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/some-frontity-package/index.js")
    ).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/@org/some-frontity-package/index.ts")
    ).toBe(false);
    expect(
      ignoreRegExp.test("node_modules/some-frontity-package/index.ts")
    ).toBe(false);
  });
});

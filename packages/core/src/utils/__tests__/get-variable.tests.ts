import getVariable from "../get-variable";

describe("getVariable", () => {
  it("should generate different variable names for different packages", () => {
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org-package", "mode")
    );
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("org-package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("@org/package", "default")).not.toBe(
      getVariable("@org/package", "amp")
    );
  });
  it("should allow scopes starting with numbers", () => {
    expect(() =>
      eval("var " + getVariable("@123/package", "mode"))
    ).not.toThrow();
  });
});

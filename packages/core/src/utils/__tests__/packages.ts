import { getVariable } from "../packages";

describe("getVariable", () => {
  test("should generate different variable names for different packages", () => {
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org-package", "mode")
    );
    expect(getVariable("@org/package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("org-package", "mode")).not.toBe(
      getVariable("org.package", "mode")
    );
    expect(getVariable("@org/package", "html")).not.toBe(
      getVariable("@org/package", "amp")
    );
  });
});

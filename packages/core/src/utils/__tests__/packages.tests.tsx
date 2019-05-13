import React from "react";
import { getVariable, mergePackages } from "../packages";

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
    expect(getVariable("@org/package", "html")).not.toBe(
      getVariable("@org/package", "amp")
    );
  });
});

describe("mergePackages", () => {
  const state = {
    frontity: {
      mode: "html",
      packages: ["package-1", "package-2", "package-3"]
    }
  };
  const packages = {
    package_1_html: {
      roots: {
        namespace1: () => <div>"namespace1"</div>,
        namespace2: () => <div>"namespace2"</div>
      },
      state: {
        namespace1: {
          prop1: "prop1"
        },
        namespace2: {
          prop2: "prop2"
        }
      }
    },
    package_2_html: {
      roots: {
        namespace3: () => <div>"namespace3"</div>
      },
      state: {
        namespace1: {
          prop1: "prop1 overwritten by package_2"
        },
        namespace3: {
          prop3: "prop3"
        }
      },
      libraries: {
        namespace3: {
          lib1: "lib1"
        }
      }
    },
    package_3_html: ({ libraries }) => ({
      roots: {
        namespace4: () => <div>"namespace4"</div>
      },
      state: {
        namespace4: {
          prop4: "prop4",
          prop5: () => libraries.namespace3.lib1
        }
      }
    })
  };

  it("should output a merged packages", () => {
    const merged = mergePackages({ packages, state });
    expect(merged).toMatchSnapshot();
  });

  it("should get access to libraries", () => {
    const merged = mergePackages({ packages, state });
    expect(merged.state.namespace4.prop5()).toBe("lib1");
  });
});

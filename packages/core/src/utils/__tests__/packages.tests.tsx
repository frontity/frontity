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
      packages: ["package-1", "package-2"]
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
      }
    }
  };

  it("should output a merged packages", () => {
    expect(mergePackages({ packages, state })).toMatchSnapshot();
  });
});

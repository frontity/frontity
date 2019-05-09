import React from "react";
import { getVariable, packageList, mergePackages } from "../packages";
import { NormalizedSettings } from "@frontity/file-settings/src";

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

describe("packageList", () => {
  const settings: NormalizedSettings = {
    name: "site",
    mode: "html",
    state: {},
    packages: [
      {
        name: "package1",
        active: true,
        state: {}
      },
      {
        name: "package2",
        active: true,
        state: {}
      }
    ]
  };
  it("should output a list of packages", () => {
    expect(packageList({ settings })).toMatchSnapshot();
  });
});

describe("mergePackages", () => {
  const state = {
    frontity: {
      packages: [
        {
          name: "package-1",
          variable: "package_1"
        },
        {
          name: "package-2",
          variable: "package_2"
        }
      ]
    }
  };
  const packages = {
    package_1: {
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
    package_2: {
      roots: {
        namespace3: () => <div>"namespace3"</div>
      },
      state: {
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

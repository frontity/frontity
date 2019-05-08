import React from "react";
import { getVariable, packageList, mergePackages } from "../packages";
import { NormalizedSettings } from "@frontity/file-settings/src";

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

describe("packageList", () => {
  const settings: NormalizedSettings = {
    name: "site",
    mode: "html",
    settings: {
      language: "en",
      timezone: 1
    },
    packages: [
      {
        name: "package1",
        active: true,
        exclude: ["namespace1", "namespace2"],
        settings: {}
      },
      {
        name: "package2",
        active: true,
        exclude: ["namespace3", "namespace4"],
        settings: {}
      }
    ]
  };
  test("should a list of packages with its excludes", () => {
    expect(packageList({ settings })).toMatchSnapshot();
  });
});

describe("mergePackages", () => {
  const state = {
    settings: {
      frontity: {
        packages: [
          {
            name: "package-1",
            variable: "package_1",
            exclude: ["namespace1"]
          },
          {
            name: "package-2",
            variable: "package_2",
            exclude: []
          }
        ]
      }
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
          prop1: 1
        },
        namespace2: {
          prop2: 2
        }
      }
    },
    package_2: {
      roots: {
        namespace3: () => <div>"namespace3"</div>
      },
      state: {
        namespace3: {
          prop3: 3
        }
      }
    }
  };
  test("should a list of packages with its excludes", () => {
    expect(mergePackages({ packages, state })).toMatchSnapshot();
  });
});

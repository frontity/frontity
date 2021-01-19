/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name, @typescript-eslint/camelcase */

import mergePackages from "../merge-packages";

class MyLib {
  init() {
    return "initialized";
  }
}

const state = {
  frontity: {
    debug: false,
    mode: "html",
    packages: ["package-1", "package-2", "package-3"],
  },
};

const packages = {
  package_1_html: {
    name: "package1",
    roots: {
      namespace1: () => <div>namespace1</div>,
      namespace2: () => <div>namespace2</div>,
    },
    state: {
      frontity: {
        debug: true,
      },
      namespace1: {
        prop1: "prop1",
        array1: ["item1"],
      },
      namespace2: {
        prop2: "prop2",
      },
    },
    actions: {
      namespace1: {
        action1: () => {},
      },
    },
  },
  package_2_html: {
    name: "package2",
    roots: {
      namespace3: () => <div>namespace3</div>,
    },
    state: {
      namespace1: {
        prop1: "prop1 overwritten by package_2",
        array1: ["item2", "item3"],
      },
      namespace3: {
        prop3: "prop3",
      },
    },
    actions: {
      namespace1: {
        action2: () => () => {},
      },
    },
    libraries: {
      namespace3: {
        lib1: "lib1",
        lib2: new MyLib(),
      },
    },
  },
  package_3_html: () => ({
    name: "package3",
    roots: {
      namespace4: () => <div>namespace4</div>,
    },
    state: {
      namespace4: {
        prop4: "prop4",
      },
    },
    libraries: {
      namespace4: {
        lib2: "lib2",
      },
    },
  }),
};

describe("mergePackages", () => {
  it("should output a merged packages", () => {
    const merged = mergePackages({ packages, state });
    expect(merged).toMatchSnapshot();
  });

  it("should output allow complex object like class instances", () => {
    const merged = mergePackages({ packages, state });
    expect(merged.libraries.namespace3.lib2.init()).toBe("initialized");
  });

  it("should deep clone state", () => {
    const merged = mergePackages({ packages, state });
    expect(state.frontity).not.toBe(merged.state.frontity);
    expect(packages.package_2_html.state.namespace3).not.toBe(
      merged.state.namespace3
    );
  });

  it("should overwrite arrays if the 'overwriteArrays' option is true", () => {
    const { state: initialState } = mergePackages({ packages, state });
    const merged = mergePackages({
      packages,
      state: initialState,
      overwriteArrays: true,
    });
    expect(merged.state.namespace1.array1).toEqual(["item1", "item2", "item3"]);
  });

  it("should deep clone state if the 'overwriteArrays' option is true", () => {
    const merged = mergePackages({ packages, state, overwriteArrays: true });
    expect(state.frontity).not.toBe(merged.state.frontity);
    expect(packages.package_2_html.state.namespace3).not.toBe(
      merged.state.namespace3
    );
  });

  it("should not use debug mode in production", () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const merged = mergePackages({ packages, state, overwriteArrays: true });
    expect(merged.state.frontity.debug).toBe(false);
    process.env.NODE_ENV = nodeEnv;
  });
});

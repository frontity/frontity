import Package from "../package";
import { Action, AsyncAction } from "../action";
import Derived from "../derived";
import MergePackages from "../merge-packages";
import { expectType } from "../../helpers";

interface Package1 extends Package {
  name: "package-1";
  state: {
    namespace1: {
      prop1: string;
      prop2: Derived<Packages, string>;
    };
  };
  actions: {
    namespace1: {
      action1: Action<Packages>;
    };
  };
}

interface Package2 extends Package {
  name: "package-2";
  state: {
    namespace2: {
      prop3: Derived<Package2, boolean>;
    };
  };
  actions: {
    namespace2: {
      action2: Action<Package2, string>;
      action3: AsyncAction<Package2, string>;
    };
  };
  libraries: {
    namespace1: {
      library1: () => void;
    };
  };
}

interface Package3 extends Package {
  name: "package-3";
  state: {
    namespace3: {
      prop4: Derived<Package3, string, boolean>;
    };
  };
  libraries: {
    namespace1: {
      library2: () => void;
    };
  };
}

type Packages = MergePackages<Package1, Package2, Package3>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const packages: Package1 = {
  name: "package-1",
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: ({ state, actions, libraries }) => {
        // Test merged state.
        expectType<string>(state.namespace1.prop1);
        expectType<string>(state.namespace1.prop2);
        expectType<boolean>(state.namespace2.prop3);
        expectType<(str: string) => boolean>(state.namespace3.prop4);

        // Test merged actions.
        expectType<() => void>(actions.namespace1.action1);
        expectType<(str: string) => void>(actions.namespace2.action2);
        expectType<(str: string) => Promise<void>>(actions.namespace2.action3);

        // Test merged libraries
        expectType<() => void>(libraries.namespace1.library1);
        expectType<() => void>(libraries.namespace1.library2);

        return "";
      },
    },
  },
  actions: {
    namespace1: {
      action1: ({ state, actions, libraries }) => {
        // Test merged state.
        expectType<string>(state.namespace1.prop1);
        expectType<string>(state.namespace1.prop2);
        expectType<boolean>(state.namespace2.prop3);
        expectType<(str: string) => boolean>(state.namespace3.prop4);

        // Test merged actions.
        expectType<() => void>(actions.namespace1.action1);
        expectType<(str: string) => void>(actions.namespace2.action2);
        expectType<(str: string) => Promise<void>>(actions.namespace2.action3);

        // Test merged libraries
        expectType<() => void>(libraries.namespace1.library1);
        expectType<() => void>(libraries.namespace1.library2);
      },
    },
  },
};

describe("MergePackages", () => {
  // eslint-disable-next-line jest/expect-expect
  it("generates the correct types", () => {
    // Tested in package1 definition.
  });
});

import Settings from "../settings";
import Package from "../package";
import Action from "../action";
import Derived from "../derived";
import Namespaces from "../namespaces";

// Custom package extending from Package.
interface Package1 extends Package {
  name: "package-1";
  namespaces?: Namespaces<"namespace1" | "namespace2">;
  state: {
    settings: {
      namespace1: {
        prop1: string;
      };
    };
    namespace1: {
      prop2: Derived<Package1, string>;
    };
    namespace2: {
      prop3: string;
      nested1: {
        prop4: Derived<Package1, string, number>;
      };
    };
  };
  actions: {
    namespace1: {
      action1: Action<Package1>;
    };
    namespace2: {
      action2: Action<Package1, string>;
    };
  };
  libraries: {
    namespace1: {
      library1: () => void;
    };
  };
}

// Package1 implementation.
const package1: Package1 = {
  name: "package-1",
  state: {
    settings: {
      namespace1: {
        prop1: "prop1"
      }
    },
    namespace1: {
      prop2: state => ""
    },
    namespace2: {
      prop3: "prop3",
      nested1: {
        prop4: state => str => 1
      }
    }
  },
  actions: {
    namespace1: {
      action1: state => {}
    },
    namespace2: {
      action2: state => str => {
        str.startsWith("");
      }
    }
  },
  libraries: {
    namespace1: {
      library1: () => {}
    }
  }
};

// Settings from Package1.
const package2: Settings<Package1> = {
  packages: [
    {
      name: "package-1"
    }
  ]
};

// Two different settings extending from Package.
interface Package2 extends Package {
  name: "package-2";
  namespaces?: Namespaces<"namespace2" | "namespace3">;
  state: {
    settings: {
      namespace2: {
        prop2: string;
        prop3?: number;
      };
      namespace3: {
        prop4: boolean;
      };
    };
  };
}

const package3: Settings<Package1 | Package2> = {
  packages: [
    {
      name: "package-1",
      exclude: ["namespace1"],
      settings: {
        namespace1: {
          prop1: ""
        }
      }
    },
    {
      name: "package-2",
      exclude: ["namespace2", "namespace3"],
      settings: {
        namespace2: {
          prop2: ""
        }
      }
    }
  ]
};

test("Types are fine!", () => {});

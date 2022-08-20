import Settings from "../settings";
import Package from "../package";
import { Action, AsyncAction } from "../action";
import Derived from "../derived";
import { Server, AsyncServer } from "../server";

// Custom package extending from Package.
interface Package1 extends Package {
  name: "package-1";
  state: {
    namespace1: {
      prop1: string;
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
      action2: AsyncAction<Package1>;
    };
    namespace2: {
      action3: Action<Package1, string>;
      action4: AsyncAction<Package1, string>;
    };
  };
  libraries: {
    namespace1: {
      library1: () => void;
    };
  };
  server: {
    namespace1: {
      server1: Server<Package1>;
      server2: AsyncServer<Package1>;
    };
  };
}

// Package1 implementation.
const package1: Package1 = {
  name: "package-1",
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: ({ state }) => "",
    },
    namespace2: {
      prop3: "prop3",
      nested1: {
        prop4: ({ state }) => (str) => 1,
      },
    },
  },
  actions: {
    namespace1: {
      action1: ({ state, actions, libraries }) => {},
      action2: async ({ state, actions, libraries }) => {},
    },
    namespace2: {
      action3: ({ state }) => (str) => {
        str.startsWith("");
      },
      action4: ({ state }) => async (str) => {
        str.startsWith("");
      },
    },
  },
  libraries: {
    namespace1: {
      library1: () => {},
    },
  },
  server: {
    namespace1: {
      server1: ({ ctx, next, state, actions, libraries, server }, next2) => {},
      server2: async (
        { ctx, next, state, actions, libraries, server },
        next2
      ) => {},
    },
  },
};

// Settings from Package1.
const package2: Settings<Package1> = {
  packages: [
    {
      name: "package-1",
    },
  ],
};

// Two different settings extending from Package.
interface Package2 extends Package {
  name: "package-2";
  state: {
    namespace2: {
      prop2: string;
      prop3?: number;
    };
    namespace3: {
      prop4: boolean;
    };
  };
}

const package3: Settings<Package1 | Package2> = {
  packages: [
    {
      name: "package-1",
      state: {
        namespace1: {
          prop1: "",
        },
      },
    },
    {
      name: "package-2",
      state: {
        namespace2: {
          prop2: "",
        },
      },
    },
  ],
};

test("Types are fine!", () => {});

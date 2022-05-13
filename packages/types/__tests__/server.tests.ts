import { Action, AsyncAction } from "../action";
import { Server, AsyncServer } from "../server";
import Package from "../package";
import Derived from "../derived";

interface Package1 extends Package {
  name: "package-1";
  state: {
    namespace1: {
      prop1: string;
      prop2: number;
      prop3: Derived<Package1, string>;
      prop4: Derived<Package1, string, number>;
      array1: string[];
      nested1: {
        prop5: Derived<Package1, string, number>;
        array2: number[];
        nested2: {
          prop6: Derived<Package1, string>;
        };
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
      action4: AsyncAction<Package1, number>;
      action5: Action<Package1, number, string, number, string, number, string>;
      action6: Action<Package, number> | Action<Package, number, string>;
    };
  };
  libraries: {
    namespace1: {
      lib1: string;
    };
  };
  server: {
    namespace1: {
      server1: Server<Package1>;
      server2: AsyncServer<Package1>;
    };
    namespace2: {
      server3: Server<Package1>;
      server4: AsyncServer<Package1>;
    };
  };
}

const package1: Package1 = {
  name: "package-1",
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: 2,
      prop3: ({ state }) => state.namespace1.prop1,
      prop4: ({ state }) => (str) => str.length + state.namespace1.prop2,
      array1: ["item1", "item2"],
      nested1: {
        prop5: ({ state }) => (str) => str.length + state.namespace1.prop2,
        array2: [3, 4],
        nested2: {
          prop6: ({ state }) => state.namespace1.prop1,
        },
      },
    },
  },
  actions: {
    namespace1: {
      // Action without params.
      action1: () => {},
      // Async Action without params.
      action2: async () => {},
    },
    namespace2: {
      // Action with params.
      action3: () => (str) => {},
      // Async Action with params.
      action4: () => async (num) => {},
      // Action with mutilple parameters.
      action5: () => (num1, str1, num2, str2, num3, str3) => {},
      // Action with optional parameters.
      action6: () => (num, str) => {},
    },
  },
  libraries: {
    namespace1: {
      lib1: "lib1",
    },
  },
  server: {
    namespace1: {
      server1: ({ ctx, state, actions, libraries, server, next }, next2) => {
        // Can access and modify Koa ctx.
        const status: number = ctx.status;
        ctx.status = 418;

        // Can modify state.
        state.namespace1.prop1 = "newProp";
        state.namespace1.prop2 = 3;

        state.namespace1.prop3 = "asdf";

        // Check that prop3 is a string (and not a function).
        const str1: string = state.namespace1.prop3;

        // Check that prop4 returns a number (and not a function).
        const num1: number = state.namespace1.prop4("123");

        // Check that nested derived state functions are processed correctly.
        const num2: number = state.namespace1.nested1.prop5("123");

        // Check that nested nested derived state is processed correctly.
        const str2: string = state.namespace1.nested1.nested2.prop6;

        // Check that arrays are fine.
        state.namespace1.array1.map((item: string): string => item);

        // Check that nested arrays are fine.
        state.namespace1.nested1.array2.map((item: number): number => item + 1);

        // Check that actions are accesible.
        actions.namespace1.action2();
        actions.namespace2.action3("123");

        // Check that libraries are accesible.
        const str3: string = libraries.namespace1.lib1;

        // Check that actions with multiple parameters work.
        actions.namespace2.action5(1, "2", 3, "4", 5, "6");

        // Check that actions with optional parameters work.
        actions.namespace2.action6(1);
        actions.namespace2.action6(1, "2");

        // Check that other server middleware is accessible.
        server.namespace1.server2(ctx, next);
        server.namespace1.server2({ ...ctx, ctx, next: next2 }, next);
        server.namespace2.server3(ctx, next);
      },
      server2: async ({ ctx, server, next }, next2) => {
        // Check that can await next.
        await next();
        await next2();

        // Check that can await other middleware.
        await server.namespace2.server4(ctx, next);
      },
    },
    namespace2: {
      server3: () => {},
      server4: async () => {},
    },
  },
};

test("Types are fine!", () => {});

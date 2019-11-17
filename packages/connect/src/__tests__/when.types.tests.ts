/* eslint-disable @typescript-eslint/no-unused-vars */
import { Store, Derived, AsyncAction } from "../../types";

interface MyStore extends Store {
  state: {
    namespace: {
      prop1: string;
      derived1: Derived<MyStore, number>;
    };
  };
  actions: {
    namespace: {
      action1: AsyncAction<MyStore>;
      action2: AsyncAction<MyStore, boolean>;
    };
  };
}

const store: MyStore = {
  state: {
    namespace: {
      prop1: "prop1",
      derived1: ({ state }) => state.namespace.prop1.length
    }
  },
  actions: {
    namespace: {
      action1: async ({ when }) => {
        const result: boolean = await when<MyStore, boolean>(
          ({ state }) => state.namespace.prop1 === "prop1"
        );
      },
      action2: ({ when }) => async bool => {
        const result: boolean = await when<MyStore, boolean>(
          ({ state }) => state.namespace.derived1 > 0
        );
      }
    }
  }
};

test("Types are fine!", () => {});

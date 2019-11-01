/* eslint-disable @typescript-eslint/no-unused-vars */
import { Store, Derived, Action, AsyncAction } from "../../types";

interface MyStore extends Store {
  state: {
    namespace1: {
      prop1: string;
      prop2: number;
      prop3: Derived<MyStore, string>;
      prop4: Derived<MyStore, string, number>;
      prop5: Derived<MyStore, string, number, string>;
      prop6: Derived<
        MyStore,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string,
        number
      >;
      array1: { name: string }[];
      nested1: {
        prop5: Derived<MyStore, string, number>;
        array2: number[];
        nested2: {
          prop6: Derived<MyStore, string>;
        };
      };
    };
    notNamespacedProp: string;
  };
  actions: {
    namespace1: {
      action1: Action<MyStore>;
      action2: AsyncAction<MyStore>;
    };
    namespace2: {
      action3: Action<MyStore, string>;
      action4: AsyncAction<MyStore, number>;
    };
    namespace3: {
      action5: Action<
        MyStore,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string
      >;
      action6: AsyncAction<
        MyStore,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string,
        number,
        string
      >;
    };
    notNamespacedAction: Action<MyStore>;
  };
}

const actions: MyStore["actions"] = {
  namespace1: {
    // Action without params.
    action1: ({ state, actions }) => {
      // Check mutations.
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
      state.namespace1.array1.map(
        (item: { name: string }): { name: string } => item
      );

      // Check that nested arrays are fine.
      state.namespace1.nested1.array2.map((item: number): number => item + 1);

      // Check that actions are accesible.
      actions.notNamespacedAction();
      actions.namespace1.action1();

      // Check that async actions can be awaited.
      actions.namespace1.action2().then();

      // Check action with one param.
      actions.namespace2.action3("123");

      // Check actions with one param can be awaited.
      actions.namespace2.action4(123).then();

      // Check actions with multiple params.
      actions.namespace3.action5(1, "2", 3, "4", 5, "6", 7, "8", 9, "10");

      // Check actions with multiple params can be awaited.
      actions.namespace3
        .action6(1, "2", 3, "4", 5, "6", 7, "8", 9, "10")
        .then();
    },
    // Async Action without params.
    action2: async ({ state, actions }) => {
      await actions.namespace2.action4(123);
    }
  },
  namespace2: {
    // Action with params.
    action3: ({ state }) => str => {
      state.namespace1.prop1 = str;
      const str1: string = state.namespace1.prop3 + str;
      const num1: number = state.namespace1.prop4(str);
    },
    // Async Action with params.
    action4: ({ state, actions }) => async num => {
      state.namespace1.prop2 = num;
      const num1: number = state.namespace1.prop4("123") + num;
      const num2: number = state.namespace1.nested1.prop5("123") + num;
      await actions.namespace1.action2();
    }
  },
  namespace3: {
    // Action with 10 params.
    action5: ({ state }) => (
      index1,
      string2,
      index3,
      string4,
      index5,
      string6,
      index7,
      string8,
      index9,
      string10
    ) => {
      const index: number = index1 + index3 + index5 + index7 + index9;
      const string: string = string2 + string4 + string6 + string8 + string10;
      const num1: number = state.namespace1.prop2 + index;
      const num2: number = state.namespace1.prop4(string);
    },
    // Async Action with 10 params.
    action6: ({ state }) => async (
      index1,
      string2,
      index3,
      string4,
      index5,
      string6,
      index7,
      string8,
      index9,
      string10
    ) => {
      const index: number = index1 + index3 + index5 + index7 + index9;
      await Promise.resolve();
      const string: string = string2 + string4 + string6 + string8 + string10;
      await Promise.resolve();
      const num1: number = state.namespace1.prop2 + index;
      await Promise.resolve();
      const num2: number = state.namespace1.prop4(string);
    }
  },
  notNamespacedAction: ({ state, actions }) => {
    // Check access to state.
    const str: string = state.namespace1.prop1;
    // Check access to actions.
    actions.namespace1.action1();
  }
};

test("Types are fine!", () => {});

import Action from "../action";
import Package from "../package";
import Derived from "../derived";

interface Package1 extends Package {
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
      action2: Action<Package1>;
    };
    namespace2: {
      action3: Action<Package1, string>;
      action4: Action<Package1, number>;
    };
  };
}

const package1: Package1 = {
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: 2,
      prop3: state => state.namespace1.prop1,
      prop4: state => str => str.length + state.namespace1.prop2,
      array1: ["item1", "item2"],
      nested1: {
        prop5: state => str => str.length + state.namespace1.prop2,
        array2: [3, 4],
        nested2: {
          prop6: state => state.namespace1.prop1
        }
      }
    }
  },
  actions: {
    namespace1: {
      // Action without params.
      action1: state => {
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
      },
      // Async Action without params.
      action2: async state => {
        state.namespace1.prop1 = "newProp";
        await Promise.resolve();
        const str1: string = state.namespace1.prop3;
        await Promise.resolve();
        const num1: number = state.namespace1.prop4("123");
      }
    },
    namespace2: {
      // Action with params.
      action3: state => str => {
        state.namespace1.prop1 = str;
        const str1: string = state.namespace1.prop3 + str;
        const num1: number = state.namespace1.prop4(str);
      },
      // Async Action with params.
      action4: state => async num => {
        state.namespace1.prop2 = num;
        await Promise.resolve();
        const num1: number = state.namespace1.prop4("123") + num;
        await Promise.resolve();
        const num2: number = state.namespace1.nested1.prop5("123") + num;
      }
    }
  }
};

test("Types are fine!", () => {});

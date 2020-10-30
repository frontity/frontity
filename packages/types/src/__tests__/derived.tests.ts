import Package from "../package";
import Derived from "../derived";

interface Package1 extends Package {
  state: {
    namespace1: {
      prop1: string;
      prop2: number;
      prop3: Derived<Package1, string>;
      prop4: Derived<Package1, string, number>;
      unionDerivedProp1: Derived<Package1, string> | string;
      unionDerivedProp2: Derived<Package1, string> | string;
      nested1: {
        prop5: Derived<Package1, string, number>;
        nested2: {
          prop6: Derived<Package1, string>;
        };
      };
    };
  };
}

const package1: Package1 = {
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: 2,
      // Check that prop3 is a string (and not a function).
      prop3: ({ state }) => state.namespace1.prop3,
      // Check that prop4 returns a number (and not a function).
      prop4: ({ state }) => (str) => state.namespace1.nested1.prop5(str),
      unionDerivedProp1: ({ state }) => state.namespace1.prop1,
      unionDerivedProp2: "A string works as well",
      nested1: {
        // Check that nested derived state functions are processed correctly.
        prop5: ({ state }) => (str) => state.namespace1.prop4(str),
        nested2: {
          // Check that nested nested derived state is processed correctly.
          prop6: ({ state }) => state.namespace1.prop1.toLowerCase(),
        },
      },
    },
  },
};

test("Types are fine!", () => {});

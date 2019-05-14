import State from "../state";
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
}

const state1: State<Package1> = {
  namespace1: {
    prop1: "prop1",
    prop2: 2,
    prop3: "prop3",
    prop4: str => {
      const str2: string = str;
      return 4;
    },
    array1: ["item1", "item2"],
    nested1: {
      prop5: str => {
        const str2: string = str;
        return 5;
      },
      array2: [3, 4],
      nested2: {
        prop6: "prop6"
      }
    }
  }
};

test("Types are fine!", () => {});

import Connect from "../connect";
import { FilterInjectedProps } from "../utils";
import Action from "../action";
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
      action2: Action<Package1>;
    };
    namespace2: {
      action3: Action<Package1, string>;
      action4: Action<Package1, number>;
    };
  };
  libraries: {
    namespace3: {
      library1: () => void;
    };
  };
}

interface OwnProps {
  ownProp1: string;
  name: string;
}

const internalProps: Connect<Package1, OwnProps> = {
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: 2,
      prop3: "prop3",
      prop4: str => str.length,
      array1: ["array1"],
      nested1: {
        prop5: str => str.length,
        array2: [2],
        nested2: {
          prop6: "prop6"
        }
      }
    }
  },
  actions: {
    namespace1: {
      action1: () => {},
      action2: () => {}
    },
    namespace2: {
      action3: str => {
        const str2: string = str;
      },
      action4: num => {
        const num2: number = num;
      }
    }
  },
  libraries: {
    namespace3: {
      library1: () => {}
    }
  },
  ownProp1: "ownProp1",
  name: "nameProp"
};

const externalProps: FilterInjectedProps<Connect<Package1, OwnProps>> = {
  ownProp1: "ownProp1",
  name: "nameProp"
};

test("Types are fine!", () => {});

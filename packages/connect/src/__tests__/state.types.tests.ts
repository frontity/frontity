/* eslint-disable @typescript-eslint/no-unused-vars */
import { Store, State, Derived } from "../../types";

interface MyStore extends Store {
  state: {
    namespace: {
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
}

const state: MyStore["state"] = {
  namespace: {
    prop1: "prop1",
    prop2: 2,
    prop3: ({ state }) => state.namespace.prop1,
    prop4: ({ state }) => str => {
      const str2: string = str;
      return state.namespace.prop2;
    },
    prop5: ({ state }) => (str, num) => {
      const str2: string = str;
      const num2: number = num;
      return state.namespace.prop1;
    },
    prop6: ({ state }) => (
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
      return state.namespace.prop2;
    },
    array1: [{ name: "item1" }, { name: "item2" }],
    nested1: {
      prop5: ({ state }) => str => {
        const str2: string = str;
        return state.namespace.prop2;
      },
      array2: [3, 4],
      nested2: {
        prop6: ({ state }) => state.notNamespacedProp
      }
    }
  },
  notNamespacedProp: "notNamespacedProp"
};

const proxifiedState: State<MyStore> = {
  namespace: {
    prop1: "prop1",
    prop2: 2,
    prop3: "prop3",
    prop4: str => {
      const str2: string = str;
      return 4;
    },
    prop5: (str, num) => {
      const str2: string = str;
      const num2: number = num;
      return "5";
    },
    prop6: (
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
      return 6;
    },
    array1: [{ name: "item1" }, { name: "item2" }],
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
  },
  notNamespacedProp: "notNamespacedProp"
};

test("Types are fine!", () => {});

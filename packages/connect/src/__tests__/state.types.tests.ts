/* eslint-disable @typescript-eslint/no-unused-vars */
import { StoreType, ObservableState, Derived, MutableState } from "../../types";

interface MyStore extends StoreType {
  state: {
    namespace: {
      prop1: string;
      prop2: number;
      derived3: Derived<MyStore, string>;
      derived4: Derived<MyStore, string, number>;
      derived5: Derived<MyStore, string, number, string>;
      derived6: Derived<
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
        derived7: Derived<MyStore, string, number>;
        array2: number[];
        nested2: {
          derived8: Derived<MyStore, string>;
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
    derived3: ({ state }) => state.namespace.prop1,
    derived4: ({ state }) => str => {
      const str2: string = str;
      return state.namespace.prop2;
    },
    derived5: ({ state }) => (str, num) => {
      const str2: string = str;
      const num2: number = num;
      return state.namespace.prop1;
    },
    derived6: ({ state }) => (
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
      derived7: ({ state }) => str => {
        const str2: string = str;
        return state.namespace.prop2;
      },
      array2: [3, 4],
      nested2: {
        derived8: ({ state }) => state.notNamespacedProp
      }
    }
  },
  notNamespacedProp: "notNamespacedProp"
};

const observableState: ObservableState<MyStore> = {
  namespace: {
    prop1: "prop1",
    prop2: 2,
    derived3: "derived3",
    derived4: str => {
      const str2: string = str;
      return 4;
    },
    derived5: (str, num) => {
      const str2: string = str;
      const num2: number = num;
      return "5";
    },
    derived6: (
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
      derived7: str => {
        const str2: string = str;
        return 5;
      },
      array2: [3, 4],
      nested2: {
        derived8: "derived8"
      }
    }
  },
  notNamespacedProp: "notNamespacedProp"
};

// This type should fail.
// observableState.namespace.prop2 = 2;

const mutableState: MutableState<MyStore> = {
  namespace: {
    prop1: "prop1",
    prop2: 2,
    derived3: "derived3",
    derived4: str => {
      const str2: string = str;
      return 4;
    },
    derived5: (str, num) => {
      const str2: string = str;
      const num2: number = num;
      return "5";
    },
    derived6: (
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
      derived7: str => {
        const str2: string = str;
        return 5;
      },
      array2: [3, 4],
      nested2: {
        derived8: "derived8"
      }
    }
  },
  notNamespacedProp: "notNamespacedProp"
};

mutableState.namespace.prop2 = 2;

// TODO: This type should fail because derived funtions should be readonly, but it doesn't yet.
mutableState.namespace.derived4 = str => {
  const str2: string = str;
  return 4;
};

test("Types are fine!", () => {});

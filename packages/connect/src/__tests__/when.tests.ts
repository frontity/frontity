import { proxifyActions, proxifyState } from "..";
import {
  Actions,
  Derived,
  Store,
  Action,
  State,
  WhenObserver
} from "../../types";
import { RAW } from "../symbols";

interface MyStore extends Store {
  state: {
    prop1: boolean;
    prop2: number;
    prop3: number;
    nested: {
      prop4: number;
      prop5: number;
    };
    prop6: string;
    derived1: Derived<MyStore, number>;
    array1: string[];
  };
  actions: {
    runWhen: Action<MyStore>;
  };
}

let rawStore: MyStore;
let actions: Actions<MyStore>;
let state: State<MyStore>;
let observer: WhenObserver<MyStore>;
let mockedObserver: jest.MockedFunction<typeof observer>;
let succeed: boolean;
let result: unknown;

beforeEach(() => {
  succeed = false;
  result = undefined;
  observer = undefined;
  mockedObserver = undefined;
  rawStore = {
    state: {
      prop1: false,
      prop2: 0,
      prop3: 0,
      nested: {
        prop4: 0,
        prop5: 0
      },
      prop6: "prop6",
      derived1: ({ state }) => state.prop2 + state.prop3,
      array1: []
    },
    actions: {
      runWhen: async ({ when }) => {
        result = await when(mockedObserver);
        succeed = true;
      }
    }
  };
  actions = proxifyActions(rawStore);
  state = proxifyState(rawStore);
});

describe("when observer resolution", () => {
  it("should run the observer function once", () => {
    observer = () => {};
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(mockedObserver.mock.calls.length).toBe(1);
  });

  it("should not resolve when returns false", () => {
    observer = () => false;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(undefined);
  });

  it("should not resolve when returns undefined", () => {
    observer = () => {};
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(undefined);
  });

  it("should resolve when returns true", () => {
    observer = () => true;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe(true);
  });

  it("should resolve when returns 0", () => {
    observer = () => 0;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe(0);
  });

  it("should resolve when returns null", () => {
    observer = () => null;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe(null);
  });

  it("should resolve when returns empty string", () => {
    observer = () => "";
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe("");
  });

  it("should resolve when returns truthy", () => {
    const array1 = [];
    observer = () => [];
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe(array1);

    const obj1 = {};
    observer = () => obj1;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(succeed).toBe(true);
    expect(result).toBe(obj1);
  });
});

describe("when state observer", () => {
  it("should observe basic properties", () => {
    let prop2: number;
    observer = ({ state }) => {
      prop2 = state.prop2;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop2).toBe(0);
    state.prop2 = 7;
    expect(prop2).toBe(7);
  });

  it("should resolve based on basic properties", () => {
    observer = ({ state }) => state.prop2 === 1;
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(mockedObserver.mock.calls.length).toBe(1);
    expect(succeed).toBe(undefined);
    expect(result).toBe(undefined);
    state.prop2 = 1;
    expect(mockedObserver.mock.calls.length).toBe(2);
    expect(succeed).toBe(true);
    expect(result).toBe(true);
  });

  it("should observe multiple properties", () => {
    let sum: number;
    observer = ({ state }) => {
      sum = state.prop2 + state.prop2 + state.prop3;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(sum).toBe(0);
    state.prop2 = state.prop3 = 7;
    expect(sum).toBe(21);
  });

  it("should handle multiple reactions", () => {
    let num1: number, num2: number;

    observer = ({ state }) => {
      num1 = state.prop2;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();

    observer = ({ state }) => {
      num2 = state.prop3;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();

    expect(num1).toBe(0);
    expect(num2).toBe(0);
    state.prop2 += 1;
    state.prop3 += 1;
    expect(num1).toBe(1);
    expect(num2).toBe(1);
  });

  it("should observe nested properties", () => {
    let prop4: number;
    observer = ({ state }) => {
      prop4 = state.nested.prop4;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop4).toBe(0);
    state.nested.prop4 = 8;
    expect(prop4).toBe(8);
  });

  it("should observe delete operations", () => {
    let prop1: boolean;
    observer = ({ state }) => {
      prop1 = state.prop1;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop1).toBe(false);
    delete state.prop1;
    expect(prop1).toBe(undefined);
  });

  it("should observe has operations", () => {
    let isProp1: boolean;
    observer = ({ state }) => {
      isProp1 = "prop1" in state;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(isProp1).toBe(true);
    delete state.prop1;
    expect(isProp1).toBe(false);
    state.prop1 = true;
    expect(isProp1).toBe(true);
  });

  it("shold observe derived values", () => {
    let derived1: number;
    observer = ({ state }) => {
      derived1 = state.derived1;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(derived1).toBe(0);
    state.prop2 = 3;
    expect(derived1).toBe(3);
    state.prop3 = 2;
    expect(derived1).toBe(5);
  });

  it("should observe iteration", () => {
    let str1: string;
    observer = ({ state }) => {
      str1 = state.array1.join(" ");
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(str1).toBe("");
    state.array1.push("Hello");
    state.array1.push("World!");
    expect(str1).toBe("Hello World!");
    state.array1.shift();
    expect(str1).toBe("World!");
  });

  it("should observe implicit array length changes", () => {
    let str1: string;
    observer = ({ state }) => {
      str1 = state.array1.join(" ");
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(str1).toBe("");
    state.array1[0] = "Hello";
    state.array1[1] = "World!";
    expect(str1).toBe("Hello World!");
    state.array1[3] = "Twice!";
    expect(str1).toBe("Hello World!  Twice!");
  });

  it("should observe sparse array mutations", () => {
    let str1: string;
    state.array1[1] = "World!";
    observer = ({ state }) => {
      str1 = state.array1.join(" ");
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(str1).toBe(" World!");
    state.array1[0] = "Hello";
    expect(str1).toBe("Hello World!");
    state.array1.pop();
    expect(str1).toBe("Hello");
  });

  it("should observe enumeration", () => {
    let num1: number;
    observer = ({ state }) => {
      num1 = 0;
      for (const key in state.nested) {
        num1 += state.nested[key];
      }
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    state.nested.prop4 = 3;
    expect(num1).toBe(3);
    state.nested.prop5 = 4;
    expect(num1).toBe(7);
    delete state.nested.prop4;
    expect(num1).toBe(4);
  });

  it("should observe symbol keyed properties", () => {
    const key = Symbol("symbol keyed prop");
    state[key] = "value";
    let symbol1: string;
    let hasSymbol1: boolean;
    observer = ({ state }) => {
      symbol1 = state[key];
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    observer = ({ state }) => {
      hasSymbol1 = key in state;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(symbol1).toBe("value");
    expect(hasSymbol1).toBe(true);
    state[key] = "newValue";
    expect(symbol1).toBe("newValue");
    delete state[key];
    expect(symbol1).toBe(undefined);
    expect(hasSymbol1).toBe(false);
  });

  it("should not observe well-known symbol keyed properties", () => {
    const key = Symbol.isConcatSpreadable;
    let symbol1: boolean;
    observer = ({ state }) => {
      symbol1 = state.array1[key];
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(state.array1[key]).toBe(undefined);
    expect(symbol1).toBe(undefined);
    state.array1[key] = true;
    expect(state.array1[key]).toBe(true);
    expect(symbol1).toBe(undefined);
  });

  it("should not observe set operations without a value change in primitives", () => {
    let prop6: string;
    let hasProp6: boolean;
    observer = ({ state }) => {
      prop6 = state.prop6;
    };
    mockedObserver = jest.fn(observer);
    const mock1 = mockedObserver;
    actions.runWhen();
    observer = ({ state }) => {
      hasProp6 = "prop6" in state;
    };
    mockedObserver = jest.fn(observer);
    const mock2 = mockedObserver;
    actions.runWhen();
    expect(prop6).toBe("prop6");
    expect(hasProp6).toBe(true);
    state.prop6 = "prop6";
    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(prop6).toBe("prop6");
    expect(hasProp6).toBe(true);
  });

  it("should not observe raw mutations", () => {
    let prop1: boolean;
    observer = ({ state }) => {
      prop1 = state[RAW].prop1;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop1).toBe(0);
    state.prop1 = true;
    expect(prop1).toBe(0);
  });

  it("should not be triggered by raw mutations", () => {
    let prop1: boolean;
    observer = ({ state }) => {
      prop1 = state.prop1;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop1).toBe(0);
    state[RAW].prop1 = 1;
    expect(prop1).toBe(0);
  });

  it("should avoid implicit infinite recursive loops with itself", () => {
    let prop2: number;
    observer = ({ state }) => {
      prop2 = state.prop2;
      state.prop2 += 1;
    };
    mockedObserver = jest.fn(observer);
    actions.runWhen();
    expect(prop2).toBe(1);
    expect(state.prop2).toBe(1);
    expect(mockedObserver.mock.calls.length).toBe(1);
    state.prop2 = 4;
    expect(prop2).toBe(5);
    expect(state.prop2).toBe(5);
    expect(mockedObserver.mock.calls.length).toBe(2);
  });
});

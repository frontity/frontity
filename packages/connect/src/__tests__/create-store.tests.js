import { createStore, isObservable } from "..";

let config = {};

beforeEach(() => {
  config = {
    state: {
      prop1: 1,
      nested1: {
        prop2: 2,
        prop3: state => state.prop1 + state.nested1.prop2,
        prop4: state => num => state.nested1.prop3 + num,
        prop5: 0
      }
    },
    actions: {
      action1: state => {
        state.prop1 = "action1";
      },
      nested1: {
        action2: state => {
          state.prop1 = "action2";
        }
      },
      nested2: {
        nested3: {
          action3: state => {
            state.nested1.prop5 = state.nested1.prop3;
          },
          action4: state => {
            state.nested1.prop5 = state.nested1.prop4(2);
          },
          action5: state => num => {
            state.nested1.prop5 = state.nested1.prop4(num);
          }
        }
      }
    }
  };
});

describe("createStore", () => {
  it("should return state and actions", () => {
    const store = createStore(config);
    expect(store.state.prop1).toBe(1);
    expect(typeof store.actions.action1).toBe("function");
    expect(typeof store.actions.nested1.action2).toBe("function");
    expect(typeof store.actions.nested2.nested3.action3).toBe("function");
  });

  it("should return observable state", () => {
    const store = createStore(config);
    expect(isObservable(store.state)).toBe(true);
  });

  it("should return unobservable actions", () => {
    const store = createStore(config);
    expect(isObservable(store.actions)).toBe(false);
  });
});

describe("createStore actions", () => {
  it("should be able to mutate state", () => {
    const store = createStore(config);
    store.actions.action1();
    expect(store.state.prop1).toBe("action1");
  });

  it("should be able to access derived state", () => {
    const store = createStore(config);
    store.actions.nested2.nested3.action3();
    expect(store.state.nested1.prop5).toBe(3);
  });

  it("should be able to access derived state functions", () => {
    const store = createStore(config);
    store.actions.nested2.nested3.action4();
    expect(store.state.nested1.prop5).toBe(5);
  });

  it("should accept parameters", () => {
    const store = createStore(config);
    store.actions.nested2.nested3.action5(3);
    expect(store.state.nested1.prop5).toBe(6);
  });
});

import { createStore, isObservable } from "..";

const config = {
  state: {
    prop1: "prop1",
    nested1: {
      prop2: "prop2"
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
          state.prop1 = "action3";
        }
      }
    }
  }
};

describe("createStore", () => {
  it("should return state and actions", () => {
    const store = createStore(config);
    expect(store.state.prop1).toBe("prop1");
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
});

/* eslint-disable require-atomic-updates */
import { createStore, isObservable, getSnapshot } from "..";

let config = {};
let store = null;

const delay = () => new Promise((resolve) => setTimeout(resolve, 100));

beforeEach(() => {
  config = {
    state: {
      prop1: 1,
      nested1: {
        prop2: 2,
        prop3: ({ state }) => state.prop1 + state.nested1.prop2,
        prop4: ({ state }) => (num) => state.nested1.prop3 + num,
        prop5: 0,
      },
    },
    actions: {
      action1: ({ state }) => {
        state.prop1 = "action1";
      },
      nested1: {
        action2: ({ state }) => {
          state.prop1 = "action2";
          return state.prop1;
        },
      },
      nested2: {
        nested3: {
          action3: ({ state }) => {
            state.nested1.prop5 = state.nested1.prop3;
          },
          action4: ({ state }) => {
            state.nested1.prop5 = state.nested1.prop4(2);
          },
          action5: ({ state }) => (num) => {
            state.nested1.prop5 = state.nested1.prop4(num);
          },
        },
      },
      action6: async ({ state }) => {
        await delay();
        state.prop1 = "action6";
        return state.prop1;
      },
      action7: ({ state }) => async (num) => {
        await delay();
        state.prop1 = num;
      },
      action8: ({ actions }) => {
        actions.action1();
      },
      action9: async ({ state, actions }) => {
        const prop1 = state.prop1;
        await actions.action7(3);
        state.prop1 = `${state.prop1} ${prop1}`;
      },
      action10: () => {
        throw new Error("action10 error");
      },
      action11: async () => {
        throw new Error("action11 error");
      },
    },
  };

  store = createStore(config);
});

describe("createStore", () => {
  it("should return state and actions", () => {
    expect(store.state.prop1).toBe(1);
    expect(typeof store.actions.action1).toBe("function");
    expect(typeof store.actions.nested1.action2).toBe("function");
    expect(typeof store.actions.nested2.nested3.action3).toBe("function");
  });

  it("should return observable state", () => {
    expect(isObservable(store.state)).toBe(true);
  });

  it("should return unobservable actions", () => {
    expect(isObservable(store.actions)).toBe(false);
  });

  it("should include arbitrary properties", () => {
    store = createStore({ ...config, something: "else" });
    expect(store.something).toBe("else");
  });

  it("should create two different stores", () => {
    const store1 = createStore({
      state: { prop1: 1, prop2: ({ state }) => state.prop1 * 2 },
    });
    const store2 = createStore({
      state: { prop1: 2, prop2: ({ state }) => state.prop1 * 2 },
    });
    expect(store1.state.prop2).toBe(2);
    expect(store2.state.prop2).toBe(4);
  });
});

describe("createStore actions", () => {
  it("should be able to mutate state", () => {
    store.actions.action1();
    expect(store.state.prop1).toBe("action1");
  });

  it("should be able to access derived state", () => {
    store.actions.nested2.nested3.action3();
    expect(store.state.nested1.prop5).toBe(3);
  });

  it("should be able to access derived state functions", () => {
    store.actions.nested2.nested3.action4();
    expect(store.state.nested1.prop5).toBe(5);
  });

  it("should accept parameters", async () => {
    store.actions.nested2.nested3.action5(3);
    expect(store.state.nested1.prop5).toBe(6);
  });

  it("should return a promise that can be awaited", (done) => {
    store.actions.action6().then(() => {
      expect(store.state.prop1).toBe("action6");
      done();
    });
  });

  it("should return a promise that can be awaited even with params", (done) => {
    store.actions.action7(7).then(() => {
      expect(store.state.prop1).toBe(7);
      done();
    });
  });

  it("should run other actions", () => {
    store.actions.action8();
    expect(store.state.prop1).toBe("action1");
  });

  it("should be able to wait for other actions", async () => {
    await store.actions.action9();
    expect(store.state.prop1).toBe("3 1");
  });

  it("should not return anything", () => {
    expect(store.actions.nested1.action2()).toBe(undefined);
  });

  it("should not return anything even with promises", async () => {
    const res = await store.actions.action6();
    expect(res).toBe(undefined);
  });

  it("should catch an error thrown inside of an action", () => {
    try {
      store.actions.action10();
      throw new Error("This line should never be reached");
    } catch (e) {
      expect(e.message).toBe("action10 error");
    }
  });

  it("should catch an error thrown inside of an async action", async () => {
    try {
      await store.actions.action11();
      throw new Error("This line should never be reached");
    } catch (e) {
      expect(e.message).toBe("action11 error");
    }
  });
});

describe("createStore getSnapshot", () => {
  it("should be able retrieve a serializable snapshot", () => {
    expect(getSnapshot(store.state)).toMatchSnapshot();
    store.actions.nested2.nested3.action5(3);
    expect(getSnapshot(store.state)).toMatchSnapshot();
  });
});

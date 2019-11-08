import { proxifyActions } from "..";
import {
  Actions,
  Derived,
  Store,
  Action,
  AsyncAction,
  Context,
  State
} from "../../types";
import { CONTEXT, PATH, ROOT, IS_ACTIONS } from "../symbols";

interface ArrayItem {
  item: {
    prop1: string;
    prop2: string;
  };
}

interface MyStore extends Store {
  state: {
    array1: ArrayItem[];
    derived1: Derived<MyStore, number>;
  };
  actions: {
    namespace: {
      addFixedItem: Action<MyStore>;
      addItem: Action<MyStore, ArrayItem>;
      replaceItem: Action<MyStore, number, ArrayItem>;
      capitalizeProp: Action<MyStore, number, string>;
      fetchItems: AsyncAction<MyStore>;
      fetchAndReplaceItem: AsyncAction<MyStore, number>;
      callOtherAction: Action<MyStore>;
    };
    exports: {
      exportState: Action<MyStore>;
      exportActions: Action<MyStore>;
      callExportActions: Action<MyStore>;
      callExportState: Action<MyStore>;
    };
  };
  libraries: {
    capitalize: (str: string) => string;
  };
}

let rawStore: MyStore;
let actions: Actions<MyStore>;
let exposedState: State<MyStore>;
let exposedActions: Actions<MyStore>;

beforeEach(() => {
  rawStore = {
    state: {
      array1: [],
      derived1: ({ state }) => state.array1.length
    },
    actions: {
      namespace: {
        addFixedItem: ({ state }) => {
          if (state.derived1 < 1)
            state.array1.push({
              item: { prop1: "addFixedItem-prop1", prop2: "addFixedItem-prop2" }
            });
        },
        addItem: ({ state }) => user => {
          state.array1.push(user);
        },
        replaceItem: ({ state }) => (index, user) => {
          state.array1[index] = user;
        },
        capitalizeProp: ({ state, libraries }) => (index, prop) => {
          state.array1[index].item[prop] = libraries.capitalize(
            state.array1[index].item[prop]
          );
        },
        fetchItems: async ({ state }) => {
          await new Promise(resolve => setTimeout(resolve, 10));
          state.array1 = [
            { item: { prop1: "fetchItems-prop1", prop2: "fetchItems-prop2" } }
          ];
        },
        fetchAndReplaceItem: ({ state }) => async index => {
          await new Promise(resolve => setTimeout(resolve, 10));
          state.array1[index] = {
            item: {
              prop1: "fetchAndReplaceItem-prop1",
              prop2: "fetchAndReplaceItem-prop2"
            }
          };
        },
        callOtherAction: ({ actions }) => {
          actions.namespace.addItem({
            item: {
              prop1: "callOtherAction-prop1",
              prop2: "callOtherAction-prop2"
            }
          });
        }
      },
      exports: {
        exportState: ({ state }) => {
          exposedState = state;
        },
        exportActions: ({ actions }) => {
          exposedActions = actions;
        },
        callExportActions: ({ actions }) => {
          actions.exports.exportActions();
        },
        callExportState: ({ actions }) => {
          actions.exports.exportState();
        }
      }
    },
    libraries: {
      capitalize: str => str.toUpperCase()
    }
  };
  actions = proxifyActions(rawStore);
});

describe("proxifyActions", () => {
  it("should return proxified actions", () => {
    expect(actions[IS_ACTIONS]).toBe(true);
    expect(actions).toBeInstanceOf(Proxy);
    expect(actions.namespace[IS_ACTIONS]).toBe(true);
    expect(actions.namespace).toBeInstanceOf(Proxy);
  });

  it("should throw if rawStore doesn't contain actions", () => {
    const store2 = { state: {}, libraries: {} /* no state */ } as Store;
    expect(() => proxifyActions(store2)).toThrow();
  });

  it("should return the action functions", () => {
    expect(typeof actions.namespace.addFixedItem).toBe("function");
    expect(typeof actions.namespace.addItem).toBe("function");
    expect(typeof actions.namespace.replaceItem).toBe("function");
    expect(typeof actions.namespace.capitalizeProp).toBe("function");
    expect(typeof actions.namespace.fetchItems).toBe("function");
    expect(typeof actions.namespace.fetchAndReplaceItem).toBe("function");
    expect(typeof actions.namespace.callOtherAction).toBe("function");
  });

  it("should return the own keys of the action objects", () => {
    expect(Object.keys(actions)).toEqual(["namespace"]);
    expect(Object.keys(actions.namespace)).toBe([
      "addFixedItem",
      "addItem",
      "replaceItem",
      "capitalizeProp",
      "fetchItems",
      "fetchAndReplaceItem",
      "callOtherAction"
    ]);
  });

  it("should store the path to each part of the proxified actions object", () => {
    expect(actions[PATH]).toBe("actions");
    expect(actions.namespace[PATH]).toBe("actions.namespace");
  });

  it("should store access to the root proxified actions, proxified state and libraries", () => {
    expect(actions[ROOT].actions).toBe(actions);
    expect(actions[ROOT].state.array1).toEqual(rawStore.state.array1);
    expect(typeof actions[ROOT].state.userLength).toBe("string");
    expect(actions[ROOT].libraries).toBe(rawStore.libraries);
    expect(actions.namespace[ROOT].actions).toBe(actions);
    expect(actions.namespace[ROOT].state.array1).toEqual(rawStore.state.array1);
    expect(typeof actions.namespace[ROOT].state.userLength).toBe("string");
    expect(actions.namespace[ROOT].libraries).toBe(rawStore.libraries);
  });
});

describe("Actions", () => {
  it("without params should work", () => {
    expect(rawStore.state.array1.length).toBe(0);
    actions.namespace.addFixedItem();
    expect(rawStore.state.array1.length).toBe(1);
    expect(rawStore.state.array1[0].item.prop1).toBe("addFixedItem-prop1");
  });

  it("with params should work", () => {
    expect(rawStore.state.array1.length).toBe(0);
    actions.namespace.addItem({
      item: { prop1: "addItem-prop1", prop2: "addItem-prop2" }
    });
    expect(rawStore.state.array1.length).toBe(1);
    expect(rawStore.state.array1[0].item.prop1).toBe("addItem-prop1");
    expect(rawStore.state.array1[0].item.prop2).toBe("addItem-prop2");
  });

  it("with two params should work", () => {
    expect(rawStore.state.array1.length).toBe(0);
    actions.namespace.replaceItem(1, {
      item: { prop1: "replaceItem-prop1", prop2: "replaceItem-prop2" }
    });
    expect(rawStore.state.array1.length).toBe(2);
    expect(rawStore.state.array1[1].item.prop1).toBe("replaceItem-prop1");
    expect(rawStore.state.array1[1].item.prop2).toBe("replaceItem-prop2");
  });

  it("should have access to libraries", () => {
    expect(rawStore.state.array1.length).toBe(0);
    actions.namespace.addFixedItem();
    actions.namespace.capitalizeProp(0, "prop2");
    expect(rawStore.state.array1[0].item.prop2).toBe("ADDFIXEDITEM-PROP2");
  });

  it("async actions without params should work", async () => {
    expect(rawStore.state.array1.length).toBe(0);
    await actions.namespace.fetchItems();
    expect(rawStore.state.array1.length).toBe(1);
    expect(rawStore.state.array1[0].item.prop1).toBe("fetchItems-prop1");
    expect(rawStore.state.array1[0].item.prop2).toBe("fetchItems-prop2");
  });

  it("async actions with params should work", async () => {
    expect(rawStore.state.array1.length).toBe(0);
    await actions.namespace.fetchAndReplaceItem(1);
    expect(rawStore.state.array1.length).toBe(2);
    expect(rawStore.state.array1[1].item.prop1).toBe(
      "fetchAndReplaceItem-prop1"
    );
    expect(rawStore.state.array1[1].item.prop2).toBe(
      "fetchAndReplaceItem-prop2"
    );
  });

  it("async actions which call other actions should work", () => {
    expect(rawStore.state.array1.length).toBe(0);
    actions.namespace.callOtherAction();
    expect(rawStore.state.array1.length).toBe(1);
    expect(rawStore.state.array1[0].item.prop1).toBe("callOtherAction-prop1");
    expect(rawStore.state.array1[0].item.prop2).toBe("callOtherAction-prop2");
  });
});

describe("Contexts", () => {
  const context1: Context = { type: "debug", name: "context1" };
  const context2: Context = { type: "debug", name: "context2" };

  let actions1: Actions<MyStore>;
  let actions2: Actions<MyStore>;

  beforeEach(() => {
    exposedState = null;
    exposedActions = null;
    actions1 = proxifyActions(rawStore, context1, {
      mode: "development"
    });
    actions2 = proxifyActions(rawStore, context2, {
      mode: "development"
    });
  });

  it("should return different proxified actions and store different contexts in development", () => {
    expect(actions1[CONTEXT]).toBe(context1);
    expect(actions1.namespace[CONTEXT]).toBe(context1);
    expect(actions2[CONTEXT]).toBe(context2);
    expect(actions2.namespace[CONTEXT]).toBe(context2);
    expect(actions1).not.toBe(actions2);
  });

  it("should return the same proxified actions without context information in production", () => {
    const actions1 = proxifyActions(rawStore, context1, { mode: "production" });
    const actions2 = proxifyActions(rawStore, context2, { mode: "production" });
    expect(actions1[CONTEXT]).toBe(null);
    expect(actions1.namespace[CONTEXT]).toBe(null);
    expect(actions2[CONTEXT]).toBe(null);
    expect(actions2.namespace[CONTEXT]).toBe(null);
    expect(actions1).toBe(actions2);
  });

  it("state passed to actions should a context with parent", () => {
    actions1.exports.exportState();
    expect(exposedState[CONTEXT]).toEqual({
      type: "action",
      name: "exportState",
      parent: {
        type: "debug",
        name: "context1"
      }
    });
    actions2.exports.exportState();
    expect(exposedState[CONTEXT]).toEqual({
      type: "action",
      name: "exportState",
      parent: {
        type: "debug",
        name: "context2"
      }
    });
  });

  it("actions passed to actions should have a proper context", () => {
    actions1.exports.exportActions();
    expect(exposedActions[CONTEXT]).toEqual({
      type: "action",
      name: "exportActions",
      parent: {
        type: "debug",
        name: "context1"
      }
    });
    actions2.exports.exportActions();
    expect(exposedActions[CONTEXT]).toEqual({
      type: "action",
      name: "exportActions",
      parent: {
        type: "debug",
        name: "context2"
      }
    });
  });

  it("when running actions passed to actions, they should have a context in development", () => {
    const context = (name: string, type: string) => ({
      type: "action",
      name: `export${type}`,
      parent: {
        type: "action",
        name: `callExport${type}`,
        parent: {
          type: "debug",
          name
        }
      }
    });
    actions1.exports.exportActions();
    actions1.exports.exportState();
    const firstExposedActions = exposedActions;
    const firstExposedState = exposedState;
    actions1.exports.callExportActions();
    actions1.exports.callExportState();
    expect(firstExposedActions).not.toBe(exposedActions);
    expect(firstExposedState).not.toBe(exposedState);
    expect(exposedActions[CONTEXT]).toEqual(context("context1", "Actions"));
    expect(exposedState[CONTEXT]).toEqual(context("context1", "State"));
    actions2.exports.callExportActions();
    actions2.exports.callExportState();
    expect(firstExposedActions).not.toBe(exposedActions);
    expect(firstExposedState).not.toBe(exposedState);
    expect(exposedActions[CONTEXT]).toEqual(context("context2", "Actions"));
    expect(exposedState[CONTEXT]).toEqual(context("context2", "State"));
  });

  it("when running actions passed to actions, they should not have a context in production", () => {
    const actions1 = proxifyActions(rawStore, context1, { mode: "production" });
    const actions2 = proxifyActions(rawStore, context2, { mode: "production" });
    actions1.exports.exportActions();
    actions1.exports.exportState();
    const firstExposedActions = exposedActions;
    const firstExposedState = exposedState;
    actions1.exports.callExportActions();
    actions1.exports.callExportState();
    expect(firstExposedActions).toBe(exposedActions);
    expect(firstExposedState).toBe(exposedState);
    expect(exposedActions[CONTEXT]).toBe(null);
    expect(exposedState[CONTEXT]).toBe(null);
    actions2.exports.callExportActions();
    actions2.exports.callExportState();
    expect(firstExposedActions).toBe(exposedActions);
    expect(firstExposedState).toBe(exposedState);
    expect(exposedActions[CONTEXT]).toBe(null);
    expect(exposedState[CONTEXT]).toBe(null);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { observableActions } from "..";
import {
  Actions,
  Derived,
  Store,
  Action,
  AsyncAction,
  ProxifyOptions
} from "../../types";
import { OWNER, PATH, ROOT, OBSERVABLE_ACTIONS } from "../symbols";

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

beforeEach(() => {
  rawStore = {
    state: {
      array1: [],
      derived1: ({ state }) => state.array1.length
    },
    actions: {
      namespace: {
        addFixedItem: () => {},
        addItem: () => user => {},
        replaceItem: () => (index, user) => {},
        capitalizeProp: () => (index, prop) => {},
        fetchItems: async ({ state }) => {
          await new Promise(resolve => setTimeout(resolve, 10));
          state.array1 = [
            { item: { prop1: "fetchItems-prop1", prop2: "fetchItems-prop2" } }
          ];
        },
        fetchAndReplaceItem: () => async index => {},
        callOtherAction: () => {}
      },
      exports: {
        exportState: () => {},
        exportActions: () => {},
        callExportActions: () => {},
        callExportState: () => {}
      }
    },
    libraries: {
      capitalize: str => str.toUpperCase()
    }
  };
  actions = observableActions(rawStore);
});

describe("observableActions", () => {
  it("should return observable actions", () => {
    expect(actions[OBSERVABLE_ACTIONS]).toBe(true);
    expect(actions).toBeInstanceOf(Proxy);
    expect(actions.namespace[OBSERVABLE_ACTIONS]).toBe(true);
    expect(actions.namespace).toBeInstanceOf(Proxy);
  });

  it("should throw if rawStore doesn't contain actions", () => {
    const store2 = { state: {}, libraries: {} /* no state */ } as Store;
    expect(() => observableActions(store2)).toThrow();
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

  it("should store access to the root observable actions, observable state and libraries", () => {
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

describe("observableAction owners", () => {
  const options1: ProxifyOptions = {
    owner: { type: "debug", name: "owner1" },
    mode: "development"
  };
  const options2: ProxifyOptions = {
    owner: { type: "debug", name: "owner2" },
    mode: "development"
  };

  let actions1: Actions<MyStore>;
  let actions2: Actions<MyStore>;

  beforeEach(() => {
    actions1 = observableActions(rawStore, options1);
    actions2 = observableActions(rawStore, options2);
  });

  it("should return different proxified actions and store different owners in development", () => {
    expect(actions1[OWNER]).toBe(options1.owner);
    expect(actions1.namespace[OWNER]).toBe(options1.owner);
    expect(actions2[OWNER]).toBe(options2.owner);
    expect(actions2.namespace[OWNER]).toBe(options2.owner);
    expect(actions1).not.toBe(actions2);
  });

  it("should return the same proxified actions without owners information in production", () => {
    const actions1 = observableActions(rawStore, {
      ...options1,
      mode: "production"
    });
    const actions2 = observableActions(rawStore, {
      ...options2,
      mode: "production"
    });
    expect(actions1[OWNER]).toBe(null);
    expect(actions1.namespace[OWNER]).toBe(null);
    expect(actions2[OWNER]).toBe(null);
    expect(actions2.namespace[OWNER]).toBe(null);
    expect(actions1).toBe(actions2);
  });
});

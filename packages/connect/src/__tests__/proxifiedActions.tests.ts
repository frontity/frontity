import { proxifyActions } from "..";
import {
  Actions,
  Derived,
  Store,
  Action,
  AsyncAction,
  Context
} from "../../types";
import { CONTEXT, PATH, ROOT, IS_ACTIONS } from "../symbols";

interface User {
  profile: {
    name: string;
    surname: string;
  };
}

interface MyStore extends Store {
  actions: {
    users: {
      addFixedUser: Action<MyStore>;
      addUser: Action<MyStore, User>;
      replaceUser: Action<MyStore, number, User>;
      capitalizeName: Action<MyStore, number, string, string>;
      fetchUsers: AsyncAction<MyStore>;
      fetchAndReplaceUser: AsyncAction<MyStore, number>;
      callOtherAction: Action<MyStore>;
    };
  };
  state: {
    users: User[];
    userLength: Derived<MyStore, number>;
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
      users: [],
      userLength: ({ state }) => state.users.length
    },
    actions: {
      users: {
        addFixedUser: ({ state }) => {
          if (state.userLength < 1)
            state.users.push({ profile: { name: "Jon", surname: "Snow" } });
        },
        addUser: ({ state }) => user => {
          state.users.push(user);
        },
        replaceUser: ({ state }) => (index, user) => {
          state.users[index] = user;
        },
        capitalizeName: ({ state, libraries }) => (index, prop, value) => {
          state.users[index].profile[prop] = libraries.capitalize(value);
        },
        fetchUsers: async ({ state }) => {
          await new Promise(resolve => setTimeout(resolve, 10));
          state.users = [{ profile: { name: "Jon", surname: "Snow" } }];
        },
        fetchAndReplaceUser: ({ state }) => async index => {
          await new Promise(resolve => setTimeout(resolve, 10));
          state.users[index] = {
            profile: { name: "Jammie", surname: "Lannister" }
          };
        },
        callOtherAction: ({ actions }) => {
          actions.users.addUser({
            profile: { name: "Ned", surname: "Start" }
          });
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
    expect(actions.users[IS_ACTIONS]).toBe(true);
    expect(actions.users).toBeInstanceOf(Proxy);
  });

  it("should throw if rawStore doesn't contain actions", () => {
    const store2 = { state: {}, libraries: {} /* no state */ } as Store;
    expect(() => proxifyActions(store2)).toThrow();
  });

  it("should return the action functions", () => {
    expect(typeof actions.users.addFixedUser).toBe("function");
    expect(typeof actions.users.addUser).toBe("function");
    expect(typeof actions.users.replaceUser).toBe("function");
    expect(typeof actions.users.capitalizeName).toBe("function");
    expect(typeof actions.users.fetchUsers).toBe("function");
    expect(typeof actions.users.fetchAndReplaceUser).toBe("function");
    expect(typeof actions.users.callOtherAction).toBe("function");
  });

  it("should make actions without params work", () => {
    expect(rawStore.state.users.length).toBe(0);
    actions.users.addFixedUser();
    expect(rawStore.state.users.length).toBe(1);
    expect(rawStore.state.users[0].profile.name).toBe("Jon");
  });

  it("actions with params work", () => {
    expect(rawStore.state.users.length).toBe(0);
    actions.users.addUser({
      profile: { name: "Jammie", surname: "Lannister" }
    });
    expect(rawStore.state.users.length).toBe(1);
    expect(rawStore.state.users[0].profile.name).toBe("Jammie");
  });

  it("actions with two params work", () => {
    expect(rawStore.state.users.length).toBe(0);
    actions.users.replaceUser(1, {
      profile: { name: "Ned", surname: "Stark" }
    });
    expect(rawStore.state.users.length).toBe(2);
    expect(rawStore.state.users[1].profile.name).toBe("Ned");
  });

  it("actions with libraries work", () => {
    expect(rawStore.state.users.length).toBe(0);
    actions.users.addFixedUser();
    actions.users.capitalizeName(0, "surname", "Targeryan");
    expect(rawStore.state.users[0].profile.surname).toBe("TARGERYAN");
  });

  it("async actions without params work", async () => {
    expect(rawStore.state.users.length).toBe(0);
    await actions.users.fetchUsers();
    expect(rawStore.state.users.length).toBe(1);
    expect(rawStore.state.users[0].profile.name).toBe("Jon");
  });

  it("async actions with params work", async () => {
    expect(rawStore.state.users.length).toBe(0);
    await actions.users.fetchAndReplaceUser(1);
    expect(rawStore.state.users.length).toBe(2);
    expect(rawStore.state.users[1].profile.name).toBe("Jammie");
  });

  it("async actions which call other actions work", () => {
    expect(rawStore.state.users.length).toBe(0);
    actions.users.callOtherAction();
    expect(rawStore.state.users.length).toBe(1);
    expect(rawStore.state.users[0].profile.name).toBe("Ned");
  });

  it("should return the own keys of the action objects", () => {
    expect(Object.keys(actions)).toEqual(["users"]);
    expect(Object.keys(actions.users)).toBe([
      "addFixedUser",
      "addUser",
      "replaceUser"
    ]);
  });

  it("should return different proxified actions and store different contexts in development", () => {
    const context1: Context = { type: "debug", name: "context1" };
    const context2: Context = { type: "debug", name: "context2" };
    const actions1 = proxifyActions(rawStore, context1, {
      mode: "development"
    });
    const actions2 = proxifyActions(rawStore, context2, {
      mode: "development"
    });
    expect(actions1[CONTEXT]).toBe(context1);
    expect(actions1.users[CONTEXT]).toBe(context1);
    expect(actions2[CONTEXT]).toBe(context2);
    expect(actions2.users[CONTEXT]).toBe(context2);
    expect(actions1).not.toBe(actions2);
  });

  it("should return the same proxified actions without context information in production", () => {
    const actions1 = proxifyActions(
      rawStore,
      { type: "debug", name: "context1" },
      { mode: "production" }
    );
    const actions2 = proxifyActions(
      rawStore,
      { type: "debug", name: "context2" },
      { mode: "production" }
    );
    expect(actions1[CONTEXT]).toBe(null);
    expect(actions1.users[CONTEXT]).toBe(null);
    expect(actions2[CONTEXT]).toBe(null);
    expect(actions2.users[CONTEXT]).toBe(null);
    expect(actions1).toBe(actions2);
  });

  it("should store the path to each part of the proxified actions object", () => {
    expect(actions[PATH]).toBe("actions");
    expect(actions.users[PATH]).toBe("actions.users");
  });

  it("should store access to the root proxified actions, proxified state and libraries", () => {
    expect(actions[ROOT].actions).toBe(actions);
    expect(actions[ROOT].state.users).toEqual(rawStore.state.users);
    expect(typeof actions[ROOT].state.userLength).toBe("string");
    expect(actions[ROOT].libraries).toBe(rawStore.libraries);
    expect(actions.users[ROOT].actions).toBe(actions);
    expect(actions.users[ROOT].state.users).toEqual(rawStore.state.users);
    expect(typeof actions.users[ROOT].state.userLength).toBe("string");
    expect(actions.users[ROOT].libraries).toBe(rawStore.libraries);
  });
});

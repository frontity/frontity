import { mutableState } from "..";
import { State, Derived, Store, ProxifyOptions } from "../../types";
import { OWNER, PATH, RAW, ROOT, MUTABLE_STATE } from "../symbols";

interface MyStore extends Store {
  state: {
    users: { profile: { name: string; surname: string } }[];
    usersLength: Derived<MyStore, number>;
    userName: Derived<MyStore, number, string>;
    userProp: Derived<MyStore, number, string, string>;
  };
  libraries: {
    capitalize: (str: string) => string;
  };
}

let rawStore: MyStore;
let state: State<MyStore>;

beforeEach(() => {
  rawStore = {
    state: {
      users: [
        { profile: { name: "Jon", surname: "Snow" } },
        { profile: { name: "Jammie", surname: "Lannister" } }
      ],
      usersLength: ({ state }) => state.users.length,
      userName: ({ state }) => index => state.users[index].profile.name,
      userProp: ({ state, libraries }) => (index, prop) =>
        libraries.capitalize(state.users[index].profile[prop])
    },
    actions: {},
    libraries: {
      capitalize: str => str.toUpperCase()
    }
  };
  state = mutableState(rawStore);
});

describe("mutableState", () => {
  it("should return a mutable state", () => {
    expect(state[MUTABLE_STATE]).toBe(true);
    expect(state).toBeInstanceOf(Proxy);
    expect(state.users[MUTABLE_STATE]).toBe(true);
    expect(state.users).toBeInstanceOf(Proxy);
    expect(state.users[0][MUTABLE_STATE]).toBe(true);
    expect(state.users[0]).toBeInstanceOf(Proxy);
    expect(state.users[0].profile[MUTABLE_STATE]).toBe(true);
    expect(state.users[0].profile).toBeInstanceOf(Proxy);
  });

  it("should throw if rawStore doesn't contain state", () => {
    const store2 = { actions: {}, libraries: {} /* no state */ } as Store;
    expect(() => mutableState(store2)).toThrow();
  });

  it("should return the own keys of the raw state", () => {
    expect(Object.keys(state)).toEqual([
      "users",
      "usersLength",
      "userName",
      "userProp"
    ]);
    expect(Object.keys(state.users[0].profile)).toBe(["name", "surname"]);
  });

  it("should store the path of each part of the state", () => {
    expect(state[PATH]).toBe("state");
    expect(state.users[PATH]).toBe("state.users");
    expect(state.users[0][PATH]).toBe("state.users.0");
    expect(state.users[0].profile[PATH]).toBe("state.users.0.profile");
  });

  it("should store access to the raw state to each part of the observable state", () => {
    expect(state[RAW]).toBe(rawStore.state);
    expect(state.users[RAW]).toBe(rawStore.state.users);
    expect(state.users[0][RAW]).toBe(rawStore.state.users[0]);
    expect(state.users[0].profile[RAW]).toBe(rawStore.state.users[0].profile);
  });

  it("should store access to the root observable state and libraries", () => {
    expect(state[ROOT].state).toBe(state);
    expect(state[ROOT].libraries).toBe(rawStore.libraries);
    expect(state.users[ROOT].state).toBe(state);
    expect(state.users[ROOT].libraries).toBe(rawStore.libraries);
    expect(state.users[0][ROOT].state).toBe(state);
    expect(state.users[0][ROOT].libraries).toBe(rawStore.libraries);
    expect(state.users[0].profile[ROOT].state).toBe(state);
    expect(state.users[0].profile[ROOT].libraries).toBe(rawStore.libraries);
  });

  it("should not have access to the root actions", () => {
    expect(state[ROOT].actions).toBe(undefined);
    expect(state.users[ROOT].actions).toBe(undefined);
    expect(state.users[0][ROOT].actions).toBe(undefined);
    expect(state.users[0].profile[ROOT].actions).toBe(undefined);
  });

  it("should change the path when objects are swapped", () => {
    const jon = state.users[0];
    state.users[0] = state.users[1];
    state.users[1] = jon;
    expect(state.users[0][PATH]).toBe("state.users.0");
    expect(state.users[0].profile[PATH]).toBe("state.users.0.profile");
    expect(state.users[1][PATH]).toBe("state.users.1");
    expect(state.users[1].profile[PATH]).toBe("state.users.1.profile");
  });

  it("should change the raw state when objects are swapped", () => {
    const jon = state.users[0];
    state.users[0] = state.users[1];
    state.users[1] = jon;
    expect(state.users[0][RAW]).toBe(rawStore.state.users[0]);
    expect(state.users[0].profile[RAW]).toBe(rawStore.state.users[0].profile);
    expect(state.users[1][RAW]).toBe(rawStore.state.users[1]);
    expect(state.users[1].profile[RAW]).toBe(rawStore.state.users[1].profile);
  });

  it("should leave the raw state as raw", () => {
    state.users[2] = { profile: { name: "Daenerys", surname: "Targeryan" } };
    expect(rawStore.state.users[2][MUTABLE_STATE]).toBe(undefined);
    expect(state.users[2][MUTABLE_STATE]).toBe(true);
    expect(rawStore.state.users[2][MUTABLE_STATE]).toBe(undefined);
  });

  it("should run the derived state functions using the root store as argument", () => {
    expect(state.usersLength).toBe(2);
    expect(state.userName(0)).toBe("Jon");
    expect(state.userProp(0, "surname")).toBe("SNOW");
  });

  it("should return the primitive values of the raw state", () => {
    expect(state.users[0].profile.name).toBe("Jon");
    expect(state.users[0].profile.surname).toBe("Snow");
  });

  it("should return the correct primitives when objects are swapped", () => {
    const jon = state.users[0];
    state.users[0] = state.users[1];
    state.users[1] = jon;
    expect(state.users[0].profile.name).toBe("Jammie");
    expect(state.users[0].profile.surname).toBe("Lannister");
    expect(state.users[1].profile.name).toBe("Jon");
    expect(state.users[1].profile.surname).toBe("Snow");
  });
});

describe("mutableState Owner", () => {
  it("should return different observable states and store different owner in development", () => {
    const options1: ProxifyOptions = {
      owner: { type: "debug", name: "options1" },
      mode: "development"
    };
    const options2: ProxifyOptions = {
      owner: { type: "debug", name: "options2" },
      mode: "development"
    };
    const state1 = mutableState(rawStore, options1);
    const state2 = mutableState(rawStore, options2);
    expect(state1[OWNER]).toBe(options1.owner);
    expect(state1.users[OWNER]).toBe(options1.owner);
    expect(state1.users[0][OWNER]).toBe(options1.owner);
    expect(state1.users[0].profile[OWNER]).toBe(options1.owner);
    expect(state2[OWNER]).toBe(options2.owner);
    expect(state2.users[OWNER]).toBe(options2.owner);
    expect(state2.users[0][OWNER]).toBe(options2.owner);
    expect(state2.users[0].profile[OWNER]).toBe(options2.owner);
    expect(state1).not.toBe(state2);
  });

  it("should return the same observable states without owner information in production", () => {
    const state1 = mutableState(rawStore, {
      mode: "production",
      owner: { type: "debug", name: "owner1" }
    });
    const state2 = mutableState(rawStore, {
      mode: "production",
      owner: { type: "debug", name: "owner2" }
    });
    expect(state1[OWNER]).toBe(null);
    expect(state1.users[OWNER]).toBe(null);
    expect(state1.users[0][OWNER]).toBe(null);
    expect(state1.users[0].profile[OWNER]).toBe(null);
    expect(state2[OWNER]).toBe(null);
    expect(state2.users[OWNER]).toBe(null);
    expect(state2.users[0][OWNER]).toBe(null);
    expect(state2.users[0].profile[OWNER]).toBe(null);
    expect(state1).toBe(state2);
  });
});

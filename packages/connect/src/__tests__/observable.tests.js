import { observable, observe, isObservable, raw } from "..";

describe("observable", () => {
  it("should return a new observable when no argument is provided", () => {
    const obs = observable();
    expect(isObservable(obs)).toEqual(true);
  });

  it("should return an observable wrapping of an object argument", () => {
    const obj = { prop: "value" };
    const obs = observable(obj);
    expect(obs).not.toBe(obj);
    expect(isObservable(obs)).toEqual(true);
  });

  it("should return the argument if it is already an observable", () => {
    const obs1 = observable();
    const obs2 = observable(obs1);
    expect(obs1).toEqual(obs2);
  });

  it("should return the same observable wrapper when called repeatedly with the same argument", () => {
    const obj = { prop: "value" };
    const obs1 = observable(obj);
    const obs2 = observable(obj);
    expect(obs1).toEqual(obs2);
  });

  it("should not throw on none writable nested objects, should simply not observe them instead", () => {
    let dummy;
    const obj = {};
    Object.defineProperty(obj, "prop", {
      value: { num: 12 },
      writable: false,
      configurable: false
    });
    const obs = observable(obj);
    expect(() => observe(() => (dummy = obs.prop.num))).not.toThrow();
    expect(dummy).toEqual(12);
    obj.prop.num = 13;
    expect(dummy).toEqual(12);
  });

  it("should convert to observables on the fly", () => {
    const obj = {};
    const obs = observable(obj);
    obs.nested1 = {};
    obs.nested2 = observable();
    expect(isObservable(obj.nested1)).toEqual(false);
    expect(isObservable(obj.nested2)).toEqual(false);
    expect(isObservable(obs.nested1)).toEqual(true);
    expect(isObservable(obs.nested2)).toEqual(true);
  });

  it("should run a function with the root observable as argument", () => {
    const obj = {
      prop1: 1,
      prop2: ({ state }) => state.prop1 + 1,
      nested1: {
        prop3: ({ state }) => state.prop1 + 2,
        prop4: ({ state }) => state.prop2 + state.nested1.prop3
      }
    };
    const obs = observable(obj);
    expect(obs.prop1).toEqual(1);
    expect(obs.prop2).toEqual(2);
    expect(obs.nested1.prop3).toEqual(3);
    expect(obs.nested1.prop4).toEqual(5);
  });

  it("should be able to return functions from root functions", () => {
    const obj = {
      prop1: 1,
      prop2: ({ state }) => num => state.prop1 + num,
      nested1: {
        prop3: ({ state }) => num => state.prop1 + num,
        prop4: ({ state }) => num =>
          state.prop2(num) + state.nested1.prop3(num) + num
      }
    };
    const obs = observable(obj);
    expect(obs.prop1).toEqual(1);
    expect(obs.prop2(2)).toEqual(3);
    expect(obs.nested1.prop3(3)).toEqual(4);
    expect(obs.nested1.prop4(2)).toEqual(8);
  });

  it("iterating an object", () => {
    const obj = { a: "a", b: "b", c: "c" };
    const obs = observable(obj);

    for (let key in obs) {
      expect(obs[key]).toEqual(obj[key]);
    }
  });

  it("should allow making arrays observable", () => {
    const arr = [];
    const obs = observable(arr);
    expect(isObservable(obs)).toEqual(true);
  });

  it("should update the observable when adding new properties", () => {
    const arr = [];
    const obs = observable(arr);

    obs.push(1);
    expect(obs[0]).toEqual(1);

    obs.push({ name: "Jon Snow" });
    expect(isObservable(obs[1])).toEqual(true);
    expect(obs[1].name).toEqual("Jon Snow");
  });

  it("should allow iterating array", () => {
    const arr = [{ name: "a" }, { name: "b" }, { name: "c" }];
    const obs = observable(arr);

    let i = 0;
    for (let key of obs) {
      expect(key).toEqual(arr[i]);
      i++;
    }
  });

  it("length works correctly", () => {
    const arr = [];
    const obs = observable(arr);

    expect(obs.length).toEqual(0);

    obs.push("hello");
    expect(obs.length).toEqual(1);
  });

  it("state can access the property `state`", () => {
    const obj = { state: { user: "test" } };
    const obs = observable(obj);

    expect(obs.state).toEqual(obj.state);
  });

  it("Object.keys works", () => {
    const obj = { a: 1, b: 2 };
    const obs = observable(obj);

    const keys = Object.keys(obs);

    expect(keys).toEqual(["a", "b"]);
  });
});

describe("isObservable", () => {
  it("should return true if an observable is passed as argument", () => {
    const obs = observable();
    const isObs = isObservable(obs);
    expect(isObs).toEqual(true);
  });

  it("should return false if a non observable is passed as argument", () => {
    const obj1 = { prop: "value" };
    const obj2 = new Proxy({}, {});
    const isObs1 = isObservable(obj1);
    const isObs2 = isObservable(obj2);
    expect(isObs1).toEqual(false);
    expect(isObs2).toEqual(false);
  });

  it("should return false if a primitive is passed as argument", () => {
    expect(isObservable(12)).toEqual(false);
  });
});

describe("raw", () => {
  it("should return the raw non-reactive object", () => {
    const obj = {};
    const obs = observable(obj);
    expect(raw(obs)).toEqual(obj);
    expect(raw(obj)).toEqual(obj);
  });

  it("should work with plain primitives", () => {
    expect(raw(12)).toEqual(12);
  });
});

describe("Test object references", () => {
  const context = {
    id: 1,
    action: "action-1",
    path: "action.action-1",
    triggeredBy: {
      type: "component",
      name: "Post"
    }
  };

  let proxy, state;
  beforeEach(() => {
    state = {
      number: 41,
      allUsers: [{ name: "Jon", surname: "Snow" }],
      user: {
        name: "Jon",
        surname: "Snow",
        location: {
          city: "Winterfell",
          area: "Westeros"
        }
      }
    };
    proxy = observable(state, context);
  });

  test("Simply updating the state tree leaf works", () => {
    proxy.number = 42;

    expect(state.number).toEqual(42);
    expect(proxy.number).toEqual(42);

    proxy.number = 43;

    expect(state.number).toEqual(43);
    expect(proxy.number).toEqual(43);
  });

  test("Nested array", () => {
    const store = observable({
      state: {
        type: ["a"]
      }
    });

    const newState = { type: ["b"] };
    store.state = newState;

    expect(store.state).toEqual(newState);
  });

  test("Nested object", () => {
    const store = observable({
      state: {
        type: {
          a: 1
        }
      }
    });

    const newState = {
      type: {
        a: 2
      }
    };
    store.state = newState;

    expect(store.state).toEqual(newState);
  });

  test("Proxies correctly reference the current state", () => {
    expect(proxy.user.surname).toBe("Snow");

    proxy.user.surname = "Targerean";
    expect(proxy.user.surname).toBe("Targerean");

    proxy.user = {
      name: "Jon",
      surname: "Lanister"
    };
    expect(proxy.user.surname).toBe("Lanister");
  });

  test("Internal references point to the current state", () => {
    const user = proxy.user;
    expect(user.surname).toBe("Snow");
    // Overwrite the reference.
    proxy.user = {
      name: "Jon",
      surname: "Targerean"
    };
    expect(user.surname).toBe("Targerean");
  });

  test("Proxy references are being preserved", () => {
    // store internal references.
    const user = proxy.user;
    const location = proxy.user.location;

    expect(proxy.user.surname).toBe("Snow");
    expect(user.surname).toBe("Snow");

    proxy.user = {
      name: "Jon",
      surname: "Targerean",
      location: {}
    };

    expect(proxy.user.surname).toBe("Targerean");
    expect(user.surname).toBe("Targerean");

    // The references shouldn't change.
    expect(user).toBe(proxy.user); // <- use "toBe", not "toEqual"
    expect(location).toBe(proxy.user.location); // <- use "toBe", not "toEqual"
  });

  test("Proxies work correctly with arrays", () => {
    expect(state.allUsers[0].name).toBe("Jon");
    expect(proxy.allUsers[0].name).toBe("Jon");

    proxy.allUsers.push({ name: "Arya", surname: "Stark" });
    expect(state.allUsers[1].name).toBe("Arya");
    expect(proxy.allUsers[1].name).toBe("Arya");
  });

  test("ownKeys work", () => {
    expect(Object.keys(state)).toEqual(["number", "allUsers", "user"]);
    expect(Object.keys(state.user)).toEqual(["name", "surname", "location"]);
  });
});

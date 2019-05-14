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

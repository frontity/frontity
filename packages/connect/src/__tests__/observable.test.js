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

  it("should never let observables leak into the underlying raw object", () => {
    const obj = {};
    const obs = observable(obj);
    obs.nested1 = {};
    obs.nested2 = observable();
    expect(isObservable(obj.nested1)).toEqual(false);
    expect(isObservable(obj.nested2)).toEqual(false);
    expect(isObservable(obs.nested1)).toEqual(false);
    expect(isObservable(obs.nested2)).toEqual(true);
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

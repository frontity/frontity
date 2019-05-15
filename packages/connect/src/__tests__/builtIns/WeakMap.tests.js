/* eslint no-unused-expressions: 0, no-unused-vars: 0 */
import { observable, isObservable, observe, raw } from "../..";

describe("WeakMap", () => {
  it("should be a proper JS WeakMap", () => {
    const map = observable(new WeakMap());
    expect(map).toBeInstanceOf(WeakMap);
    expect(raw(map)).toBeInstanceOf(WeakMap);
  });

  it("should observe mutations", () => {
    let dummy;
    const key = {};
    const map = observable(new WeakMap());
    observe(() => (dummy = map.get(key)));

    expect(dummy).toEqual(undefined);
    map.set(key, "value");
    expect(dummy).toEqual("value");
    map.set(key, "value2");
    expect(dummy).toEqual("value2");
    map.delete(key);
    expect(dummy).toEqual(undefined);
  });

  it("should not observe custom property mutations", () => {
    let dummy;
    const map = observable(new WeakMap());
    observe(() => (dummy = map.customProp));

    expect(dummy).toEqual(undefined);
    map.customProp = "Hello World";
    expect(dummy).toEqual(undefined);
  });

  it("should not observe non value changing mutations", () => {
    let dummy;
    const key = {};
    const map = observable(new WeakMap());
    const mapSpy = jest.fn(() => (dummy = map.get(key)));
    observe(mapSpy);

    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(1);
    map.set(key, "value");
    expect(dummy).toEqual("value");
    expect(mapSpy.mock.calls.length).toEqual(2);
    map.set(key, "value");
    expect(dummy).toEqual("value");
    expect(mapSpy.mock.calls.length).toEqual(2);
    map.delete(key);
    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(3);
    map.delete(key);
    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(3);
  });

  it("should not observe raw data", () => {
    const key = {};
    let dummy;
    const map = observable(new WeakMap());
    observe(() => (dummy = raw(map).get(key)));

    expect(dummy).toEqual(undefined);
    map.set(key, "Hello");
    expect(dummy).toEqual(undefined);
    map.delete(key);
    expect(dummy).toEqual(undefined);
  });

  it("should not be triggered by raw mutations", () => {
    const key = {};
    let dummy;
    const map = observable(new WeakMap());
    observe(() => (dummy = map.get(key)));

    expect(dummy).toEqual(undefined);
    raw(map).set(key, "Hello");
    expect(dummy).toEqual(undefined);
    raw(map).delete(key);
    expect(dummy).toEqual(undefined);
  });

  it("should wrap object values with observables when requested from a reaction", () => {
    const key = {};
    const key2 = {};
    const map = observable(new Map());
    map.set(key, {});
    map.set(key2, {});

    expect(isObservable(map.get(key))).toBe(false);
    expect(isObservable(map.get(key2))).toBe(false);
    observe(() => expect(isObservable(map.get(key))).toBe(true));
    expect(isObservable(map.get(key))).toBe(true);
    expect(isObservable(map.get(key2))).toBe(false);
  });
});

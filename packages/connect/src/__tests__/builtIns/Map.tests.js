import { observable, isObservable, observe, raw } from "../..";

describe("Map", () => {
  it("should be a proper JS Map", () => {
    const map = observable(new Map());
    expect(map).toBeInstanceOf(Map);
    expect(raw(map)).toBeInstanceOf(Map);
  });

  it("should observe mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.get("key")));

    expect(dummy).toEqual(undefined);
    map.set("key", "value");
    expect(dummy).toEqual("value");
    map.set("key", "value2");
    expect(dummy).toEqual("value2");
    map.delete("key");
    expect(dummy).toEqual(undefined);
  });

  it("should observe size mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.size));

    expect(dummy).toEqual(0);
    map.set("key1", "value");
    map.set("key2", "value2");
    expect(dummy).toEqual(2);
    map.delete("key1");
    expect(dummy).toEqual(1);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should observe for of iteration", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map) {
        dummy += num;
      }
    });

    expect(dummy).toEqual(0);
    map.set("key0", 3);
    expect(dummy).toEqual(3);
    map.set("key1", 2);
    expect(dummy).toEqual(5);
    map.delete("key0");
    expect(dummy).toEqual(2);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should observe forEach iteration", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      map.forEach(num => (dummy += num));
    });

    expect(dummy).toEqual(0);
    map.set("key0", 3);
    expect(dummy).toEqual(3);
    map.set("key1", 2);
    expect(dummy).toEqual(5);
    map.delete("key0");
    expect(dummy).toEqual(2);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should observe keys iteration", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      for (let key of map.keys()) {
        dummy += key;
      }
    });

    expect(dummy).toEqual(0);
    map.set(3, 3);
    expect(dummy).toEqual(3);
    map.set(2, 2);
    expect(dummy).toEqual(5);
    map.delete(3);
    expect(dummy).toEqual(2);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should observe values iteration", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      for (let num of map.values()) {
        dummy += num;
      }
    });

    expect(dummy).toEqual(0);
    map.set("key0", 3);
    expect(dummy).toEqual(3);
    map.set("key1", 2);
    expect(dummy).toEqual(5);
    map.delete("key0");
    expect(dummy).toEqual(2);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should observe entries iteration", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map.entries()) {
        dummy += num;
      }
    });

    expect(dummy).toEqual(0);
    map.set("key0", 3);
    expect(dummy).toEqual(3);
    map.set("key1", 2);
    expect(dummy).toEqual(5);
    map.delete("key0");
    expect(dummy).toEqual(2);
    map.clear();
    expect(dummy).toEqual(0);
  });

  it("should be triggered by clearing", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.get("key")));

    expect(dummy).toEqual(undefined);
    map.set("key", 3);
    expect(dummy).toEqual(3);
    map.clear();
    expect(dummy).toEqual(undefined);
  });

  it("should not observe custom property mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.customProp));

    expect(dummy).toEqual(undefined);
    map.customProp = "Hello World";
    expect(dummy).toEqual(undefined);
  });

  it("should not observe non value changing mutations", () => {
    let dummy;
    const map = observable(new Map());
    const mapSpy = jest.fn(() => (dummy = map.get("key")));
    observe(mapSpy);

    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(1);
    map.set("key", "value");
    expect(dummy).toEqual("value");
    expect(mapSpy.mock.calls.length).toEqual(2);
    map.set("key", "value");
    expect(dummy).toEqual("value");
    expect(mapSpy.mock.calls.length).toEqual(2);
    map.delete("key");
    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(3);
    map.delete("key");
    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(3);
    map.clear();
    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(3);
  });

  it("should not observe raw data", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = raw(map).get("key")));

    expect(dummy).toEqual(undefined);
    map.set("key", "Hello");
    expect(dummy).toEqual(undefined);
    map.delete("key");
    expect(dummy).toEqual(undefined);
  });

  it("should not observe raw iterations", () => {
    let dummy = 0;
    const map = observable(new Map());
    observe(() => {
      dummy = 0;
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map).entries()) {
        dummy += num;
      }
      for (let key of raw(map).keys()) {
        dummy += raw(map).get(key);
      }
      for (let num of raw(map).values()) {
        dummy += num;
      }
      raw(map).forEach(num => {
        dummy += num;
      });
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map)) {
        dummy += num;
      }
    });

    expect(dummy).toEqual(0);
    map.set("key1", 2);
    map.set("key2", 3);
    expect(dummy).toEqual(0);
    map.delete("key1");
    expect(dummy).toEqual(0);
  });

  it("should not be triggered by raw mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.get("key")));

    expect(dummy).toEqual(undefined);
    raw(map).set("key", "Hello");
    expect(dummy).toEqual(undefined);
    dummy = "Thing";
    raw(map).delete("key");
    expect(dummy).toEqual("Thing");
    raw(map).clear();
    expect(dummy).toEqual("Thing");
  });

  it("should not observe raw size mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = raw(map).size));

    expect(dummy).toEqual(0);
    map.set("key", "value");
    expect(dummy).toEqual(0);
  });

  it("should not be triggered by raw size mutations", () => {
    let dummy;
    const map = observable(new Map());
    observe(() => (dummy = map.size));

    expect(dummy).toEqual(0);
    raw(map).set("key", "value");
    expect(dummy).toEqual(0);
  });

  it("should support objects as key", () => {
    let dummy;
    const key = {};
    const map = observable(new Map());
    const mapSpy = jest.fn(() => (dummy = map.get(key)));
    observe(mapSpy);

    expect(dummy).toEqual(undefined);
    expect(mapSpy.mock.calls.length).toEqual(1);

    map.set(key, 1);
    expect(dummy).toEqual(1);
    expect(mapSpy.mock.calls.length).toEqual(2);

    map.set({}, 2);
    expect(dummy).toEqual(1);
    expect(mapSpy.mock.calls.length).toEqual(2);
  });

  it("should wrap object values with observables when requested from a reaction", () => {
    const map = observable(new Map());
    map.set("key", {});
    map.set("key2", {});

    expect(isObservable(map.get("key"))).toBe(false);
    expect(isObservable(map.get("key2"))).toBe(false);
    observe(() => expect(isObservable(map.get("key"))).toBe(true));
    expect(isObservable(map.get("key"))).toBe(true);
    expect(isObservable(map.get("key2"))).toBe(false);
  });

  it("should wrap object values with observables when iterated from a reaction", () => {
    const map = observable(new Map());
    map.set("key", {});

    map.forEach(value => expect(isObservable(value)).toBe(false));
    for (let [, value] of map) {
      expect(isObservable(value)).toBe(false);
    }
    for (let [, value] of map.entries()) {
      expect(isObservable(value)).toBe(false);
    }
    for (let value of map.values()) {
      expect(isObservable(value)).toBe(false);
    }

    observe(() => {
      map.forEach(value => expect(isObservable(value)).toBe(true));
      for (let [, value] of map) {
        expect(isObservable(value)).toBe(true);
      }
      for (let [, value] of map.entries()) {
        expect(isObservable(value)).toBe(true);
      }
      for (let value of map.values()) {
        expect(isObservable(value)).toBe(true);
      }
    });

    map.forEach(value => expect(isObservable(value)).toBe(true));
    for (let [, value] of map) {
      expect(isObservable(value)).toBe(true);
    }
    for (let [, value] of map.entries()) {
      expect(isObservable(value)).toBe(true);
    }
    for (let value of map.values()) {
      expect(isObservable(value)).toBe(true);
    }
  });
});

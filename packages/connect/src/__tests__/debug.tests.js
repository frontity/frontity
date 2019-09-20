import { observe, observable } from "..";

describe("debugger", () => {
  it("should debug get operations", () => {
    let dummy;
    const rawCounter = { num: 0 };
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(() => (dummy = counter.num), {
      debugger: debugSpy
    });

    expect(dummy).toEqual(0);
    expect(debugSpy.mock.calls.length).toEqual(1);
    expect(debugSpy.mock.calls[0]).toEqual([
      {
        type: "get",
        target: rawCounter,
        key: "num",
        receiver: counter
      }
    ]);
  });

  it("should debug has operations", () => {
    let dummy;
    const rawCounter = {};
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(() => (dummy = "num" in counter), {
      debugger: debugSpy
    });

    expect(dummy).toEqual(false);
    expect(debugSpy.mock.calls.length).toEqual(1);
    expect(debugSpy.mock.calls[0]).toEqual([
      {
        type: "has",
        target: rawCounter,
        key: "num"
      }
    ]);
  });

  it("should debug iteration operations", () => {
    let dummy;
    const rawCounter = { num: 0 };
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(
      () => {
        for (const key in counter) {
          dummy = key;
        }
      },
      {
        debugger: debugSpy
      }
    );

    expect(dummy).toEqual("num");
    expect(debugSpy.mock.calls.length).toEqual(1);
    expect(debugSpy.mock.calls[0]).toEqual([
      {
        type: "iterate",
        target: rawCounter
      }
    ]);
  });

  it("should debug add operations", () => {
    let dummy;
    const rawCounter = {};
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(() => (dummy = counter.num), {
      debugger: debugSpy
    });

    expect(dummy).toEqual(undefined);
    expect(debugSpy.mock.calls.length).toEqual(1);
    counter.num = 12;
    expect(dummy).toEqual(12);
    expect(debugSpy.mock.calls.length).toEqual(3);
    expect(debugSpy.mock.calls[1]).toEqual([
      {
        type: "add",
        target: rawCounter,
        key: "num",
        value: 12,
        receiver: counter
      }
    ]);
  });

  it("should debug set operations", () => {
    let dummy;
    const rawCounter = { num: 0 };
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(() => (dummy = counter.num), {
      debugger: debugSpy
    });

    expect(dummy).toEqual(0);
    expect(debugSpy.mock.calls.length).toEqual(1);
    counter.num = 12;
    expect(dummy).toEqual(12);
    expect(debugSpy.mock.calls.length).toEqual(3);
    expect(debugSpy.mock.calls[1]).toEqual([
      {
        type: "set",
        target: rawCounter,
        key: "num",
        value: 12,
        oldValue: 0,
        receiver: counter
      }
    ]);
  });

  it("should debug delete operations", () => {
    let dummy;
    const rawCounter = { num: 0 };
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(() => {});
    observe(() => (dummy = counter.num), {
      debugger: debugSpy
    });

    expect(dummy).toEqual(0);
    expect(debugSpy.mock.calls.length).toEqual(1);
    delete counter.num;
    expect(dummy).toEqual(undefined);
    expect(debugSpy.mock.calls.length).toEqual(3);
    expect(debugSpy.mock.calls[1]).toEqual([
      {
        type: "delete",
        target: rawCounter,
        key: "num",
        oldValue: 0
      }
    ]);
  });

  it("should not cause infinite loops", () => {
    let receiverDummy;
    const rawCounter = { num: 0 };
    const counter = observable(rawCounter);
    const debugSpy = jest.fn(({ receiver }) => (receiverDummy = receiver.num));
    observe(() => counter.num, {
      debugger: debugSpy
    });

    expect(receiverDummy).toEqual(0);
    expect(debugSpy.mock.calls.length).toEqual(1);
  });
});

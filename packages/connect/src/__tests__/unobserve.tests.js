import { observable, observe, unobserve } from "..";

describe("unobserve", () => {
  it("should unobserve the observed function", () => {
    let dummy;
    const counter = observable({ num: 0 });
    const counterSpy = jest.fn(() => (dummy = counter.num));
    const reaction = observe(counterSpy);

    expect(counterSpy.mock.calls.length).toEqual(1);
    counter.num = "Hello";
    expect(counterSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Hello");
    unobserve(reaction);
    counter.num = "World";
    expect(counterSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Hello");
  });

  it("should unobserve when the same key is used multiple times", () => {
    let dummy;
    const user = observable({ name: { name: "Bob" } });
    const nameSpy = jest.fn(() => (dummy = user.name.name));
    const reaction = observe(nameSpy);

    expect(nameSpy.mock.calls.length).toEqual(1);
    user.name.name = "Dave";
    expect(nameSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Dave");
    unobserve(reaction);
    user.name.name = "Ann";
    expect(nameSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Dave");
  });

  it("should unobserve multiple reactions for the same target and key", () => {
    let dummy;
    const counter = observable({ num: 0 });

    const reaction1 = observe(() => (dummy = counter.num));
    const reaction2 = observe(() => (dummy = counter.num));
    const reaction3 = observe(() => (dummy = counter.num));

    expect(dummy).toEqual(0);
    unobserve(reaction1);
    unobserve(reaction2);
    unobserve(reaction3);
    counter.num++;
    expect(dummy).toEqual(0);
  });

  it("should not reobserve unobserved reactions on manual execution", () => {
    let dummy;
    const obj = observable();
    const reaction = observe(() => (dummy = obj.prop));

    expect(dummy).toEqual(undefined);
    unobserve(reaction);
    reaction();
    obj.prop = 12;
    expect(dummy).toEqual(undefined);
  });

  it("should have the same effect, when called multiple times", () => {
    let dummy;
    const counter = observable({ num: 0 });
    const counterSpy = jest.fn(() => (dummy = counter.num));
    const reaction = observe(counterSpy);

    expect(counterSpy.mock.calls.length).toEqual(1);
    counter.num = "Hello";
    expect(counterSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Hello");
    unobserve(reaction);
    unobserve(reaction);
    unobserve(reaction);
    counter.num = "World";
    expect(counterSpy.mock.calls.length).toEqual(2);
    expect(dummy).toEqual("Hello");
  });

  it("should call scheduler.delete", () => {
    const counter = observable({ num: 0 });
    const fn = jest.fn(() => counter.num);
    const scheduler = { add: () => {}, delete: jest.fn(() => {}) };
    const reaction = observe(fn, { scheduler });

    counter.num++;
    unobserve(reaction);
    expect(scheduler.delete.mock.calls.length).toEqual(1);
  });
});

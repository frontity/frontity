import { observe, observable, raw } from "..";

describe("observe", () => {
  it("should run the passed function once (wrapped by a reaction)", () => {
    const fnSpy = jest.fn(() => {});
    observe(fnSpy);
    expect(fnSpy.mock.calls.length).toEqual(1);
  });

  it("should observe basic properties", () => {
    let dummy;
    const counter = observable({ num: 0 });
    observe(() => (dummy = counter.num));

    expect(dummy).toEqual(0);
    counter.num = 7;
    expect(dummy).toEqual(7);
  });

  it("should observe multiple properties", () => {
    let dummy;
    const counter = observable({ num1: 0, num2: 0 });
    observe(() => (dummy = counter.num1 + counter.num1 + counter.num2));

    expect(dummy).toEqual(0);
    counter.num1 = counter.num2 = 7;
    expect(dummy).toEqual(21);
  });

  it("should handle multiple reactions", () => {
    let dummy1, dummy2;
    const counter = observable({ num: 0 });
    observe(() => (dummy1 = counter.num));
    observe(() => (dummy2 = counter.num));

    expect(dummy1).toEqual(0);
    expect(dummy2).toEqual(0);
    counter.num++;
    expect(dummy1).toEqual(1);
    expect(dummy2).toEqual(1);
  });

  it("should observe nested properties", () => {
    let dummy;
    const counter = observable({ nested: { num: 0 } });
    observe(() => (dummy = counter.nested.num));

    expect(dummy).toEqual(0);
    counter.nested.num = 8;
    expect(dummy).toEqual(8);
  });

  it("should observe delete operations", () => {
    let dummy;
    const obj = observable({ prop: "value" });
    observe(() => (dummy = obj.prop));

    expect(dummy).toEqual("value");
    delete obj.prop;
    expect(dummy).toEqual(undefined);
  });

  it("should observe has operations", () => {
    let dummy;
    const obj = observable({ prop: "value" });
    observe(() => (dummy = "prop" in obj));

    expect(dummy).toEqual(true);
    delete obj.prop;
    expect(dummy).toEqual(false);
    obj.prop = 12;
    expect(dummy).toEqual(true);
  });

  it("should observe properties on the prototype chain", () => {
    let dummy;
    const counter = observable({ num: 0 });
    const parentCounter = observable({ num: 2 });
    Object.setPrototypeOf(counter, parentCounter);
    observe(() => (dummy = counter.num));

    expect(dummy).toEqual(0);
    delete counter.num;
    expect(dummy).toEqual(2);
    parentCounter.num = 4;
    expect(dummy).toEqual(4);
    counter.num = 3;
    expect(dummy).toEqual(3);
  });

  it("should observe has operations on the prototype chain", () => {
    let dummy;
    const counter = observable({ num: 0 });
    const parentCounter = observable({ num: 2 });
    Object.setPrototypeOf(counter, parentCounter);
    observe(() => (dummy = "num" in counter));

    expect(dummy).toEqual(true);
    delete counter.num;
    expect(dummy).toEqual(true);
    delete parentCounter.num;
    expect(dummy).toEqual(false);
    counter.num = 3;
    expect(dummy).toEqual(true);
  });

  it("should observe inherited property accessors", () => {
    let dummy, parentDummy, hiddenValue;
    const obj = observable({});
    const parent = observable({
      set prop(value) {
        hiddenValue = value;
      },
      get prop() {
        return hiddenValue;
      }
    });
    Object.setPrototypeOf(obj, parent);
    observe(() => (dummy = obj.prop));
    observe(() => (parentDummy = parent.prop));

    expect(dummy).toEqual(undefined);
    expect(parentDummy).toEqual(undefined);
    obj.prop = 4;
    expect(dummy).toEqual(4);
    // this doesn't work, should it?
    // expect(parentDummy).toEqual(4)
    parent.prop = 2;
    expect(dummy).toEqual(2);
    expect(parentDummy).toEqual(2);
  });

  it("should observe function call chains", () => {
    let dummy;
    const counter = observable({ num: 0 });
    function getNum() {
      return counter.num;
    }
    observe(() => (dummy = getNum()));

    expect(dummy).toEqual(0);
    counter.num = 2;
    expect(dummy).toEqual(2);
  });

  it("should observe iteration", () => {
    let dummy;
    const list = observable(["Hello"]);
    observe(() => (dummy = list.join(" ")));

    expect(dummy).toEqual("Hello");
    list.push("World!");
    expect(dummy).toEqual("Hello World!");
    list.shift();
    expect(dummy).toEqual("World!");
  });

  it("should observe implicit array length changes", () => {
    let dummy;
    const list = observable(["Hello"]);
    observe(() => (dummy = list.join(" ")));

    expect(dummy).toEqual("Hello");
    list[1] = "World!";
    expect(dummy).toEqual("Hello World!");
    list[3] = "Hello!";
    expect(dummy).toEqual("Hello World!  Hello!");
  });

  it("should observe sparse array mutations", () => {
    let dummy;
    const list = observable([]);
    list[1] = "World!";
    observe(() => (dummy = list.join(" ")));

    expect(dummy).toEqual(" World!");
    list[0] = "Hello";
    expect(dummy).toEqual("Hello World!");
    list.pop();
    expect(dummy).toEqual("Hello");
  });

  it("should observe enumeration", () => {
    let dummy = 0;
    const numbers = observable({ num1: 3 });
    observe(() => {
      dummy = 0;
      for (let key in numbers) {
        dummy += numbers[key];
      }
    });

    expect(dummy).toEqual(3);
    numbers.num2 = 4;
    expect(dummy).toEqual(7);
    delete numbers.num1;
    expect(dummy).toEqual(4);
  });

  it("should observe symbol keyed properties", () => {
    const key = Symbol("symbol keyed prop");
    let dummy, hasDummy;
    const obj = observable({ [key]: "value" });
    observe(() => (dummy = obj[key]));
    observe(() => (hasDummy = key in obj));

    expect(dummy).toEqual("value");
    expect(hasDummy).toEqual(true);
    obj[key] = "newValue";
    expect(dummy).toEqual("newValue");
    delete obj[key];
    expect(dummy).toEqual(undefined);
    expect(hasDummy).toEqual(false);
  });

  it("should not observe well-known symbol keyed properties", () => {
    const key = Symbol.isConcatSpreadable;
    let dummy;
    const array = observable([]);
    observe(() => (dummy = array[key]));

    expect(array[key]).toEqual(undefined);
    expect(dummy).toEqual(undefined);
    array[key] = true;
    expect(array[key]).toEqual(true);
    expect(dummy).toEqual(undefined);
  });

  it("should not observe set operations without a value change", () => {
    let hasDummy, getDummy;
    const obj = observable({ prop: "value" });

    const getSpy = jest.fn(() => (getDummy = obj.prop));
    const hasSpy = jest.fn(() => (hasDummy = "prop" in obj));
    observe(getSpy);
    observe(hasSpy);

    expect(getDummy).toEqual("value");
    expect(hasDummy).toEqual(true);
    obj.prop = "value";
    expect(getSpy.mock.calls.length).toEqual(1);
    expect(hasSpy.mock.calls.length).toEqual(1);
    expect(getDummy).toEqual("value");
    expect(hasDummy).toEqual(true);
  });

  it("should not observe raw mutations", () => {
    let dummy;
    const obj = observable();
    observe(() => (dummy = raw(obj).prop));

    expect(dummy).toEqual(undefined);
    obj.prop = "value";
    expect(dummy).toEqual(undefined);
  });

  it("should not be triggered by raw mutations", () => {
    let dummy;
    const obj = observable();
    observe(() => (dummy = obj.prop));

    expect(dummy).toEqual(undefined);
    raw(obj).prop = "value";
    expect(dummy).toEqual(undefined);
  });

  it("should not be triggered by inherited raw setters", () => {
    let dummy, parentDummy, hiddenValue;
    const obj = observable({});
    const parent = observable({
      set prop(value) {
        hiddenValue = value;
      },
      get prop() {
        return hiddenValue;
      }
    });
    Object.setPrototypeOf(obj, parent);
    observe(() => (dummy = obj.prop));
    observe(() => (parentDummy = parent.prop));

    expect(dummy).toEqual(undefined);
    expect(parentDummy).toEqual(undefined);
    raw(obj).prop = 4;
    expect(dummy).toEqual(undefined);
    expect(parentDummy).toEqual(undefined);
  });

  it("should avoid implicit infinite recursive loops with itself", () => {
    const counter = observable({ num: 0 });

    const counterSpy = jest.fn(() => counter.num++);
    observe(counterSpy);
    expect(counter.num).toEqual(1);
    expect(counterSpy.mock.calls.length).toEqual(1);
    counter.num = 4;
    expect(counter.num).toEqual(5);
    expect(counterSpy.mock.calls.length).toEqual(2);
  });

  it("should allow explicitly recursive raw function loops", () => {
    const counter = observable({ num: 0 });

    // TODO: this should be changed to reaction loops, can it be done?
    const numSpy = jest.fn(() => {
      counter.num++;
      if (counter.num < 10) {
        numSpy();
      }
    });
    observe(numSpy);

    expect(counter.num).toEqual(10);
    expect(numSpy.mock.calls.length).toEqual(10);
  });

  it("should avoid infinite loops with other reactions", () => {
    const nums = observable({ num1: 0, num2: 1 });

    const spy1 = jest.fn(() => (nums.num1 = nums.num2));
    const spy2 = jest.fn(() => (nums.num2 = nums.num1));
    observe(spy1);
    observe(spy2);
    expect(nums.num1).toEqual(1);
    expect(nums.num2).toEqual(1);
    expect(spy1.mock.calls.length).toEqual(1);
    expect(spy2.mock.calls.length).toEqual(1);
    nums.num2 = 4;
    expect(nums.num1).toEqual(4);
    expect(nums.num2).toEqual(4);
    expect(spy1.mock.calls.length).toEqual(2);
    expect(spy2.mock.calls.length).toEqual(2);
    nums.num1 = 10;
    expect(nums.num1).toEqual(10);
    expect(nums.num2).toEqual(10);
    expect(spy1.mock.calls.length).toEqual(3);
    expect(spy2.mock.calls.length).toEqual(3);
  });

  it("should return a new reactive version of the function", () => {
    function greet() {
      return "Hello World";
    }
    const reaction1 = observe(greet);
    const reaction2 = observe(greet);
    expect(typeof reaction1).toBe("function");
    expect(typeof reaction2).toBe("function");
    expect(reaction1).not.toEqual(greet);
    expect(reaction1).not.toEqual(reaction2);
  });

  it("should wrap the passed function seamlessly", () => {
    function greet(name) {
      return `Hello ${this.prefix} ${name}!`;
    }
    const reaction = observe(greet, { lazy: true });
    expect(reaction.call({ prefix: "Mr." }, "World")).toEqual(
      "Hello Mr. World!"
    );
  });

  it("should discover new branches while running automatically", () => {
    let dummy;
    const obj = observable({ prop: "value", run: false });

    const conditionalSpy = jest.fn(() => {
      dummy = obj.run ? obj.prop : "other";
    });
    observe(conditionalSpy);

    expect(dummy).toEqual("other");
    expect(conditionalSpy.mock.calls.length).toEqual(1);
    obj.prop = "Hi";
    expect(dummy).toEqual("other");
    expect(conditionalSpy.mock.calls.length).toEqual(1);
    obj.run = true;
    expect(dummy).toEqual("Hi");
    expect(conditionalSpy.mock.calls.length).toEqual(2);
    obj.prop = "World";
    expect(dummy).toEqual("World");
    expect(conditionalSpy.mock.calls.length).toEqual(3);
  });

  it("should discover new branches when running manually", () => {
    let dummy;
    let run = false;
    const obj = observable({ prop: "value" });
    const reaction = observe(() => {
      dummy = run ? obj.prop : "other";
    });

    expect(dummy).toEqual("other");
    reaction();
    expect(dummy).toEqual("other");
    run = true;
    reaction();
    expect(dummy).toEqual("value");
    obj.prop = "World";
    expect(dummy).toEqual("World");
  });

  it("should not be triggered by mutating a property, which is used in an inactive branch", () => {
    let dummy;
    const obj = observable({ prop: "value", run: true });

    const conditionalSpy = jest.fn(() => {
      dummy = obj.run ? obj.prop : "other";
    });
    observe(conditionalSpy);

    expect(dummy).toEqual("value");
    expect(conditionalSpy.mock.calls.length).toEqual(1);
    obj.run = false;
    expect(dummy).toEqual("other");
    expect(conditionalSpy.mock.calls.length).toEqual(2);
    obj.prop = "value2";
    expect(dummy).toEqual("other");
    expect(conditionalSpy.mock.calls.length).toEqual(2);
  });

  it("should not double wrap if the passed function is a reaction", () => {
    const reaction = observe(() => {});
    const otherReaction = observe(reaction);
    expect(reaction).toEqual(otherReaction);
  });

  it("should not run multiple times for a single mutation", () => {
    let dummy;
    const obj = observable();
    const fnSpy = jest.fn(() => {
      for (const key in obj) {
        dummy = obj[key];
      }
      dummy = obj.prop;
    });
    observe(fnSpy);

    expect(fnSpy.mock.calls.length).toEqual(1);
    obj.prop = 16;
    expect(dummy).toEqual(16);
    expect(fnSpy.mock.calls.length).toEqual(2);
  });

  it("should allow nested reactions", () => {
    const nums = observable({ num1: 0, num2: 1, num3: 2 });
    const dummy = {};

    const childSpy = jest.fn(() => (dummy.num1 = nums.num1));
    const childReaction = observe(childSpy);
    const parentSpy = jest.fn(() => {
      dummy.num2 = nums.num2;
      childReaction();
      dummy.num3 = nums.num3;
    });
    observe(parentSpy);

    expect(dummy).toEqual({ num1: 0, num2: 1, num3: 2 });
    expect(parentSpy.mock.calls.length).toEqual(1);
    expect(childSpy.mock.calls.length).toEqual(2);
    // this should only call the childReaction
    nums.num1 = 4;
    expect(dummy).toEqual({ num1: 4, num2: 1, num3: 2 });
    expect(parentSpy.mock.calls.length).toEqual(1);
    expect(childSpy.mock.calls.length).toEqual(3);
    // this calls the parentReaction, which calls the childReaction once
    nums.num2 = 10;
    expect(dummy).toEqual({ num1: 4, num2: 10, num3: 2 });
    expect(parentSpy.mock.calls.length).toEqual(2);
    expect(childSpy.mock.calls.length).toEqual(4);
    // this calls the parentReaction, which calls the childReaction once
    nums.num3 = 7;
    expect(dummy).toEqual({ num1: 4, num2: 10, num3: 7 });
    expect(parentSpy.mock.calls.length).toEqual(3);
    expect(childSpy.mock.calls.length).toEqual(5);
  });
});

describe("options", () => {
  describe("lazy", () => {
    it("should not run the passed function, if set to true", () => {
      const fnSpy = jest.fn(() => {});
      observe(fnSpy, { lazy: true });
      expect(fnSpy.mock.calls.length).toEqual(0);
    });

    it("should default to false", () => {
      const fnSpy = jest.fn(() => {});
      observe(fnSpy);
      expect(fnSpy.mock.calls.length).toEqual(1);
    });
  });

  describe("scheduler", () => {
    it("should call the scheduler function with the reaction instead of running it sync", () => {
      const counter = observable({ num: 0 });
      const fn = jest.fn(() => counter.num);
      const scheduler = jest.fn(() => {});
      const reaction = observe(fn, { scheduler });

      expect(fn.mock.calls.length).toEqual(1);
      expect(scheduler.mock.calls.length).toEqual(0);
      counter.num++;
      expect(fn.mock.calls.length).toEqual(1);
      expect(scheduler.mock.calls.length).toEqual(1);
      expect(scheduler.mock.calls[0]).toEqual([reaction]);
    });

    it("should call scheduler.add with the reaction instead of running it sync", () => {
      const counter = observable({ num: 0 });
      const fn = jest.fn(() => counter.num);
      const scheduler = { add: jest.fn(() => {}), delete: () => {} };
      const reaction = observe(fn, { scheduler });

      expect(fn.mock.calls.length).toEqual(1);
      expect(scheduler.add.mock.calls.length).toEqual(0);
      counter.num++;
      expect(fn.mock.calls.length).toEqual(1);
      expect(scheduler.add.mock.calls.length).toEqual(1);
      expect(scheduler.add.mock.calls[0]).toEqual([reaction]);
    });
  });

  it("should not error when a DOM element is added", async () => {
    let dummy = null;
    const observed = observable({ obj: null });
    observe(() => (dummy = observed.obj && observed.obj.nodeType));

    expect(dummy).toEqual(null);
    observed.obj = document;
    expect(dummy).toEqual(9);
  });
});

import generateAsyncQueue from "../generate-async-queue";

const delayPromise = (ms: number, val?: unknown) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (val ? resolve(val) : reject()), ms)
  );

describe("generateAsyncQueue", () => {
  test("should order promises correctly", async () => {
    const promises: [string, Promise<unknown>][] = [
      ["test", delayPromise(10, "first")],
      ["test", delayPromise(500, "third")],
      ["test", delayPromise(11, "second")],
      ["test", delayPromise(501, "fourth")],
    ];

    const generator = generateAsyncQueue(promises);

    expect((await generator.next()).value).toEqual(["test", "first"]);
    expect((await generator.next()).value).toEqual(["test", "second"]);
    expect((await generator.next()).value).toEqual(["test", "third"]);
    expect((await generator.next()).value).toEqual(["test", "fourth"]);

    const lastValue = await generator.next();
    expect(lastValue.value).toBe(undefined);
    expect(lastValue.done).toBe(true);
  });

  test("should handle rejections with simple try...catch", async () => {
    const promises: [string, Promise<unknown>][] = [
      ["test", delayPromise(10, "first")],
      ["test", delayPromise(11)],
      ["test", delayPromise(500, "second")], // this should never be reached
    ];

    const generator = generateAsyncQueue(promises);

    expect((await generator.next()).value).toEqual(["test", "first"]);

    try {
      await generator.next();
    } catch (e) {
      // eslint-disable-next-line
      expect(e).toBe(undefined);
      return;
    }

    // This is a hack to ensure that we never get to this place and return after
    // having thrown the error
    expect(() => undefined).not.toBeCalled();
  });
});

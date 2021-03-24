import generateAsyncQueue from "../generate-async-queue";

const delayPromise = (ms: number, val?: unknown) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (val ? resolve(val) : reject()), ms)
  );

describe("generateAsyncQueue", () => {
  test("should order promises correctly", async () => {
    const promises = [
      delayPromise(10, "first"),
      delayPromise(500, "third"),
      delayPromise(11, "second"),
      delayPromise(501, "fourth"),
    ];

    const generator = generateAsyncQueue(promises);

    expect((await generator.next()).value).toBe("first");
    expect((await generator.next()).value).toBe("second");
    expect((await generator.next()).value).toBe("third");
    expect((await generator.next()).value).toBe("fourth");

    const lastValue = await generator.next();
    expect(lastValue.value).toBe(undefined);
    expect(lastValue.done).toBe(true);
  });

  test("should handle rejections with simple try...catch", async () => {
    const promises = [
      delayPromise(10, "first"),
      delayPromise(500, "second"),
      delayPromise(11),
    ];

    const generator = generateAsyncQueue(promises);

    expect((await generator.next()).value).toBe("first");

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

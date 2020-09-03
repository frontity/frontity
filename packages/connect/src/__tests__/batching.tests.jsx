import React from "react";
import { create, act } from "react-test-renderer";
import connect, { Provider, createStore, batch } from "..";

let store, renderCount, app;

beforeEach(() => {
  store = createStore({
    state: {
      number: "1",
    },
  });

  renderCount = 0;
  const Comp = ({ state }) => {
    renderCount++;
    return <div>{state.number}</div>;
  };
  const Connected = connect(Comp);
  app = create(
    <Provider value={store}>
      <Connected />
    </Provider>
  );
});

describe("batching", () => {
  test("should batch state changes inside a batch() wrapper", () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    act(() =>
      batch(() => {
        store.state.number = "2";
        store.state.number = "3";
      })
    );
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
  });

  test("should work with nested batch() calls", () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    act(() =>
      batch(() => {
        batch(() => {
          store.state.number = "2";
          store.state.number = "3";
        });
        expect(app).toMatchSnapshot();
        store.state.number = "4";
        store.state.number = "5";
      })
    );
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
  });

  /**
   * Skip because it started failing when we upgraded to Jest 26, but we are
   * going to remove it once we merge this PR anyway:
   * https://github.com/frontity/frontity/pull/415.
   */
  test.skip("should batch state changes inside native event listeners", () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    const batched = act(() =>
      batch(() => {
        store.state.number = "2";
        store.state.number = "3";
      })
    );
    document.body.addEventListener("click", batched);
    document.body.dispatchEvent(new Event("click"));
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
    document.body.removeEventListener("click", batched);
  });

  test("should batch changes in setTimeout and setInterval", async () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    await new Promise((resolve) =>
      setTimeout(() => {
        act(() => {
          store.state.number = "2";
          store.state.number = "3";
          resolve();
        });
      }, 100)
    );
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
  });

  test("should batch changes in requestAnimationFrame and requestIdleCallback", async () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    await new Promise((resolve) =>
      // eslint-disable-next-line
      requestAnimationFrame(() => {
        act(() => {
          store.state.number = "2";
          store.state.number = "3";
          resolve();
        });
      })
    );
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
  });

  test("should batch changes in Promise.then and Promise.catch", async () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    await Promise.resolve().then(() => {
      act(() => {
        store.state.number = "2";
        store.state.number = "3";
      });
    });
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
    await Promise.reject(new Error()).catch(() => {
      act(() => {
        store.state.number = "5";
        store.state.number = "6";
      });
    });
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(3);
  });

  test("should batch changes in async function parts", async () => {
    expect(renderCount).toBe(1);
    expect(app).toMatchSnapshot();
    await Promise.resolve();
    act(() => {
      store.state.number = "2";
      store.state.number = "3";
    });
    // ISSUE -> here it is not yet updated!!! -> the then block is not over I guess
    await Promise.resolve();
    expect(app).toMatchSnapshot();
    expect(renderCount).toBe(2);
  });

  test("should not break Promises", async () => {
    return await Promise.resolve(12)
      .then((value) => {
        expect(value).toBe(12);
        // eslint-disable-next-line
        throw 15;
      })
      .catch((err) => {
        expect(err).toBe(15);
      });
  });

  test("should not break setTimeout", async () => {
    await new Promise((resolve) => {
      setTimeout(
        (arg1, arg2, arg3) => {
          expect(arg1).toBe("Hello");
          expect(arg2).toBe("World");
          expect(arg3).toBe(undefined);
          resolve();
        },
        100,
        "Hello",
        "World"
      );
    });
  });

  test("should not break event listeners", () => {
    let callCount = 0;
    const fn = () => callCount++;
    document.body.addEventListener("click", fn);
    expect(callCount).toBe(0);
    document.body.dispatchEvent(new Event("click"));
    expect(callCount).toBe(1);
    document.body.removeEventListener("click", fn);
    document.body.dispatchEvent(new Event("click"));
    expect(callCount).toBe(1);
  });

  test("should not break method this value and args", (done) => {
    const socket = new WebSocket("ws://www.example.com");
    socket.onclose = function (ev) {
      expect(ev).toBeDefined();
      expect(this).toBe(socket);
      done();
    };
    socket.close();
  });

  test("should not break callback this value and args", (done) => {
    const ctx = {};
    setTimeout(
      function (arg1, arg2) {
        expect(arg1).toBe("Test");
        expect(arg2).toBe("Test2");
        expect(this).toBe(ctx);
        done();
      }.bind(ctx),
      0,
      "Test",
      "Test2"
    );
  });

  test("should not break return value", () => {
    const result = batch(() => 12);
    expect(result).toBe(12);
  });
});

import React from "react";
import { create, act } from "react-test-renderer";
import { createStore, connect } from "../../..";
import { Provider } from "@frontity/connect";
import useFills from "../use-fills";
import { toJson, toJsonArray } from "./slot.tests";

let store;

// Spy on the console.warn calls
const warn = jest.spyOn(global.console, "warn");

const FillComponent = ({ name, number }) => (
  <div id="test-fill" data-number={number} data-name={name}>
    Im a Fill
  </div>
);

beforeEach(() => {
  warn.mockClear();

  store = createStore({
    actions: {
      fillActions: {
        setNumber: ({ state }) => (number: number) => {
          state.fills.namespace1["test fill 1"].props.number = number;
        },
      },
    },
    state: {
      fills: {
        namespace1: {
          "test fill 1": {
            slot: "slot 1",
            library: "namespace1.FillComponent",
            props: {
              number: 1,
            },
          },
          "test fill 2": {
            slot: "slot 2",
            library: "namespace1.FillComponent",
          },
        },
        namespace2: {
          "test fill 3": {
            slot: "slot 3",
            library: "namespace2.FillComponent",
            priority: 1,
            props: {
              number: 3,
            },
          },
        },
      },
    },
    libraries: {
      fills: {
        namespace1: {
          FillComponent,
        },
        namespace2: {
          FillComponent,
        },
      },
    },
  });
});

describe("useFills", () => {
  it("should work in the most basic case", () => {
    const Comp = connect(() => {
      const fills = useFills("slot 1");

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app).props).toEqual({
      id: "test-fill",
      "data-number": 1,
      "data-name": "namespace1 - test fill 1",
    });
    expect(toJson(app).children[0]).toEqual("Im a Fill");

    expect(toJson(app)).toMatchSnapshot();
  });

  it("should work when the slot does not exist", () => {
    const Comp = connect(() => {
      const fills = useFills("slot that does not exist");

      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should remind to specify the slot name if called without arguments", () => {
    const warn = jest.spyOn(global.console, "warn");

    const Comp = connect(() => {
      // This is just to trick typescript to allow us to call
      // useFills without any arguments
      const useFills2: any = useFills;
      const fills = useFills2();

      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(warn.mock.calls[0][0]).toMatch(
      "You should pass the name of the slot that you would like to fill!"
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should warn when the Fill component is not found in libraries", () => {
    const warn = jest.spyOn(global.console, "warn");

    const Comp = connect(() => {
      // This is just to trick typescript to allow us to call
      // useFills without any arguments
      const useFills2: any = useFills;
      const fills = useFills2();

      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(warn.mock.calls[0][0]).toMatch(
      "You should pass the name of the slot that you would like to fill!"
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should not return the fill when library is not specified", () => {
    delete store.state.fills.namespace1["test fill 1"].library;

    const Comp = connect(() => {
      const fills = useFills("slot 1");
      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should not return the fill when library doesn't match a component in libraries", () => {
    store.state.fills.namespace1["test fill 1"].library = "FillComponent";

    const Comp = connect(() => {
      const fills = useFills("slot 1");
      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should not return the fill when the slot is not specified", () => {
    delete store.state.fills.namespace1["test fill 1"].slot;

    const Comp = connect(() => {
      const fills = useFills("slot 1");
      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should work when `state.fills` is missing", () => {
    delete store.state.fills;

    const Comp = connect(() => {
      const fills = useFills("slot 1");
      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should work when `state.fills` doesn't contain any fills", () => {
    store.state.fills = {};

    const Comp = connect(() => {
      const fills = useFills("slot 1");
      expect(fills).toEqual([]);

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    expect(toJson(app)).toEqual(null);
    expect(toJson(app)).toMatchSnapshot();
  });

  it("should re-render the fill when updating the props", () => {
    const Comp = connect(() => {
      const fills = useFills("slot 1");

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    act(() => {
      store.actions.fillActions.setNumber(43);
    });

    expect(toJson(app).props).toEqual({
      id: "test-fill",
      "data-number": 43,
      "data-name": "namespace1 - test fill 1",
    });
    expect(toJson(app).children[0]).toEqual("Im a Fill");

    expect(toJson(app)).toMatchSnapshot();
  });

  it("should render the fills in the order of priority", () => {
    store.state.fills.namespace2["test fill 3"].slot = "slot 1";

    const Comp = connect(() => {
      const fills = useFills("slot 1");

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    // This fill should come first
    expect(toJsonArray(app)[0].props).toEqual({
      id: "test-fill",
      "data-number": 3,
      "data-name": "namespace2 - test fill 3",
    });

    // This fill should come second
    expect(toJsonArray(app)[1].props).toEqual({
      id: "test-fill",
      "data-number": 1,
      "data-name": "namespace1 - test fill 1",
    });

    expect(toJsonArray(app)).toMatchSnapshot();
  });

  it("should skip rendering the fills with value `false`", () => {
    store.state.fills.namespace2["test fill 3"].slot = "slot 1";
    store.state.fills.namespace1["test fill 1"] = false;

    const Comp = connect(() => {
      const fills = useFills("slot 1");

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    // We should only render 1 component.
    expect(toJson(app).props).toEqual({
      id: "test-fill",
      "data-number": 3,
      "data-name": "namespace2 - test fill 3",
    });

    expect(toJson(app)).toMatchSnapshot();
  });

  it("should render the debug slots when `state.frontity.debug` is true", () => {
    store.state.frontity = { debug: true };

    const Comp = connect(() => {
      const fills = useFills("slot 1");

      return (
        <>
          {fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} {...props} />
          ))}
        </>
      );
    });

    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );

    // We should only render 1 component.
    expect(toJson(app).props["data-slot-name"]).toBe("slot 1");

    expect(toJson(app)).toMatchSnapshot();
  });
});

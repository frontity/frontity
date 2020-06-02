/* eslint-disable react/prop-types */
import React from "react";
import { create, act } from "react-test-renderer";
import { createStore, connect } from "../../..";
import { Provider } from "@frontity/connect";
import useFills from "../use-fills";

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
  it("Should work in the most basic case", () => {
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

    expect(app.toJSON().props).toEqual({
      id: "test-fill",
      "data-number": 1,
      "data-name": "namespace1 - test fill 1",
    });
    expect(app.toJSON().children[0]).toEqual("Im a Fill");

    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should work when the slot does not exist", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should remind to specify the slot name if called without arguments", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should warn when the Fill component is not found in libraries", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should not return the fill when library is not specified", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should not return the fill when library doesn't match a component in libraries", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should not return the fill when the slot is not specified", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should work when `state.fills` is missing", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should work when `state.fills` doesn't contain any fills", () => {
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

    expect(app.toJSON()).toEqual(null);
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should re-render the fill when updating the props", () => {
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

    expect(app.toJSON().props).toEqual({
      id: "test-fill",
      "data-number": 43,
      "data-name": "namespace1 - test fill 1",
    });
    expect(app.toJSON().children[0]).toEqual("Im a Fill");

    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should render the fills in the order of priority", () => {
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
    expect(app.toJSON()[0].props).toEqual({
      id: "test-fill",
      "data-number": 3,
      "data-name": "namespace2 - test fill 3",
    });

    // This fill should come second
    expect(app.toJSON()[1].props).toEqual({
      id: "test-fill",
      "data-number": 1,
      "data-name": "namespace1 - test fill 1",
    });

    expect(app.toJSON()).toMatchSnapshot();
  });

  it("Should skip rendering the fills with value `false`", () => {
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
    expect(app.toJSON().props).toEqual({
      id: "test-fill",
      "data-number": 3,
      "data-name": "namespace2 - test fill 3",
    });

    expect(app.toJSON()).toMatchSnapshot();
  });
});

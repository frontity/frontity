import React from "react";
import { create } from "react-test-renderer";
import { createStore } from "frontity";
import { Provider } from "@frontity/connect";
import Slot from "../slot";

let store;

const SimpleFill = () => <div>Im a Fill</div>;
const DataFill = ({ data }) => <div>{data}</div>;
const PropFill = ({ whateverProp }) => <div>{whateverProp}</div>;

beforeEach(() => {
  store = createStore({
    state: {
      source: {
        get: jest.fn(() => () => "This would normally be data for this route"),
      },
      router: {},
      fills: {
        namespace1: {
          "simple fill": {
            slot: "slot 1",
            library: "namespace1.SimpleFill",
          },
          "fill with data": {
            slot: "slot 2",
            library: "namespace1.DataFill",
          },
          "fill with a prop": {
            slot: "slot 3",
            library: "namespace1.PropFill",
          },
          "fill with overriden prop": {
            slot: "slot 4",
            library: "namespace1.PropFill",
            props: {
              whateverProp: "This should render instead",
            },
          },
        },
      },
    },
    libraries: {
      fills: {
        namespace1: {
          SimpleFill,
          DataFill,
          PropFill,
        },
      },
    },
  });
});

describe("Slot", () => {
  it("should work in the most basic case", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="slot 1" />
      </Provider>
    );

    expect(app.toJSON().children[0]).toEqual("Im a Fill");
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should render children as a fallback", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="this slot does not exist">fallback</Slot>
      </Provider>
    );

    expect(app.toJSON()).toEqual("fallback");
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should read the data from state.source and pass it to the Fill", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="slot 2" />
      </Provider>
    );

    expect(app.toJSON().children[0]).toEqual(
      "This would normally be data for this route"
    );
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should pass the data prop to the Fill", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="slot 2" data={"Data passed as prop"} />
      </Provider>
    );

    expect(app.toJSON().children[0]).toEqual("Data passed as prop");
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should pass any other extra prop to the Fill", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="slot 3" whateverProp={"Data passed as prop"} />
      </Provider>
    );

    expect(app.toJSON().children[0]).toEqual("Data passed as prop");
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should override the prop provided by the theme creator with the one given by the user", () => {
    const app = create(
      <Provider value={store}>
        <Slot name="slot 4" whateverProp={"This should NOT render"} />
      </Provider>
    );

    expect(app.toJSON().children[0]).toEqual("This should render instead");
    expect(app.toJSON()).toMatchSnapshot();
  });
});

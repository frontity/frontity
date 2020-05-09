/* eslint-disable react/prop-types */
import React from "react";
import { create } from "react-test-renderer";
import { createStore } from "frontity";
import { Provider } from "@frontity/connect";
import useFills from "./use-fills";

let store;

const FillComponent = () => <div>Hi, Im Phil, Im a Fill</div>;

beforeEach(() => {
  store = createStore({
    state: {
      fills: {
        "test fill": {
          slot: "slot 1",
          library: "FillComponent",
          priority: 10,
          props: {
            number: 42,
          },
        },
      },
    },
    libraries: {
      fills: {
        FillComponent,
      },
    },
  });
});

describe("test", () => {
  it("should work", () => {
    const Comp = () => {
      const fills = useFills("test fill");

      return fills.map(({ Fill, props }) => <Fill key={props.id} {...props} />);
    };
    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });
});

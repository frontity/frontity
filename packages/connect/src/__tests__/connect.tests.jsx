/* eslint-disable react/prop-types */
import React from "react";
import { create } from "react-test-renderer";
import connect, { Provider, createStore } from "..";

let store;

beforeEach(() => {
  store = createStore({
    state: {
      prop1: "prop1"
    }
  });
});

describe("connect", () => {
  it("should pass state to functional components", () => {
    const Comp = ({ state }) => <div>{state.prop1}</div>;
    const Connected = connect(Comp);
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });

  it("should pass state to class components", () => {
    class Comp extends React.Component {
      render() {
        return <div>{this.props.state.prop1}</div>;
      }
    }
    const Connected = connect(Comp);
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });
});

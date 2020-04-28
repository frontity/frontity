/* eslint-disable react/prop-types */
import React from "react";
import { create, act } from "react-test-renderer";
import connect, { Provider, createStore, useConnect } from "..";

let store;

const Component = () => <div>component from library</div>;

beforeEach(() => {
  store = createStore({
    state: {
      prop1: 1,
      prop2: ({ state }) => state.prop1 + 1,
      prop3: ({ state }) => (num) => state.prop1 + num,
    },
    actions: {
      action1: ({ state }) => {
        state.prop1 = 2;
      },
      action2: ({ state }) => (num) => {
        state.prop1 = num;
      },
    },
    libraries: {
      Component,
    },
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

  it("should pass derived state", () => {
    const Comp = ({ state }) => <div>{state.prop2}</div>;
    const Connected = connect(Comp);
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });

  it("should pass derived state functions", () => {
    const Comp = ({ state }) => <div>{state.prop3(2)}</div>;
    const Connected = connect(Comp);
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });

  it("should pass actions and react to changes", () => {
    const Comp1 = ({ actions }) => (
      <button onClick={actions.action1}>change prop1</button>
    );
    const Comp2 = ({ state }) => <div>{state.prop1}</div>;
    const Connected1 = connect(Comp1);
    const Connected2 = connect(Comp2);
    const app = create(
      <Provider value={store}>
        <Connected1 />
        <Connected2 />
      </Provider>
    );
    expect(app).toMatchSnapshot();
    const rootInstance = app.root;
    const button = rootInstance.findByType("button");
    act(() => button.props.onClick());
    expect(app).toMatchSnapshot();
  });

  it("should pass actions and react to derived changes", () => {
    const Comp1 = ({ actions }) => (
      <button onClick={actions.action1}>change prop1</button>
    );
    const Comp2 = ({ state }) => <div>{state.prop2}</div>;
    const Connected1 = connect(Comp1);
    const Connected2 = connect(Comp2);
    const app = create(
      <Provider value={store}>
        <Connected1 />
        <Connected2 />
      </Provider>
    );
    expect(app).toMatchSnapshot();
    const rootInstance = app.root;
    const button = rootInstance.findByType("button");
    act(() => button.props.onClick());
    expect(app).toMatchSnapshot();
  });

  it("should pass actions with params and react to changes", () => {
    const Comp1 = ({ actions }) => (
      <button onClick={() => actions.action2(4)}>change prop1</button>
    );
    const Comp2 = ({ state }) => <div>{state.prop1}</div>;
    const Connected1 = connect(Comp1);
    const Connected2 = connect(Comp2);
    const app = create(
      <Provider value={store}>
        <Connected1 />
        <Connected2 />
      </Provider>
    );
    expect(app).toMatchSnapshot();
    const rootInstance = app.root;
    const button = rootInstance.findByType("button");
    act(() => button.props.onClick());
    expect(app).toMatchSnapshot();
  });

  it("should pass other props passed to store", () => {
    const Comp = ({ libraries }) => {
      const Component = libraries.Component;
      return (
        <div>
          <Component />
        </div>
      );
    };
    const Connected = connect(Comp);
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });

  it("should not inject props if `injectProps` option is `false`", () => {
    const Comp = ({ state, actions, libraries }) => {
      const hasState = (!!state).toString();
      const hasActions = (!!actions).toString();
      const hasLibraries = (!!libraries).toString();

      return (
        <>
          <div>hasState: {hasState}</div>
          <div>hasActions: {hasActions}</div>
          <div>hasLibraries: {hasLibraries}</div>
        </>
      );
    };
    const Connected = connect(Comp, { injectProps: false });
    const app = create(
      <Provider value={store}>
        <Connected />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });
});

describe("useConnect", () => {
  it("should pass state, derived state and derived state functions", () => {
    const Comp = connect(() => {
      const { state } = useConnect();
      return (
        <>
          <div>{state.prop1}</div>
          <div>{state.prop2}</div>
          <div>{state.prop3(2)}</div>
        </>
      );
    });
    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });

  it("should pass actions and actions with params", () => {
    const Comp = connect(() => {
      const { state, actions } = useConnect();
      return (
        <>
          <button id="no-params" onClick={() => actions.action1()}>
            change prop1
          </button>
          <button id="with-params" onClick={() => actions.action2(3)}>
            change prop1 with params
          </button>
          <div>{state.prop1}</div>
        </>
      );
    });
    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );
    expect(app).toMatchSnapshot();
    const rootInstance = app.root;
    const button1 = rootInstance.findByProps({ id: "no-params" });
    act(() => button1.props.onClick());
    expect(app).toMatchSnapshot();
    const button2 = rootInstance.findByProps({ id: "with-params" });
    act(() => button2.props.onClick());
    expect(app).toMatchSnapshot();
  });

  it("should pass libraries", () => {
    const Comp = connect(() => {
      const { libraries } = useConnect();
      return <libraries.Component />;
    });
    const app = create(
      <Provider value={store}>
        <Comp />
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });
});

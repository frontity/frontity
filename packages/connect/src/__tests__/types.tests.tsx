import connect, { useConnect, createStore } from "..";
import {
  Action,
  AsyncAction,
  Derived,
  Connect,
  Package,
} from "@frontity/types";

const delay = () => new Promise((resolve) => setTimeout(resolve, 100));

interface Config extends Package {
  state: {
    namespace1: {
      prop1: number;
      prop2: number;
      prop3: Derived<Config, number>;
      prop4: Derived<Config, number, number>;
      prop5: number;
    };
  };
  actions: {
    namespace1: {
      action1: Action<Config>;
      action2: Action<Config>;
    };
    namespace2: {
      action3: Action<Config>;
      action4: Action<Config>;
      action5: Action<Config, number>;
      action6: AsyncAction<Config>;
      action7: AsyncAction<Config, number>;
    };
  };
  libraries?: {
    namespace1: {
      prop6: number;
    };
  };
}

const config: Config = {
  state: {
    namespace1: {
      prop1: 1,
      prop2: 2,
      prop3: ({ state }) => state.namespace1.prop1 + state.namespace1.prop2,
      prop4: ({ state }) => (num) => state.namespace1.prop3 + num,
      prop5: 5,
    },
  },
  actions: {
    namespace1: {
      action1: ({ state }) => {
        state.namespace1.prop1 = 11;
      },
      action2: ({ state }) => {
        state.namespace1.prop1 = 12;
      },
    },
    namespace2: {
      action3: ({ state, actions }) => {
        actions.namespace1.action1();
        actions.namespace2.action5(1);
        state.namespace1.prop5 = state.namespace1.prop3;
      },
      action4: ({ state }) => {
        state.namespace1.prop5 = state.namespace1.prop4(4);
      },
      action5: ({ state }) => (num) => {
        state.namespace1.prop5 = state.namespace1.prop4(num);
      },
      action6: async ({ state }) => {
        await delay();
        state.namespace1.prop1 = 6;
      },
      action7: ({ state, libraries }) => async (num) => {
        await delay();
        state.namespace1.prop1 = num;
        const n: number = libraries.namespace1.prop6;
      },
    },
  },
  libraries: {
    namespace1: {
      prop6: 6,
    },
  },
};

test("After creating a store all derived state and actions are fine", () => {
  const store = createStore(config);

  const prop1: number = store.state.namespace1.prop1;
  const prop2: number = store.state.namespace1.prop2;
  const prop3: number = store.state.namespace1.prop3;
  const prop4: number = store.state.namespace1.prop4(1);
  const prop5: number = store.state.namespace1.prop5;
  const prop6: number = store.libraries.namespace1.prop6;

  store.actions.namespace1.action1();
  store.actions.namespace1.action2();
  store.actions.namespace2.action3();
  store.actions.namespace2.action4();
  store.actions.namespace2.action5(1);

  const asyncFn = async () => {
    await store.actions.namespace2.action6();
    await store.actions.namespace2.action7(7);
  };
});

type Props = Connect<
  Config,
  {
    ownProp1: number;
    optionalProp2?: string;
  }
>;

let Component: (props: Props) => JSX.Element;

test("Injected state and actions are fine", () => {
  // eslint-disable-next-line react/display-name
  Component = ({ state, actions, libraries, ownProp1, optionalProp2 }) => {
    const prop1: number = state.namespace1.prop1;
    const prop2: number = state.namespace1.prop2;
    const prop3: number = state.namespace1.prop3;
    const prop4: number = state.namespace1.prop4(1);
    const prop5: number = state.namespace1.prop5;
    const prop6: number = libraries.namespace1.prop6;

    actions.namespace1.action1();
    actions.namespace1.action2();
    actions.namespace2.action3();
    actions.namespace2.action4();
    actions.namespace2.action5(1);

    const ownProp1Const: number = ownProp1;
    const ownProp2Const: string = optionalProp2;

    return <div>My connected component</div>;
  };
});

test("Connected components only require own props", () => {
  const ConnectedComponent = connect(Component);
  () => <ConnectedComponent ownProp1={1} />;
});

test("connect can receive `inpectProps` option", () => {
  connect(Component, { injectProps: false });
});

test("useConnect returns the proper types", () => {
  const Component = () => {
    const { state, actions, libraries } = useConnect<Config>();

    const prop1: number = state.namespace1.prop1;
    const prop2: number = state.namespace1.prop2;
    const prop3: number = state.namespace1.prop3;
    const prop4: number = state.namespace1.prop4(1);
    const prop5: number = state.namespace1.prop5;
    const prop6: number = libraries.namespace1.prop6;

    actions.namespace1.action1();
    actions.namespace1.action2();
    actions.namespace2.action3();
    actions.namespace2.action4();
    actions.namespace2.action5(1);

    return <div>My useConnect component</div>;
  };
});

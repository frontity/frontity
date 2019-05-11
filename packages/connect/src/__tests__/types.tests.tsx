import React from "react";
import connect, { createStore, Action, Derived, Connect } from "..";

interface Config {
  state: {
    prop1: number;
    nested1: {
      prop2: number;
      prop3: Derived<Config, number>;
      prop4: Derived<Config, number, number>;
      prop5: number;
    };
  };
  actions: {
    action1: Action<Config>;
    nested1: {
      action2: Action<Config>;
    };
    nested2: {
      nested3: {
        action3: Action<Config>;
        action4: Action<Config>;
        action5: Action<Config, number>;
      };
    };
  };
  extra?: {
    prop6: number;
  };
}

const config: Config = {
  state: {
    prop1: 1,
    nested1: {
      prop2: 2,
      prop3: state => state.prop1 + state.nested1.prop2,
      prop4: state => num => state.nested1.prop3 + num,
      prop5: 5
    }
  },
  actions: {
    action1: state => {
      state.prop1 = 11;
    },
    nested1: {
      action2: state => {
        state.prop1 = 12;
      }
    },
    nested2: {
      nested3: {
        action3: state => {
          state.nested1.prop5 = state.nested1.prop3;
        },
        action4: state => {
          state.nested1.prop5 = state.nested1.prop4(4);
        },
        action5: state => num => {
          state.nested1.prop5 = state.nested1.prop4(num);
        }
      }
    }
  },
  extra: {
    prop6: 6
  }
};

test("After creating a store all derived state and actions are fine", () => {
  const store = createStore(config);

  const prop1: number = store.state.prop1;
  const prop2: number = store.state.nested1.prop2;
  const prop3: number = store.state.nested1.prop3;
  const prop4: number = store.state.nested1.prop4(1);
  const prop5: number = store.state.nested1.prop5;
  const prop6: number = store.extra.prop6;

  store.actions.action1();
  store.actions.nested1.action2();
  store.actions.nested2.nested3.action3();
  store.actions.nested2.nested3.action4();
  store.actions.nested2.nested3.action5(1);
});

type Props = Connect<
  Config,
  {
    ownProp1: number;
    optionalProp2?: string;
  }
>;

let Component: React.FC<Props>;

test("Injected state and actions are fine", () => {
  Component = ({ state, actions, extra, ownProp1, optionalProp2 }) => {
    const prop1: number = state.prop1;
    const prop2: number = state.nested1.prop2;
    const prop3: number = state.nested1.prop3;
    const prop4: number = state.nested1.prop4(1);
    const prop5: number = state.nested1.prop5;
    const prop6: number = extra.prop6;

    actions.action1();
    actions.nested1.action2();
    actions.nested2.nested3.action3();
    actions.nested2.nested3.action4();
    actions.nested2.nested3.action5(1);

    const ownProp1Const: number = ownProp1;
    const ownProp2Const: string = optionalProp2;

    return <div>My connected component</div>;
  };
});

test("Connected components only require own props", () => {
  const ConnectedComponent = connect(Component);

  const ParentComponent: React.FC = () => <ConnectedComponent ownProp1={1} />;
});

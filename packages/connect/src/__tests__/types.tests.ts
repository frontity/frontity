import { createStore, Action, Derived } from "..";

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
}

const config: Config = {
  state: {
    prop1: 1,
    nested1: {
      prop2: 2,
      prop3: state => state.prop1 + state.nested1.prop2,
      prop4: state => num => state.nested1.prop3 + num,
      prop5: 0
    }
  },
  actions: {
    action1: state => {
      state.prop1 = 2;
    },
    nested1: {
      action2: state => {
        state.prop1 = 3;
      }
    },
    nested2: {
      nested3: {
        action3: state => {
          state.nested1.prop5 = state.nested1.prop3;
        },
        action4: state => {
          state.nested1.prop5 = state.nested1.prop4(2);
        },
        action5: state => num => {
          state.nested1.prop5 = state.nested1.prop4(num);
        }
      }
    }
  }
};

const store = createStore(config);

const prop1: number = store.state.prop1;
const prop2: number = store.state.nested1.prop2;
const prop3: number = store.state.nested1.prop3;
const prop4: number = store.state.nested1.prop4(1);
const prop5: number = store.state.nested1.prop5;

const action1: () => void = store.actions.action1;
const action2: () => void = store.actions.nested1.action2;
const action3: () => void = store.actions.nested2.nested3.action3;
const action4: () => void = store.actions.nested2.nested3.action4;
const action5: (num: number) => void = store.actions.nested2.nested3.action5;

test("Types are fine!", () => {});

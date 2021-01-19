/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import * as React from "react";
import Connect, { ConnectFunction } from "../connect";
import { FilterInjectedProps } from "../utils";
import { Action, AsyncAction } from "../action";
import Package from "../package";
import Derived from "../derived";

interface Package1 extends Package {
  name: "package-1";
  state: {
    namespace1: {
      prop1: string;
      prop2: number;
      prop3: Derived<Package1, string>;
      prop4: Derived<Package1, string, number>;
      array1: string[];
      nested1: {
        prop5: Derived<Package1, string, number>;
        array2: number[];
        nested2: {
          prop6: Derived<Package1, string>;
        };
      };
    };
  };
  actions: {
    namespace1: {
      action1: Action<Package1>;
      action2: AsyncAction<Package1>;
    };
    namespace2: {
      action3: Action<Package1, string>;
      action4: AsyncAction<Package1, number>;
    };
  };
  libraries: {
    namespace3: {
      library1: () => void;
      Component1: React.FC<{ html: string }>;
      Component2: React.ComponentClass<{ html: string }>;
    };
  };
}

interface OwnProps {
  ownProp1: string;
  name: string;
}

const Component1: React.FC<Connect<Package1, { html: string }>> = ({
  state,
  actions,
  libraries,
  html,
}) => {
  state;
  actions;
  libraries;
  return <div>{html}</div>;
};

class Component2 extends React.Component<Connect<Package1, { html: string }>> {
  render() {
    this.props.state;
    this.props.actions;
    this.props.libraries;
    return <div>{this.props.html}</div>;
  }
}

const connect: ConnectFunction = (comp) => comp;

const ConnectedComponent1 = connect(Component1);
const ConnectedComponent2 = connect(Component2);
connect(Component1, { injectProps: false });
connect(Component2, { injectProps: false });

const internalProps: Connect<Package1, OwnProps> = {
  state: {
    namespace1: {
      prop1: "prop1",
      prop2: 2,
      prop3: "prop3",
      prop4: (str) => str.length,
      array1: ["array1"],
      nested1: {
        prop5: (str) => str.length,
        array2: [2],
        nested2: {
          prop6: "prop6",
        },
      },
    },
  },
  actions: {
    namespace1: {
      action1: () => {},
      action2: async () => {},
    },
    namespace2: {
      action3: (str) => {
        const str2: string = str;
      },
      action4: async (num) => {
        const num2: number = num;
      },
    },
  },
  libraries: {
    namespace3: {
      library1: () => {},
      Component1: ConnectedComponent1,
      Component2: ConnectedComponent2,
    },
  },
  ownProp1: "ownProp1",
  name: "nameProp",
};

internalProps.actions.namespace1.action1();
internalProps.actions.namespace1.action2();
internalProps.actions.namespace2.action3("123");
internalProps.actions.namespace2.action4(123);

const externalProps: FilterInjectedProps<Connect<Package1, OwnProps>> = {
  ownProp1: "ownProp1",
  name: "nameProp",
};

test("Types are fine!", () => {});

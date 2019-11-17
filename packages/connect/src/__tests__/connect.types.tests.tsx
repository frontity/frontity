/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Connect, Store, Action, Derived } from "../../types";
import connect from "..";

interface MyStore extends Store {
  state: {
    prop1: number;
    derived1: Derived<MyStore, number>;
    derived2: Derived<MyStore, number, string>;
  };
  actions: {
    action1: Action<MyStore>;
    action2: Action<MyStore, number>;
  };
  libraries: {
    lib1: string;
  };
}

type Props = Connect<
  MyStore,
  {
    ownProp1: number;
    optionalProp2?: string;
  }
>;

const Component: React.FC<Props> = ({
  state,
  actions,
  libraries,
  ownProp1,
  optionalProp2
}) => {
  const num1: number = state.prop1;
  const num2: number = state.derived1;
  const str1: string = state.derived2(2);
  actions.action1();
  actions.action2(2);
  const str2: string = libraries.lib1;
  const num3: number = ownProp1;
  const str3: string = optionalProp2;
  return <div />;
};

const Connected = connect(Component);

const App1 = () => <Connected ownProp1={1} />;
const App2 = () => <Connected ownProp1={1} optionalProp2={"2"} />;

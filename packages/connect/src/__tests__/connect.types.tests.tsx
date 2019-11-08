/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Connect, Store, Action } from "../../types";
import connect from "..";

interface MyStore extends Store {
  state: {
    prop1: number;
  };
  actions: {
    action1: Action<MyStore>;
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
  actions.action1();
  const str1: string = libraries.lib1;
  const num2: number = ownProp1;
  const str2: string = optionalProp2;
  return <div />;
};

const Connected = connect(Component);

const App1 = () => <Connected ownProp1={1} />;
const App2 = () => <Connected ownProp1={1} optionalProp2={"2"} />;

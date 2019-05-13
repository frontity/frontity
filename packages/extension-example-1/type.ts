import { Package, Derived, Action } from "frontity/types";
import Router from "@frontity/router";

interface ExtensionExample1 extends Package {
  name: "@frontity/extension-example-1";
  state: {
    extension1: {
      prop1: number;
    };
    comments: {
      prop2: number;
      prop3: Derived<ExtensionExample1, number>;
    };
    router?: Router["state"]["router"];
  };
  actions: {
    extension1: {
      action1: Action<ExtensionExample1>;
      action2: Action<ExtensionExample1, number>;
    };
    router?: Router["actions"]["router"];
  };
  roots: {
    extension1: React.ReactType;
  };
  fills: {
    extension1: React.ReactType;
  };
  libraries: {
    comments: {
      Comment: React.ReactType;
    };
  };
}

export default ExtensionExample1;

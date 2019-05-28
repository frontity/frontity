import React from "react";
import Package from "..";
import { Connect } from "frontity/types";
import { Head, connect } from "frontity";

type Props = Connect<Package, { prop: string }>;

const Extension1: React.FC<Props> = ({ state, actions, prop }) => (
  <>
    <Head>
      <title>Frontity</title>
    </Head>
    <div>
      I am the root of extension example 1! Path is: {state.router.path}
    </div>
    <button onClick={() => actions.router.set("/")}>home</button>
    <button onClick={() => actions.router.set("/page1")}>page1</button>
    <button onClick={() => actions.router.set("/page2")}>page2</button>
  </>
);

const ExtensionExample1: Package = {
  name: "@frontity/extension-example-1",
  state: {
    extension1: {
      prop1: 1
    },
    comments: {
      prop2: 2,
      prop3: ({ state }) => state.comments.prop2 + 1
    }
  },
  actions: {
    extension1: {
      init: ({ state }) => {
        console.log("init");
      },
      beforeSSR: ({ state }) => {
        console.log("beforeSSR");
      },
      afterSSR: ({ state }) => {
        console.log("afterSSR");
      },
      beforeCSR: ({ state }) => {
        console.log("beforeCSR");
      },
      afterCSR: ({ state }) => {
        console.log("afterCSR");
      },
      action1: ({ state }) => {
        state.extension1.prop1 = 2;
      },
      action2: ({ state }) => num => {
        state.extension1.prop1 = num;
      }
    }
  },
  roots: {
    extension1: connect(Extension1)
  },
  fills: {
    extension1: () => <div>I am a fill of extension example 1</div>
  },
  libraries: {
    comments: {
      Comment: () => <div>I am a comment from extension example 1!</div>
    }
  }
};

export default ExtensionExample1;

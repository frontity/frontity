import React from "react";
import Package from "../../type";
import connect from "@frontity/connect";
import Connect from "@frontity/types/connect";

type Props = Connect<Package, { prop: string }>;

const Extension1: React.FC<Props> = ({ state, actions, prop, roots }) => (
  <>
    <div>
      I am the root of extension example 1! State is: {state.extension1.prop1}
    </div>
    <button onClick={() => actions.extension1.action1()}>2</button>
    <button onClick={() => actions.extension1.action2(3)}>3</button>
  </>
);

const ExtensionExample1: Package = {
  name: "@frontity/extension-example-1",
  namespaces: ["extension1", "comments"],
  state: {
    settings: {
      extension1: {
        setting1: "1"
      }
    },
    extension1: {
      prop1: 1
    },
    comments: {
      prop2: 2,
      prop3: state => state.comments.prop2 + 1
    }
  },
  actions: {
    extension1: {
      action1: state => {
        state.extension1.prop1 = 2;
      },
      action2: state => num => {
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

import { createContext, useContext, createElement } from "react";
import { view } from "@risingstack/react-easy-state";

/**
 * A React context that stores the store of Frontity Connect.
 */
const context = createContext();

/**
 * The Provider of the store context, to be used in the root of the React
 * application.
 */
export const Provider = context.Provider;

/**
 * Connects a React component with the Frontity connect store.
 *
 * @param Component The React component to be connected
 * @returns The same Component, but with the store included in the props.
 */
export const connect = (Component) => {
  const isStatelessComp = !(
    Component.prototype && Component.prototype.isReactComponent
  );

  if (isStatelessComp) {
    return view((props) => {
      const store = useContext(context);
      return Component({ ...props, ...store });
    });
  } else {
    class ConnectedComponent extends Component {
      static contextType = context;

      render() {
        return createElement(Component, {
          ...this.props,
          ...this.context,
        });
      }
    }

    return view(ConnectedComponent);
  }
};

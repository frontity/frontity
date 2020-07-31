import { createContext, useContext, createElement } from "react";
import { view } from "@risingstack/react-easy-state";
import { warn } from "@frontity/error";

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
 * A flag to know when a connected component is being rendered.
 */
let isConnected = false;

/**
 * The default options of connect.
 */
const defaultOptions = {
  injectProps: true,
};

/**
 * Connects a React component with the Frontity connect store.
 *
 * @param Component The React component to be connected.
 *
 * @returns The same Component, but with the store included in the props.
 */
export const connect = (Component, options) => {
  options = options ? { ...defaultOptions, ...options } : defaultOptions;

  const isStatelessComp = !(
    Component.prototype && Component.prototype.isReactComponent
  );

  if (isStatelessComp) {
    isConnected = true;
    const rendered = view((props) => {
      const store = useContext(context);
      return Component({ ...props, ...(options.injectProps ? store : {}) });
    });
    isConnected = false;
    return rendered;
  } else {
    class ConnectedComponent extends Component {
      static contextType = context;

      render() {
        isConnected = true;
        const rendered = createElement(Component, {
          ...this.props,
          ...(options.injectProps ? this.context : {}),
        });
        isConnected = false;
        return rendered;
      }
    }

    return view(ConnectedComponent);
  }
};

export const useConnect = () => {
  if (!isConnected)
    warn(
      "Warning: useConnect() is being used in a non connected component, " +
        "therefore the component won't update on state changes. " +
        "Please wrap your component with connect().\n"
    );

  return useContext(context);
};

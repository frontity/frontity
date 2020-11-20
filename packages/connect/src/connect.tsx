import React, { createContext, useContext } from "react";
import { view } from "@risingstack/react-easy-state";
import { warn } from "@frontity/error";
import { Package } from "@frontity/types";
import { ResolveActions, ResolveState } from "@frontity/types/src/utils";

/**
 * A React context that stores the store of Frontity Connect.
 */
const context = createContext<Package>({});

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

function isStateless(
  comp: React.ComponentType
): comp is React.FunctionComponent {
  return comp.prototype && comp.prototype.isReactComponent;
}

/**
 * Connects a React component with the Frontity connect store.
 *
 * @param Component - The React component to be connected.
 * @param options - TO BE LINKED WHEN WE SWITCH TO TYPESCRIPT.
 *
 * @returns The same Component, but with the store included in the props.
 */
export const connect = (Component: React.ComponentType, options) => {
  options = options ? { ...defaultOptions, ...options } : defaultOptions;

  if (isStateless(Component)) {
    return view((props) => {
      const { state, actions, libraries } = useContext(context);
      isConnected = true;
      const rendered = Component({
        ...props,
        ...(options.injectProps ? { state, actions, libraries } : {}),
      });
      isConnected = false;
      return rendered;
    });
  } else {
    if (options.injectProps) {
      /**
       * A wrapper for the Component that extracts the store from the context
       * and passes it to the Component.
       */
      class ConnectedComponent extends Component {
        static contextType = context;

        /**
         * The render method of this React Class.
         *
         * @returns The same Component but with the store injected as props.
         */
        render() {
          const { state, actions, libraries } = this.context;
          const props = { ...this.props, state, actions, libraries };
          return <Component {...props} />;
        }
      }
      return view(ConnectedComponent);
    }
    return view(Component);
  }
};

export const useConnect = <P extends Package>(): Omit<
  P,
  "state" | "actions"
> & {
  state: ResolveState<P["state"]>;
  actions: ResolveActions<P["actions"]>;
} => {
  if (!isConnected)
    warn(
      "Warning: useConnect() is being used in a non connected component, " +
        "therefore the component won't update on state changes. " +
        "Please wrap your component with connect().\n"
    );

  return useContext(context);
};

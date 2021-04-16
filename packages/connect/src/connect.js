import {
  useState,
  useEffect,
  useMemo,
  memo,
  useRef,
  createContext,
  useContext,
} from "react";
import { warn } from "@frontity/error";
import { observe, unobserve } from "@frontity/observer-util";

const COMPONENT = Symbol("owner component");

/**
 * A React context that stores the store of Frontity Connect.
 */
const context = createContext({});

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
  /**
   * Define if `connect` should inject the store props in the component, or only
   * make it reactive. Useful when the store is accessed via `useConnect` and
   * the props are passed down an HTML node.
   */
  injectProps: true,
};

/**
 * Connect a React component with the Frontity connect store and make it
 * reactive to its changes.
 *
 * @param Comp - The React component to be connected.
 * @param options - The connect options, defined in {@link defaultOptions}.
 *
 * @returns The same Component, but reactive and with the store included in the
 * props.
 */
export function connect(Comp, options) {
  const isFunctionalComp = !(Comp.prototype && Comp.prototype.isReactComponent);
  options = options ? { ...defaultOptions, ...options } : defaultOptions;

  let ReactiveComp;

  if (isFunctionalComp) {
    // Use a hook based reactive wrapper.
    ReactiveComp = (props) => {
      // Dummy setState to update the component.
      const [, setState] = useState();

      // Use a ref to store the reaction because we want to do some annotations.
      const reaction = useRef();

      // Create a memoized reactive wrapper of the original component (render)
      // at the very first run of the component function.
      const render = useMemo(
        () => {
          reaction.current = observe(Comp, {
            scheduler: () => {
              // Trigger a new rerender if the component has already been
              // mounted.
              if (reaction.current.mounted) setState({});
              // Annotate it as "changed" if the component has not been mounted
              // yet.
              else reaction.current.changedBeforeMounted = true;
            },
            lazy: true,
          });

          // Initialize a flag to know if the component was finally mounted.
          reaction.current.mounted = false;

          // Initialize a flag to know if the was reaction was invalidated
          // before the component was mounted.
          reaction.current.changedBeforeMounted = false;

          return reaction.current;
        },

        // Adding the original Comp here is necessary to make HMR work. It does
        // not affect behavior otherwise.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Comp]
      );

      useEffect(() => {
        // Mark the component as mounted.
        reaction.current.mounted = true;

        // If there was a change before the component was mounted, trigger a
        // new rerender.
        if (reaction.current.changedBeforeMounted) setState({});

        // Cleanup the reactive connections when the component is unmounted.
        return () => unobserve(reaction.current);
      }, []);

      // Extract the Frontity store from the context.
      const { state, actions, libraries } = useContext(context);

      // The isConnected flag is used to warn users that try to use `useConnect`
      // in a non-connected component.
      isConnected = true;
      try {
        // Run the reactive render instead of the original one and inject the
        // props if necessary.
        return render({
          ...props,
          ...(options.injectProps && state && { state }),
          ...(options.injectProps && actions && { actions }),
          ...(options.injectProps && libraries && { libraries }),
        });
      } finally {
        isConnected = false;
      }
    };
  } else {
    /**
     * Wrap the component to extract the store from the context and pass it
     * down to the final component. Also, make the render method reactive.
     */
    class ReactiveClassComp extends Comp {
      /**
       * Initialize the wrapper.
       *
       * @param props - The props passed to the original component.
       * @param context - The React context.
       */
      constructor(props, context) {
        super(props, context);

        // Create some state to be able to rerender the component later.
        this.state = this.state || {};
        this.state[COMPONENT] = this;

        // Make the render method reactive.
        this.render = observe(this.render, {
          scheduler: () => this.setState({}),
          lazy: true,
        });
      }

      /**
       * The render method of this React Class.
       *
       * @returns The same Component but with the store injected as props.
       */
      render() {
        const { state, actions, libraries } = this.context;
        const props = { ...this.props, state, actions, libraries };
        return <Comp {...props} />;
      }

      /**
       * React should trigger updates on prop changes, while  handles
       * store changes.
       *
       * @param nextProps - The props of the next render.
       * @param nextState - The state of the next render.
       * @returns Whether the component should rerender or not.
       */
      shouldComponentUpdate(nextProps, nextState) {
        const { props, state } = this;

        // Respect the case when the user defines a shouldComponentUpdate.
        if (super.shouldComponentUpdate) {
          return super.shouldComponentUpdate(nextProps, nextState);
        }

        // Return true if it is a reactive render or the state changes.
        if (state !== nextState) {
          return true;
        }

        // The component should also update if any of its props shallowly
        // changed value.
        const keys = Object.keys(props);
        const nextKeys = Object.keys(nextProps);
        return (
          nextKeys.length !== keys.length ||
          nextKeys.some((key) => props[key] !== nextProps[key])
        );
      }

      /**
       * Remove the reaction when the component is unmounted.
       */
      componentWillUnmount() {
        // Call user defined componentWillUnmount.
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        // Clean up memory used.
        unobserve(this.render);
      }
    }

    // Attach the context and pass the compnent up.
    ReactiveClassComp.contextType = context;
    ReactiveComp = ReactiveClassComp;
  }

  // Make sure we display the correct name.
  ReactiveComp.displayName = Comp.displayName || Comp.name;

  // Static props are inherited by class components, but have to be copied for
  // function components.
  if (isFunctionalComp) {
    Object.keys(Comp).forEach((key) => {
      ReactiveComp[key] = Comp[key];
    });
  }

  return isFunctionalComp ? memo(ReactiveComp) : ReactiveComp;
}

/**
 * React hook that returns the Frontity store in connected components.
 *
 * @returns The Frontity store (state, actions, libraries...).
 */
export const useConnect = () => {
  if (!isConnected)
    warn(
      "Warning: useConnect() is being used in a non connected component, " +
        "therefore the component won't update on state changes. " +
        "Please wrap your component with connect().\n"
    );

  return useContext(context);
};

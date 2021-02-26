import useInView from "../use-in-view";
import { MergePackages, Package } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import Router from "@frontity/router/types";

/**
 * The intersection options passed down to `useInView`.
 *
 * They come originally from the
 * [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer)
 * package.
 */
export type IntersectionOptions = Parameters<typeof useInView>[0];

/**
 * Generate the <Wrapper> component for a specific link.
 */
export interface WrapperGenerator {
  (params: {
    /**
     * Link of the post that will be rendered inside this wrapper.
     */
    link: string;

    /**
     * The intersection observer options for fetching.
     */
    fetchInViewOptions?: IntersectionOptions;

    /**
     * The intersection observer options for routing.
     */
    routeInViewOptions?: IntersectionOptions;
  }): React.FC<WrapperProps>;
}

/**
 * The props of the <Wrapper> component.
 */
export interface WrapperProps {
  /** Element key, tipically the link of the page/post being wrapped. */
  key: React.Key;

  /** React element passed as prop. */
  children: React.ReactNode;

  /** HTML class attribute. */
  className?: string;
}

/**
 * The props of the <InternalWrapper> component, used internally by <Wrapper>
 * components.
 */
export interface InternalWrapperProps {
  /** React element passed as prop. */
  children: React.ReactNode;

  /** HTML class attribute. */
  className: string;

  /** The link for that page/post. */
  link: string;

  /** The link of the next page/post. */
  nextLink?: string;

  /** The intersection observer options for fetching. */
  fetchInViewOptions?: IntersectionOptions;

  /** The intersection observer options for routing. */
  routeInViewOptions?: IntersectionOptions;

  /** Whether the infinite scroll has reached the limit or not. */
  hasReachedLimit: boolean;
}

/**
 * Options of the {@link useInfiniteScroll} hook.
 */
export type UseInfiniteScrollOptions = {
  /**
   * The current link that should be used to start the infinite scroll.
   */
  currentLink: string;

  /**
   * The next link that should be fetched and loaded once the user scrolls
   * down.
   */
  nextLink?: string;

  /**
   * The options for the internal {@link useInView} hook used for the
   * `actions.source.fetch`.
   */
  fetchInViewOptions?: IntersectionOptions;

  /**
   * The options for the internal {@link useInView} hook used for the
   * `actions.router.set`.
   */
  routeInViewOptions?: IntersectionOptions;
};

/**
 * Options of the {@link useInfiniteScroll} hook.
 */
export type UseInfiniteScrollOutput =
  | {
      /**
       * Boolean indicating if the Intersection Observer is supported or not by
       * the browser.
       */
      supported: false;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.router.set`.
       */
      routeRef?: undefined;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.source.fetch`.
       */
      fetchRef?: undefined;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.router.set` is in the screen.
       */
      routeInView?: undefined;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.source.fetch` is in the screen.
       */
      fetchInView?: undefined;
    }
  | {
      /**
       * Boolean indicating if the Intersection Observer is supported or not by
       * the browser.
       */
      supported: true;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.router.set`.
       */
      routeRef: (node?: Element) => void;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.source.fetch`.
       */
      fetchRef: (node?: Element) => void;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.router.set` is in the screen.
       */
      routeInView: boolean;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.source.fetch` is in the screen.
       */
      fetchInView: boolean;
    };

/**
 * Properties added by the {@link useInfiniteScroll} hook to the Router
 * state property.
 */
export type InfiniteScrollRouterState = {
  /**
   * Array of visited links.
   */
  links: string[];

  /**
   * Number of elements that will be automatically fetched.
   */
  limit: number;

  /**
   * List of pages by link.
   */
  pages: string[];

  /**
   * Archive (used by `usePostTypeInfiniteScroll`).
   */
  archive?: string;
};

/**
 * The additional types required by the infinite scroll hooks.
 */
interface Hooks extends Package {
  /**
   * The state that should be exposed by the Source packages.
   */
  state: {
    /**
     * Router namespace.
     */
    router: {
      /**
       * Object saved in `window.history.state`.
       */
      state: {
        /**
         * Properties added by the {@link useInfiniteScroll} hook to the Router
         * state property.
         */
        infiniteScroll: InfiniteScrollRouterState;

        /**
         * Any other prop.
         */
        [key: string]: unknown;
      };
    };
  };
}

/**
 * The type of those packages the {@link useInfiniteScroll} hook depends on,
 * merged together.
 */
export type Packages = MergePackages<WpSource, Router, Hooks>;

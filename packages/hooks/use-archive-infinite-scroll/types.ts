import {
  IntersectionOptions,
  WrapperProps,
} from "../use-infinite-scroll/types";

/**
 * Options received by the {@link useArchiveInfiniteScroll} hook.
 */
export type UseArchiveInfiniteScrollOptions = {
  /**
   * The number of pages that the hook should load automatically before
   * switching to manual fetching.
   */
  limit?: number;

  /**
   * A boolean indicating if this hook should be active or not. It can be
   * useful in situations where users want to share the same component for
   * different types of Archives, but avoid doing infinite scroll in some of
   * them.
   *
   * @defaultValue true
   */
  active?: boolean;

  /**
   * The intersection observer options for fetching.
   */
  fetchInViewOptions?: IntersectionOptions;

  /**
   * The intersection observer options for routing.
   */
  routeInViewOptions?: IntersectionOptions;
};

/**
 * Object returned by the {@link useArchiveInfiniteScroll} hook.
 */
export type UseArchiveInfiniteScrollOutput = {
  /**
   * An array of the existing pages. Users should iterate over this array in
   * their own layout.
   */
  pages: {
    /**
     * A unique key to be used in the iteration.
     */
    key: string;

    /**
     * The link of this page.
     */
    link: string;

    /**
     * If this page is the last page. Useful to add separators between pages,
     * but avoid adding it for the last one.
     */
    isLast: boolean;

    /**
     * The Wrapper component that should wrap the real `Archive` component.
     */
    Wrapper: React.FC<WrapperProps>;
  }[];

  /**
   * If it has reached the limit of pages and it should switch to manual mode.
   */
  isLimit: boolean;

  /**
   * If it's fetching the next page. Useful to add a loader.
   */
  isFetching: boolean;

  /**
   * If the next page returned an error. Useful to try again.
   */
  isError: boolean;

  /**
   * A function that fetches the next page. Useful when the limit has been
   * reached (`isLimit === true`) and the user pushes a button to get the next
   * page.
   */
  fetchNext: () => Promise<void>;
};

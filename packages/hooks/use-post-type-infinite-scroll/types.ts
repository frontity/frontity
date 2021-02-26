import {
  IntersectionOptions,
  WrapperProps,
} from "../use-infinite-scroll/types";

/**
 * Options received by the {@link usePostTypeInfiniteScroll} hook.
 */
export type UsePostTypeInfiniteScrollOptions = {
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
   */
  active?: boolean;

  /**
   * The archive that should be used to get the next posts. If none is present,
   * the previous link is used. If the previous link is not an archive, the
   * homepage is used.
   */
  archive?: string;

  /**
   * The archive that should be used if the `archive` option is not present and
   * the previous link is not an archive.
   */
  fallback?: string;

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
 * Object returned by the {@link usePostTypeInfiniteScroll} hook.
 */
export type UsePostTypeInfiniteScrollOutput = {
  /**
   * An array of the existing posts. Users should iterate over this array in
   * their own layout.
   */
  posts: {
    /**
     * A unique key to be used in the iteration.
     */
    key: string;

    /**
     * The link of this post.
     */
    link: string;

    /**
     * If this post is the last post. Useful to add separators between posts,
     * but avoid adding it for the last one.
     */
    isLast: boolean;

    /**
     * The Wrapper component that should wrap the real `Post` component.
     */
    Wrapper: React.FC<WrapperProps>;
  }[];

  /**
   * If it has reached the limit of posts and it should switch to manual mode.
   */
  isLimit: boolean;

  /**
   * If it's fetching the next post. Useful to add a loader.
   */
  isFetching: boolean;

  /**
   * If the next page returned an error. Useful to try again.
   */
  isError: boolean;

  /**
   * A function that fetches the next post. Useful when the limit has been
   * reached (`isLimit === true`) and the user pushes a button to get the next
   * post.
   */
  fetchNext: () => Promise<void>;
};

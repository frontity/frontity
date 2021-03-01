/**
 * Object returned by {@link useInView} hook.
 */
export interface UseInViewResponse {
  /**
   * React reference object pointing to the DOM element.
   */
  ref: (node?: Element | null) => void;

  /**
   * Boolean indicating if the element is visible.
   */
  inView: boolean;

  /**
   * Boolean indicating if [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) is supported.
   */
  supported: boolean;
}

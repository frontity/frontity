import { useInView, IntersectionOptions } from "react-intersection-observer";
import { UseInViewResponse } from "./types";

/**
 * React hook that tracks when an element enters or leaves the viewport. It also checks if `IntersectionObserver` is supported by the browser.
 *
 * Uses [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer) under the hood.
 *
 * @param options - Object containing options (see: [react-intersection-observer#options](https://github.com/thebuilder/react-intersection-observer#options)).
 *
 * @returns Object of type {@link UseInViewResponse}.
 */
export default (options?: IntersectionOptions): UseInViewResponse => {
  if (
    typeof window !== "undefined" &&
    typeof window.IntersectionObserver === "undefined"
  ) {
    return { ref: undefined, inView: true, supported: false };
  }

  const [ref, inView] = useInView(options);

  return { ref, inView, supported: true };
};

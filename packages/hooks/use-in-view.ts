import { useInView, IntersectionOptions } from "react-intersection-observer";

interface UseInViewResponse {
  ref: (node?: Element | null) => void;
  inView: boolean;
  supported: boolean;
}

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

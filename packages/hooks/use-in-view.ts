import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { warning } from "@frontity/invariant";

interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[]);
}
interface IntersectionObserverCallbackCreator {
  (options: { onlyOnce: boolean }): IntersectionObserverCallback;
}

interface Options {
  rootMargin?: string;
  onlyOnce?: boolean;
}

interface UseInView {
  (options?: Options): [boolean, React.MutableRefObject<undefined>];
}

// This is an array with all the `setIntersected` functions
// created by `useInView`, so we can find the corresponding
// one to each entry on the IntersectionObserver callback.
const setFunctions: [
  Dispatch<SetStateAction<boolean>>,
  React.MutableRefObject<undefined>
][] = [];

// This observer will be used during the whole life of the process.
let observer: IntersectionObserver;

// This callback can be called with more than one entry,
// so we need to filter them and call the corresponding
// `setIntersected` function for each changed entry.
const createCallback: IntersectionObserverCallbackCreator = options => {
  return entries => {
    entries.forEach(entry => {
      const setFunction = setFunctions.find(
        set => set[1].current === entry.target
      );

      // Check if we found the ref
      if (setFunction) {
        // This is the `setIntersected` function.
        setFunction[0](entry.isIntersecting);
      }

      if (entry.isIntersecting && options.onlyOnce) {
        observer.unobserve(entry.target);
        setFunctions.splice(setFunctions.indexOf(setFunction), 1);
      }
    });
  };
};

const useInView: UseInView = ({ rootMargin, onlyOnce } = {}) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef();

  warning(
    "The @frontity/hooks package is deprecated and will be removed in the future version of frontity.\nThe Frontity team recommends that you use https://github.com/thebuilder/react-intersection-observer instead."
  );

  if (!observer)
    observer = new IntersectionObserver(createCallback({ onlyOnce }), {
      rootMargin
    });

  useEffect(() => {
    if (ref.current) {
      setFunctions.push([setIntersecting, ref]);
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
      setFunctions.splice(
        setFunctions.findIndex(set => set[1].current === ref.current),
        1
      );
    };
  }, []);

  return [isIntersecting, ref];
};

export default useInView;

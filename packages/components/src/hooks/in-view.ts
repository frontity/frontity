import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

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
let setFunctions: [
  Dispatch<SetStateAction<boolean>>,
  React.MutableRefObject<undefined>
][] = [];

// This observer will be used during the whole life of the process.
let observer: IntersectionObserver;

// This callback can be called with more than one entry,
// so we need to filter them and call the corresponding
// `setIntersected` function for each changed entry.
let callbackCreator: IntersectionObserverCallbackCreator = options => {
  return entries => {
    const changed = entries.filter(entry => entry.isIntersecting);
    changed.forEach(entry => {
      const setFunction = setFunctions.find(
        set => set[1].current === entry.target
      );

      // This is the `setIntersected` function.
      setFunction[0](true);

      if (options.onlyOnce) {
        observer.unobserve(entry.target);
        setFunctions.splice(setFunctions.indexOf(setFunction), 1);
      }
    });
  };
};

const useInView: UseInView = ({ rootMargin, onlyOnce } = {}) => {
  const [hasIntersected, setIntersected] = useState(false);
  const ref = useRef();

  if (!observer)
    observer = new IntersectionObserver(callbackCreator({ onlyOnce }), {
      rootMargin
    });

  useEffect(() => {
    if (ref.current) {
      setFunctions.push([setIntersected, ref]);
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

  return [hasIntersected, ref];
};

export default useInView;

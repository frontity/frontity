import { useState, useEffect } from "react";

interface UseDidMount {
  (callback?: Function): boolean;
}

const useDidMount: UseDidMount = (callback: Function) => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    if (callback) callback();
    setDidMount(true);
  }, []);

  return didMount;
};

export default useDidMount;

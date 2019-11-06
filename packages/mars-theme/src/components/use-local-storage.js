import { useState } from "react";
import { canUseDOM } from "./use-media-query";

function useLocalStorage(key, initialValue = "") {
  // Get the local storage value and store it in state
  const [value, setValue] = useState(() =>
    canUseDOM ? localStorage.getItem(key) : initialValue
  );

  // Setter function to update state and local storage
  const setItem = newValue => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  return [value, setItem];
}

export default useLocalStorage;

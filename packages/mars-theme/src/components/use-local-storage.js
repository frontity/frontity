import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const getInitialState = () => {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  };

  // State to store our local storage value
  // Pass initial state function to useState so logic is only executed once
  const [localStorageValue, setLocalStorageValue] = useState(getInitialState);

  // Define state setter function for local storage value
  const setValue = value => {
    // Allow value to be a function so we have same API as useState
    const valueToStore =
      typeof value === "function" ? value(localStorageValue) : value;
    // Save state
    setLocalStorageValue(valueToStore);
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [localStorageValue, setValue];
}

export default useLocalStorage;

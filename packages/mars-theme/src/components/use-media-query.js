import { useEffect, useState } from "react";

const canUseDOM = typeof window != "undefined";

export const useMediaQuery = query => {
  // State update function
  const match = () => {
    // Get first media query that matches
    const { matches } = canUseDOM ? window.matchMedia(query) : false;
    // Return related value or defaultValue if none
    return matches;
  };

  // State and setter for current value
  const [value, set] = useState(match);

  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener("resize", handler);
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handler);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return value;
};

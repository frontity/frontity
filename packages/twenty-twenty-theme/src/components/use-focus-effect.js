import { useEffect, useRef } from "react";

const useFocusEffect = (initialFocusRef, isOpen) => {
  // Keep a reference to the previously active element
  // to restore focus back
  const activeElementRef = useRef();
  // Accessibility: focus on the input if the modal is open
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      activeElementRef.current = document.activeElement;
      initialFocusRef.current.focus();
    } else {
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      }
    }
  }, [isOpen]);
};

export default useFocusEffect;

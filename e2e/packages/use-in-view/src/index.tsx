import React from "react";
import useInView from "@frontity/hooks/use-in-view";
import UseInView from "../types";

if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  if (params.has("removeIO")) delete window.IntersectionObserver;
}

/**
 * A React component that uses the `useInView` hook.
 *
 * @returns React element.
 */
const Root: React.FC = () => {
  const { supported } = useInView();
  return <div id="supported">supported: {supported.toString()}</div>;
};

const pkg: UseInView = {
  name: "e2e-use-in-view",
  roots: {
    useInView: Root,
  },
};

export default pkg;

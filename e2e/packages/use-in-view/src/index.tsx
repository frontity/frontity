import React from "react";
import useInView from "@frontity/hooks/use-in-view";
import UseInView from "../types";

if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  if (params.has("removeIO")) delete window.IntersectionObserver;
}

const Root: React.FC = () => {
  const { supported } = useInView();
  return <div id="supported">supported: {supported.toString()}</div>;
};

const pkg: UseInView = {
  name: "use-in-view",
  state: {},
  actions: {},
  roots: {
    useInView: Root,
  },
  libraries: {},
};

export default pkg;

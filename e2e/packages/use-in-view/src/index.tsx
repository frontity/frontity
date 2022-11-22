import * as React from "react";
import { connect, useConnect } from "frontity";
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
const Root: React.FC = connect(() => {
  const { state } = useConnect<UseInView>();
  const { supported } = useInView();

  const params = new URLSearchParams(state.frontity.initialLink.slice(1));

  return (
    <div id="supported">
      supported:{" "}
      {typeof window !== "undefined" || !params.has("removeIO")
        ? supported.toString()
        : "false"}
    </div>
  );
});

const pkg: UseInView = {
  name: "e2e-use-in-view",
  roots: {
    useInView: Root,
  },
};

export default pkg;

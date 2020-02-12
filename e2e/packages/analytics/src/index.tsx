import React from "react";
import {
  Root as Analytics,
  sendPageview,
  sendEvent
} from "@frontity/analytics";
import { Head, connect } from "frontity";
import Package from "../types";

const Path1 = () => {
  const title = "";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Lorem Ipsum</div>
    </>
  );
};

const Path2 = () => {
  const title = "";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Lorem Ipsum</div>
    </>
  );
};

const Path3 = () => {
  const title = "";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Lorem Ipsum</div>
    </>
  );
};

const Theme = connect(({ state }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3001");
  if (pathname === "/path-1") return <Path1 />;
  if (pathname === "/path-2") return <Path2 />;
  if (pathname === "/path-3") return <Path3 />;
});

const testPackage: Package = {
  name: "analytics",
  state: {
    analytics: {
      namespaces: {}
    }
  },
  actions: {
    analytics: {
      // These actions could be mocked here.
      sendPageview,
      sendEvent
    }
  },
  roots: {
    theme: Theme,
    analytics: Analytics
  }
};

export default testPackage;

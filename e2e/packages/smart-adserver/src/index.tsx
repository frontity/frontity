import React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

/**
 * Root of the package for testing the Smart Ads.
 *
 * @param props - Props.
 * @returns React element.
 */
const Theme: React.FC<Connect<Packages>> = ({ libraries }) => {
  const { SmartAd } = libraries.fills.smartAdserver;

  return (
    <div id="smart-ads">
      <SmartAd callType="std" siteId={123} pageId={123} formatId={123} />
      <Slot name="header" />
    </div>
  );
};

const smartAdserver: SmartAdserver = {
  name: "e2e-smart-adserver",
  state: {
    source: {
      data: {},
      get: ({ state }) => (link) => state.source.data[link],
    },
    router: {
      link: "/",
    },
  },
  roots: {
    theme: connect(Theme),
  },
};

export default smartAdserver;

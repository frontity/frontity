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
      {/* A basic ad using the std call with a specific tagId */}
      <SmartAd
        callType="std"
        siteId={1}
        pageId={1}
        formatId={1}
        tagId="test-smartad"
      />

      <div id="default-tag-id">
        {/* An ad using the default tagId */}
        <SmartAd callType="std" siteId={2} pageId={2} formatId={2} />
      </div>

      {/* An ad created using an iframe */}
      <div id="iframe-ad">
        <SmartAd
          callType="iframe"
          siteId={3}
          pageId={3}
          formatId={3}
          width={200}
          height={200}
        />
      </div>

      {/* An ad that should be rendered by the fill specified in frontity.settings.ts */}
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

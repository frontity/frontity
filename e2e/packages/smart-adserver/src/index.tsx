import React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

const siteId = 78061;
const pageId = 884496;
const formatId = 33780;

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
        siteId={siteId}
        pageId={pageId}
        formatId={formatId}
        tagId="test-smartad"
      />

      <div id="default-tag-id">
        {/* An ad using the default tagId */}
        <SmartAd
          callType="std"
          siteId={siteId}
          pageId={pageId}
          formatId={formatId}
        />
      </div>

      {/* An ad created using an iframe */}
      <div id="iframe-ad">
        <SmartAd
          callType="iframe"
          siteId={siteId}
          pageId={pageId}
          formatId={formatId}
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

import React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

// These are the same values as defined in the frontity.settings.ts for the e2e
// project.
const siteId = 78061;
const pageId = 884496;
const formatId = 33780;

/**
 * Root of the package for testing the Smart Ads.
 *
 * @param props - Props.
 * @returns React element.
 */
const Theme: React.FC<Connect<Packages>> = ({ libraries, state, actions }) => {
  const { SmartAd } = libraries.fills.smartAdserver;

  if (state.router.link === "/other-page/") {
    return (
      <div>
        <SmartAd
          callType="std"
          siteId={siteId}
          pageId={pageId}
          formatId={formatId}
          tagId="other-page-ad"
        />
      </div>
    );
  }

  return (
    <>
      <button
        id="change-page"
        onClick={() => actions.router.set("/other-page/")}
      >
        go to other page
      </button>

      {/* A basic ad using the std call with a specific tagId. */}
      <div id="smart-ads">
        <SmartAd
          callType="std"
          siteId={siteId}
          pageId={pageId}
          formatId={formatId}
          tagId="test-smartad"
        />

        {/* An ad using the default tagId. */}
        <div id="default-tag-id">
          <SmartAd
            callType="std"
            siteId={siteId}
            pageId={pageId}
            formatId={formatId}
          />
        </div>

        {/* An ad created using an iframe. */}
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

        {/* An ad that should be rendered by the fill specified in
        frontity.settings.ts. */}
        <Slot name="header" />
      </div>
    </>
  );
};

const smartAdserver: SmartAdserver = {
  state: {
    source: {
      get: () => () => {},
    },
  },
  roots: {
    theme: connect(Theme),
  },
};

export default smartAdserver;

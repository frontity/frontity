import * as React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

// These are the same values as defined in the frontity.settings.ts for the e2e
// project.
const siteId = 383739;
const pageId = 1326721;

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
        {/* A basic image ad using the std call with a specific tagId. */}
        <SmartAd
          callType="std"
          siteId={siteId}
          pageId={pageId}
          formatId={19809}
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

      {/* An ad that should be rendered by the fill specified in
        frontity.settings.ts. */}
      <Slot name="header" />

      <div id="smart-ads">
        {/* A basic image ad using the std call with a specific tagId. */}
        <SmartAd
          callType="std"
          siteId={siteId}
          pageId={pageId}
          formatId={19809}
          tagId="test-smartad"
        />

        {/* An image ad using the default tagId. */}
        {/* The ad rendered here is an image. */}
        <div id="default-tag-id">
          <SmartAd
            callType="std"
            siteId={siteId}
            pageId={pageId}
            formatId={19809}
          />
        </div>

        {/* An HTML5 ad created using an iframe. */}
        <div id="iframe-ad">
          <SmartAd
            callType="iframe"
            siteId={siteId}
            pageId={pageId}
            formatId={58374}
            width={300}
            height={100}
          />
        </div>

        {/* An ad that is rendered by the fill with a "std" call and a minHeight */}
        <Slot name="bottom" />
      </div>
    </>
  );
};

const smartAdserver: SmartAdserver = {
  name: "e2e-smart-adserver",
  state: {
    source: {
      get: () => () => {
        // Do nothing.
      },
    },
  },
  roots: {
    theme: connect(Theme),
  },
};

export default smartAdserver;

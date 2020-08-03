import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import React from "react";
import { Packages } from "../../types";

/**
 * Documented at {@link GoogleAdManager}.
 *
 * @param props - Frontity injected props.
 * @returns React element.
 */
const Root: React.FC<Connect<Packages>> = ({ state }) => {
  // Each time the link changes:
  React.useEffect(() => {
    if (window.googletag?.apiReady) {
      // Change correlator number.
      // window.googletag.pubads().updateCorrelator();
      // // Destroy all slots.
      // window.googletag.destroySlots();
    }
  }, [state.router.link]);

  // Render GPT library.
  return (
    <Head>
      <script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        async
      />
    </Head>
  );
};

export default connect(Root);

import { Head } from "frontity";
import React from "react";
import GoogleAdManager from "../../types";

/**
 * Documented at {@link GoogleAdManager}.
 *
 * @returns React element.
 */
const Root: GoogleAdManager["roots"]["googleAdManager"] = () => {
  return (
    <Head>
      <script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        async
      />
    </Head>
  );
};

export default Root;

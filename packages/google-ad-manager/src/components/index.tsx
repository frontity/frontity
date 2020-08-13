import { Head } from "frontity";
import { Connect } from "frontity/types";
import React from "react";
import GoogleAdManager from "../../types";

/**
 * Documented at {@link GoogleAdManager}.
 *
 * @param props - Frontity injected props.
 * @returns React element.
 */
const Root: React.FC<Connect<GoogleAdManager>> = () => {
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

export default Root;

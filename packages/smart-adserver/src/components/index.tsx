import { useEffect } from "react";
import * as React from "react";
import { Head, connect, warn } from "frontity";
import { Connect } from "frontity/types";
import SmartAdserver from "../../types";

/**
 * Root of the Smartads package.
 *
 * @param props - Frontity injected props.
 * @returns React element.
 */
const Root: React.FC<Connect<SmartAdserver>> = ({ state }) => {
  const { networkId, subdomain } = state.smartAdserver;

  useEffect(() => {
    window.sas = window.sas || { cmd: [] };

    // Set the flag that means that the Smart Adserver library has been
    // initialized. This is flag is checked by the individual Ad components
    // before making ad calls.
    state.smartAdserver.isLoaded = true;

    if (!networkId) {
      warn(
        "state.smartAdserver.networkId was not defined. The Smart Adserver library will not be able to load."
      );
    }

    if (!subdomain) {
      warn(
        "state.smartAdserver.subdomain was not defined. The Smart Adserver library will not be able to load."
      );
    }

    // Set up the Smart Adserver library
    window.sas.cmd.push(function () {
      window.sas.setup({
        networkid: networkId,
        domain: `//${subdomain}.smartadserver.com`,
        async: true,
      });
    });

    // Clean up when component unmounts.
    return () => {
      state.smartAdserver.isLoaded = false;
    };
  }, [networkId, subdomain, state.smartAdserver]);

  return (
    <Head>
      <script src={`//ced.sascdn.com/tag/${networkId}/smart.js`} async />
    </Head>
  );
};

export default connect(Root);

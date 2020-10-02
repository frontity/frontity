import React, { useEffect } from "react";
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

    // Put the reference to window.sas in the state. We will need it to make
    // sure that the setup function is called before any individual ad call
    // in the SmartAd component.
    state.smartAdserver.sas = window.sas;

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
      window.sas = undefined;
    };
  }, [networkId, subdomain]);

  return (
    <Head>
      <script src={`//ced.sascdn.com/tag/${networkId}/smart.js`} async />
    </Head>
  );
};

export default connect(Root);

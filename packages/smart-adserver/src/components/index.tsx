import React from "react";
import { Head, connect } from "frontity";

/**
 * Root of the Smartads package.
 *
 * @param props - Frontity injected props.
 * @returns React element.
 */
const SmartAdserver = ({ state }) => {
  const { networkId, subdomain } = state.smartAdserver;

  React.useEffect(() => {
    window.sas = window.sas || { cmd: [] };
    window.sas.cmd.push(function () {
      window.sas.setup({
        networkid: networkId,
        domain: `//${subdomain}.smartadserver.com`,
        async: true,
      });
    });
  }, []);

  return (
    <Head>
      <script src={`//ced.sascdn.com/tag/${networkId}/smart.js`} async />
    </Head>
  );
};

export default connect(SmartAdserver);

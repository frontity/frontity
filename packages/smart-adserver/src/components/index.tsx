import React, { useEffect, createContext } from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import SmartAdserver from "../../types";

export const SmartAdContext = createContext(undefined);

/**
 * Root of the Smartads package.
 *
 * @param props - Frontity injected props.
 * @returns React element.
 */
const Root: React.FC<Connect<SmartAdserver>> = ({ state, children }) => {
  const { networkId, subdomain } = state.smartAdserver;

  useEffect(() => {
    window.sas = window.sas || { cmd: [] };
    state.smartAdserver.sas = window.sas;

    window.sas.cmd.push(function () {
      window.sas.setup({
        networkid: networkId,
        domain: `//${subdomain}.smartadserver.com`,
        async: true,
      });
    });

    return () => {
      window.sas = undefined;
    };
  }, [networkId, subdomain]);

  return (
    <SmartAdContext.Provider value={state.smartAdserver.sas}>
      <Head>
        <script src={`//ced.sascdn.com/tag/${networkId}/smart.js`} async />
      </Head>
      {children}
    </SmartAdContext.Provider>
  );
};

export default connect(Root);

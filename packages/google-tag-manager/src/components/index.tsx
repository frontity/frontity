/* eslint-disable react/no-danger */
import React from "react";
import { Head, connect, css } from "frontity";
import { Connect } from "frontity/types";
import GoogleTagManager from "../../types";

const GtmCode: React.FC<{ containerId: string }> = ({ containerId }) => (
  <>
    {/* Add the GTM script in the <head> */}
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      />
    </Head>
    {/* Add the GTM noscript in the <body> */}
    <noscript>
      <iframe
        title={containerId}
        src="https://www.googletagmanager.com/ns.html?id=${containerId}"
        height="0"
        width="0"
        css={css`
          display: none;
          visibility: hidden;
        `}
      />
    </noscript>
  </>
);

export const Root: React.FC<Connect<GoogleTagManager>> = ({ state }) => {
  const { containerId, containerIds } = state.googleTagManager;
  const ids = containerIds || (containerId && [containerId]) || [];
  return (
    <>
      {ids.map((id) => (
        <GtmCode key={id} containerId={id} />
      ))}
    </>
  );
};

export default connect(Root);

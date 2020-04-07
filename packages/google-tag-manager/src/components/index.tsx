/* eslint-disable react/no-danger */
import React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import GoogleTagManager from "../../types";

const GtmScript = ({ containerId }: { containerId: string }) => (
  <Head>
    <script
      async
      src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
    />
  </Head>
);

const GtmNoScript = ({ containerId }: { containerId: string }) => (
  <Head>
    <noscript>
      {`
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=${containerId}"
    height="0"
    width="0"
    style="display: 'none', visibility: 'hidden'"
  ></iframe>`}
    </noscript>
  </Head>
);

export const Root: React.FC<Connect<GoogleTagManager>> = ({ state }) => {
  const { containerId, containerIds } = state.googleTagManager;
  const ids = containerIds || (containerId && [containerId]) || [];

  return (
    <>
      {ids.map((id) => (
        <React.Fragment key={id}>
          <GtmScript containerId={id} />
          <GtmNoScript containerId={id} />
        </React.Fragment>
      ))}
    </>
  );
};

export default connect(Root);

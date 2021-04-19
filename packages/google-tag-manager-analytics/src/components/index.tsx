import * as React from "react";
import { Head, connect, css } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";
import { AmpConfig } from "@frontity/analytics/types";

/**
 * Props used by {@link GtmCode}.
 */
interface GtmCodeProps {
  /**
   * GTM container ID.
   */
  containerId: string;
}

/**
 * Props used by {@link GtmCodeAmp}.
 */
interface GtmCodeAmpProps extends GtmCodeProps {
  /**
   * AMP-analytics configuration object.
   */
  ampConfig?: AmpConfig;
}

/**
 * Render the GTM library inside `<head>` for the given container ID.
 *
 * @example
 * ```
 * <GtmCode containerId={containerId} />
 * ```
 *
 * @param props - Object of type {@link GtmCodeProps}.
 *
 * @returns React element.
 */
const GtmCode: React.FC<GtmCodeProps> = ({ containerId }) => (
  <>
    {/* Add the GTM script in the <head> */}
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      />
      <script>
        {`
        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        })
        `}
      </script>
    </Head>
    {/* Add the GTM noscript in the <body> */}
    <noscript>
      <iframe
        title={containerId}
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
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

/**
 * Render the `amp-analytics` tag for the given container ID.
 *
 * @example
 * ```
 * <GtmCodeAmp containerId={containerId} />
 * ```
 *
 * @param props - Object of type {@link GtmCodeProps}.
 *
 * @returns React element.
 */
const GtmCodeAmp: React.FC<GtmCodeAmpProps> = connect(
  ({ containerId, ampConfig }) => (
    <amp-analytics
      config={`https://www.googletagmanager.com/amp.json?id=${containerId};Tag Manager.url=SOURCE_URL`}
      data-credentials="include"
    >
      {ampConfig && (
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ampConfig),
          }}
        />
      )}
    </amp-analytics>
  )
);

/**
 * Root component of the Google Tag Manager Analytics package.
 *
 * It renders the GTM script library for each container ID defined in the state.
 *
 * @remarks
 * This component is automatically rendered by Frontity and it's not meant to be
 * imported and used anywhere.
 *
 * @param props - Injected props by `connect`.
 *
 * @returns Root element.
 */
export const Root: React.FC<Connect<Packages>> = ({ state }) => {
  const {
    containerId,
    containerIds,
    ampConfig,
  } = state.googleTagManagerAnalytics;
  const ids = containerIds || (containerId && [containerId]) || [];

  return (
    <>
      {ids.map((id) =>
        // Render the appropriate tag depending on whether the `@frontity/amp`
        // package is installed or not.
        state.frontity.mode === "amp" ? (
          <GtmCodeAmp key={id} containerId={id} ampConfig={ampConfig} />
        ) : (
          <GtmCode key={id} containerId={id} />
        )
      )}
    </>
  );
};

export default connect(Root);

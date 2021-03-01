import * as React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import GoogleAnalytics from "../../types";

/**
 * Root component of the Google Analytics package.
 *
 * It renders the Google Analytics tag and set up each tracking ID defined in
 * the state.
 *
 * @remarks
 * This component is automatically rendered by Frontity and it's not meant to be
 * imported and used anywhere.
 *
 * @param props - Injected props by `connect`.
 *
 * @returns Root element.
 */
export const Root: React.FC<Connect<GoogleAnalytics>> = ({ state }) => {
  // Get Tracking ids from state.
  const { trackingIds, trackingId } = state.googleAnalytics;
  const ids = trackingIds || (trackingId && [trackingId]) || [];

  // Render Tracker code.
  return (
    ids.length > 0 && (
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        ></script>
        <script>{`
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

${ids.map((id) => `gtag('config', '${id}');`).join("\n")}
`}</script>
      </Head>
    )
  );
};

export default connect(Root);

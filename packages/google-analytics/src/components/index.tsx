/* eslint-disable react/no-danger */
import React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import GoogleAnalytics from "../../types";
import { getTrackerName } from "..";

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
 * @example roots.googleAnalytics
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
        <script>{`
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
${ids
  .map((id) => `ga('create', '${id}', 'auto', '${getTrackerName(id)}');`)
  .join("\n")}`}</script>
      </Head>
    )
  );
};

export default connect(Root);

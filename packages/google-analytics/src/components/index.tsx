/* eslint-disable react/no-danger */
import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import GoogleAnalytics from "../../types";
import { getTrackerName } from "..";

const Root: React.FC<Connect<GoogleAnalytics>> = ({ state }) => {
  // Get Tracking ids from state.
  const { trackingIds, trackingId } = state.ga;
  const ids = trackingIds || (trackingId && [trackingId]) || [];

  // Render Tracker code.
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
${ids.map(id => `\nga('create', '${id}', 'auto', '${getTrackerName(id)}');`)}`
      }}
    />
  );
};

export default connect(Root);

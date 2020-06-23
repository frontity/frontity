import React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import ComscoreAnalytics from "../../types";

const ComscoreHead: React.FC<{ id?: string }> = ({ id }) => (
  <Head>
    <noscript>
      {`<img alt="comscore" src="https://sb.scorecardresearch.com/p?c1=2&c2=${id}&cv=2.0&cj=1" />`}
    </noscript>
    <script async src="https://sb.scorecardresearch.com/beacon.js" />
  </Head>
);

export const Root: React.FC<Connect<ComscoreAnalytics>> = ({ state }) => {
  // Get Tracking ids from state.
  const { trackingIds, trackingId } = state.comscoreAnalytics;
  const ids = trackingIds || (trackingId && [trackingId]) || [];

  return (
    <>
      {ids.map((id) => (
        <ComscoreHead id={id} key={id} />
      ))}
    </>
  );
};

export default connect(Root);

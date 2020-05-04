import React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import ComscoreAnalytics from "../../types";

export const Root: React.FC<Connect<ComscoreAnalytics>> = ({ state }) => {
  const { id } = state.comscoreAnalytics;

  return (
    <Head>
      <script async src="https://sb.scorecardresearch.com/beacon.js" />
      <noscript>
        {`<img alt="comScore" src="https://sb.scorecardresearch.com/p?c1=2&c2=${id}&cv=2.0&cj=1" />`}
      </noscript>
    </Head>
  );
};

export default connect(Root);

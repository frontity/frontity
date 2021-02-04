import * as React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import ComscoreAnalytics from "../../types";

/**
 * Props used by {@link ComscoreHead}.
 */
interface ComscoreHeadProps {
  /**
   * Comscore tracking ID.
   */
  id: string;
}

/**
 * Render the Comscore library inside `<head>` for the given tracking ID.
 *
 * @example
 * ```
 * <ComscoreHead id={trackingId} />
 * ```
 *
 * @param props - Object of type {@link ComscoreHeadProps}.
 *
 * @returns React element.
 */
const ComscoreHead: React.FC<ComscoreHeadProps> = ({ id }) => (
  <Head>
    <noscript>
      {`<img alt="comscore" src="https://sb.scorecardresearch.com/p?c1=2&c2=${id}&cv=2.0&cj=1" />`}
    </noscript>
    <script async src="https://sb.scorecardresearch.com/beacon.js" />
  </Head>
);

/**
 * Root component of the Comscore Analytics package.
 *
 * It renders the Comscore script library for each Comscore tracking ID defined
 * in the state.
 *
 * @remarks
 * This component is automatically rendered by Frontity and it's not meant to be
 * imported and used anywhere.
 *
 * @example roots.comscoreAnalytics
 *
 * @param props - Injected props by `connect`.
 *
 * @returns Root element.
 */
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

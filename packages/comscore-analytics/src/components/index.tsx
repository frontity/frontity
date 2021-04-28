import * as React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";

/**
 * Props used by {@link ComscoreHead} and {@link ComscoreAmp}.
 */
interface ComscoreProps {
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
 * @param props - Object of type {@link ComscoreProps}.
 *
 * @returns React element.
 */
const ComscoreHead: React.FC<ComscoreProps> = ({ id }) => (
  <Head>
    <noscript>
      {`<img alt="comscore" src="https://sb.scorecardresearch.com/p?c1=2&c2=${id}&cv=2.0&cj=1" />`}
    </noscript>
    <script async src="https://sb.scorecardresearch.com/beacon.js" />
  </Head>
);

/**
 * Render the `amp-analytics` tag for the given tracking ID.
 *
 * @example
 * ```
 * <ComscoreAmp id={trackingId} />
 * ```
 *
 * @param props - Object of type {@link ComscoreProps}.
 *
 * @returns React element.
 */
const ComscoreAmp: React.FC<ComscoreProps> = ({ id }) => (
  // Render the `amp-analytics` tag for the tracking ID.
  <amp-analytics type="comscore" key={id}>
    <script
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          vars: {
            c2: id,
          },
        }),
      }}
    />
  </amp-analytics>
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
export const Root: React.FC<Connect<Packages>> = ({ state }) => {
  // Get Tracking IDs from state.
  const { trackingIds, trackingId } = state.comscoreAnalytics;
  const ids = trackingIds || (trackingId && [trackingId]) || [];

  // Get the appropriate tag depending on whether the `@frontity/amp` package is
  // installed or not.
  const ComscoreTag =
    state.frontity.mode === "amp" ? ComscoreAmp : ComscoreHead;

  return (
    <>
      {ids.map((id) => (
        <ComscoreTag id={id} key={id} />
      ))}
    </>
  );
};

export default connect(Root);

import * as React from "react";
import { Head, connect } from "frontity";
import merge from "deepmerge";
import { Connect } from "frontity/types";
import { AmpConfig } from "@frontity/analytics/types";
import { Packages } from "../../types";

/**
 * Props received by {@link Gtag} component.
 */
interface GtagProps {
  /**
   * Array of tracking IDs in string format.
   */
  ids: string[];
}

/**
 * Props received by {@link GtagAmp} component.
 */
interface GtagAmpProps extends GtagProps {
  /**
   * Amp config object.
   */
  ampConfig: AmpConfig;
}

/**
 * Render the gtag.js code snippet for the given tracking ids.
 *
 * @param props - Component props with `ids` property.
 * @returns React element.
 */
const Gtag: React.FC<GtagProps> = ({ ids }) =>
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
  );

/**
 * Render the gtag.js `amp-analytics` element for the given tracking IDs and
 * AMP configuration.
 *
 * @param props - Component props with `ids` and `ampConfig` properties.
 * @returns React element.
 */
const GtagAmp: React.FC<GtagAmpProps> = ({ ids, ampConfig }) => {
  // Do not render anything if `ids` is empty.
  if (ids.length === 0) return null;

  // Generate an initial configuration object with the given tracking IDs.
  const idsConfig = {
    vars: {
      // This property points to the first ID of the array.
      gtag_id: ids[0],

      // Here, we generate an object with all the IDs passed as prop.
      config: ids.reduce((config, id) => {
        config[id] = { groups: "default" };
        return config;
      }, {}),
    },
  };

  // Merge it with `ampConfig` to add other vars and triggers.
  const finalAmpConfig = merge(idsConfig, ampConfig || {});

  // Return the AMP tag with its configuration.
  return (
    <amp-analytics type="gtag" data-credentials="include">
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalAmpConfig) }}
      />
    </amp-analytics>
  );
};

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
export const Root: React.FC<Connect<Packages>> = ({ state }) => {
  // Get Tracking ids from state.
  const { trackingIds, trackingId, ampConfig } = state.googleAnalytics;
  const ids = trackingIds || (trackingId && [trackingId]) || [];

  // Render Tracker code.
  return (
    // Render the appropriate tag depending on whether the `@frontity/amp`
    // package is installed or not.
    state.frontity.mode === "amp" ? (
      <GtagAmp ids={ids} ampConfig={ampConfig} />
    ) : (
      <Gtag ids={ids} />
    )
  );
};

export default connect(Root);

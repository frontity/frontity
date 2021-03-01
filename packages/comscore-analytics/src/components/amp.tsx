import { connect, useConnect, Head } from "frontity";
import ComscoreAnalytics from "../../types/amp";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /** JSX Intrinsic Elements. */
    interface IntrinsicElements {
      /** The `amp-analytics` element. */
      "amp-analytics": any;
    }
  }
}

export default connect(
  () => {
    // Get tracking IDs from the state.
    const { state } = useConnect<ComscoreAnalytics>();
    const { trackingId, trackingIds } = state.comscoreAnalytics;
    const ids = trackingIds || (trackingId && [trackingId]) || [];

    return (
      <>
        {/* Render the amp library needed for the `amp-analtyics` tag. */}
        <Head>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          />
        </Head>
        {/* Render a tag for each comscore tracking ID. */}
        {ids.map((id) => (
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
        ))}
      </>
    );
  },
  { injectProps: false }
);

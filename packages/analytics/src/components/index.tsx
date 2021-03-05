import * as React from "react";
import { connect, useConnect, Head } from "frontity";
import { Packages } from "../../types";

/**
 * Send a pageview anytime the title changes and `data.isReady` is `true` for
 * the current link (i.e. `state.router.link`).
 *
 * @returns React element.
 */
const PageviewSender: React.FC = connect(() => {
  const { state, actions } = useConnect<Packages>();
  const { link } = state.router;
  const { isReady } = state.source.get(link);

  // Store if a pageview has been sent for this link.
  const [isPageviewSent, setIsPageviewSent] = React.useState(false);

  // Every time link changes, we reset the isPageviewSent value.
  React.useEffect(() => {
    setIsPageviewSent(false);
  }, [link]);

  return (
    <Head
      /**
       * This `titleTemplate` changes the title while
       * `data.isReady` is `false`. This ensures a title change
       * when `data.isReady` becomes `true` but the title hasn't changed.
       */
      titleTemplate={!isReady ? "%s " : ""}
      onChangeClientState={({ title }) => {
        if (isReady && !isPageviewSent) {
          // Send pageview.
          actions.analytics.pageview({
            link: state.router.link,
            title,
          });
          // Mark pageview as sent.
          setIsPageviewSent(true);
        }
      }}
    />
  );
});

/**
 * Make the `amp-analytics` library to be available for every analytics package
 * that uses this package under the hood.
 *
 * @returns React element.
 */
const AmpAnalyticsLibrary = () => (
  <Head>
    <script
      // We have to explicitly pass undefined, otherwise the attribute is
      // passed to the DOM like async="true" and AMP does not allow that.
      async={undefined}
      custom-element="amp-analytics"
      src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
    />
  </Head>
);

/**
 * Analytics Root component.
 *
 * Depending on whether the `@frontity/amp` package is installed or not, it
 * renders the AMP library for the `amp-analytics` elements, or a component that
 * tracks changes in the URL and title, and triggers a `pageview` action.
 *
 * @remarks
 * This component is automatically rendered by Frontity and it's not meant to be
 * imported and used anywhere.
 *
 * @returns Root element.
 */
const Root: React.FC = () => {
  const { state } = useConnect<Packages>();
  return "amp" in state ? <AmpAnalyticsLibrary /> : <PageviewSender />;
};

export default connect(Root);

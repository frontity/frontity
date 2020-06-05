import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";

/**
 * Send a pageview anytime the title changes
 * and data.isReady === true.
 */
const Root: React.FC<Connect<Packages>> = ({ state, actions }) => {
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
          actions.analytics.sendPageview({
            page: state.router.link,
            title,
          });
          // Mark pageview as sent.
          setIsPageviewSent(true);
        }
      }}
    />
  );
};

export default connect(Root);

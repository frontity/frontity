import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";

/**
 * Analytics Root component.
 *
 * It sends a pageview anytime the title changes and `data.isReady` is `true`
 * for the current link (i.e. `state.router.link`).
 *
 * @remarks
 * This component is automatically rendered by Frontity and it's not meant to be
 * imported and used anywhere.
 *
 * @example roots.analytics
 *
 * @param props - Injected props by `connect`.
 *
 * @returns Root element.
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
};

export default connect(Root);

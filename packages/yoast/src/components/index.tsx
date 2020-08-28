import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import { Packages, WithYoastHead } from "../../types";
import { getEntity, getWpUrl } from "@frontity/head-tags/src/utils";

import yoastHeadProcessor from "../processors/yoastHead";
import { transformAllLinks } from "../utils";

/**
 * Render all meta tags included in the `yoast_meta` field, if that field exists
 * in the entity pointed by the current link.
 *
 * @param props - Frontity props injected by {@link connect}.
 *
 * @returns React element.
 */
const Root: React.FC<Connect<Packages>> = ({ state, libraries }) => {
  // Get current link.
  const { link } = state.router;

  /**
   * Get the entity pointed by the current link.
   *
   * As we don't know which kind of entity is pointed by `link` and we only need
   * the `yoast_head` field, we cast the returned entity to a type with only
   * that property.
   */
  const entity = (getEntity({ state, link }) as unknown) as WithYoastHead;

  // Get the `yoast_head` field from entity.
  let yoastHead = entity?.yoast_head || "";

  if (state.yoast.transformLinks) {
    // Props to replace all links present in `yoast_head`.
    const html = yoastHead;
    const ignore = state.yoast.transformLinks.ignore;
    const base =
      state.yoast.transformLinks.base || getWpUrl(state.source.api, false).href;
    const newBase = state.frontity.url;

    // Memoize the html code with all links transformed.
    yoastHead = React.useMemo(
      () => transformAllLinks({ html, ignore, base, newBase }),
      [html, ignore, base, newBase]
    );
  }

  // Render all tags inside <head>.
  const Html2React = libraries.html2react.Component;
  return <Html2React html={yoastHead} processors={[yoastHeadProcessor]} />;
};

export default connect(Root);

import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";
import headTag from "../processors/headTag";

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
  const data = state.source.get(state.router.link);
  let yoastHead = "";

  if (data.isPostType) {
    const { type, id } = data;
    yoastHead = state.source[type][id].yoast_head;
  }

  if (data.isTaxonomy) {
    const { taxonomy, id } = data;
    yoastHead = state.source[taxonomy][id].yoast_head;
  }

  if (data.isAuthor) {
    const { id } = data;
    yoastHead = state.source.author[id].yoast_head;
  }

  if (data.isPostTypeArchive) {
    const { type } = data;
    yoastHead = state.source.type[type].yoast_head;
  }

  const Html2React = libraries.html2react.Component;

  // Render all tags inside <head>.
  return <Html2React html={yoastHead || ""} processors={[headTag]} />;
};

export default connect(Root);

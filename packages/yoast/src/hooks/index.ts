import React from "react";
import { decode, useConnect } from "frontity";
import { getWpUrl } from "@frontity/head-tags/src/utils";
import { transformAllLinks } from "../utils";
import { Packages, WithYoastHead } from "../../types";
import {
  isPostType,
  isTerm,
  isAuthor,
  isPostTypeArchive,
  isTaxonomy,
} from "@frontity/source";

/**
 * Object returned for {@link useYoastHead} hook.
 */
interface UseYoastHeadResult {
  /**
   * The <title> tag content.
   */
  title?: string;

  /**
   * All the head tags in string format.
   */
  head?: string;
}

/**
 * Hook that returns either the content of the <title> tag or all the head tags.
 *
 * @param link - Link pointing to a page in Frontity.
 * @returns Object of type {@link UseYoastHeadResult}.
 */
export const useYoastHead = (link: string): UseYoastHeadResult => {
  const { state } = useConnect<Packages>();

  // Get the data object associated to link.
  const data = state.source.get(link);

  // Get the entity pointed by the given link.
  let entity: WithYoastHead = null;

  // Entities are stored in different places depending on their type.
  if (isPostType(data)) {
    const { type, id } = data;
    entity = state.source[type][id];
  } else if (isTerm(data) || isTaxonomy(data)) {
    const { taxonomy, id } = data;
    entity = state.source[taxonomy][id];
  } else if (isAuthor(data)) {
    const { id } = data;
    entity = state.source.author[id];
  } else if (isPostTypeArchive(data)) {
    const { type } = data;
    entity = state.source.type[type];
  }

  // Get the `yoast_head` field from entity.
  const html = entity?.yoast_head || "";

  const shouldUseTitle =
    state.yoast.renderTags === "server" && state.frontity.rendering === "csr";
  const shouldTransformLinks = !!state.yoast.transformLinks;

  let ignore = "";
  let base = "";
  let newBase = "";

  // Props to replace all links present in `yoast_head`.
  if (state.yoast.transformLinks) {
    ignore = state.yoast.transformLinks.ignore;
    base =
      state.yoast.transformLinks.base || getWpUrl(state.source.api, false).href;
    newBase = state.frontity.url;
  }

  // Return a memoized object depending on the previously generated values.
  return React.useMemo(() => {
    /**
     * Extract the title string from the `yoast_head` field and return it if
     * found.
     */
    if (shouldUseTitle) {
      const titleMatch = /<title>(.+)<\/title>/.exec(html);
      if (titleMatch) {
        return { title: decode(titleMatch[1]) };
      }
    }

    // Transform links in the `yoast_head` string and return it.
    if (html && shouldTransformLinks) {
      const head = transformAllLinks({ html, ignore, base, newBase });
      return { head };
    }

    // Return just the `yoast_head` string.
    if (html && !shouldTransformLinks) {
      return { head: html };
    }

    /**
     * Return an empty object if neither the title nor the head tags are going
     * to be rendered for this link.
     */
    return {};
  }, [shouldUseTitle, shouldTransformLinks, html, ignore, base, newBase]);
};

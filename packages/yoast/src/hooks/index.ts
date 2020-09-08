import React from "react";
import { decode } from "frontity";
import { State } from "frontity/types";
import { getEntity, getWpUrl } from "@frontity/head-tags/src/utils";
import { transformAllLinks } from "../utils";
import { Packages, WithYoastHead } from "../../types";

/**
 * Params for {@link useYoastHead} hook.
 */
interface UseYoastHeadParams {
  /**
   * Link pointing to a page in Frontity.
   */
  link: string;

  /**
   * Frontity state.
   */
  state: State<Packages>;
}

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
 * @param params - Object of type {@link UseYoastHeadParams}.
 * @returns Object of type {@link UseYoastHeadResult}.
 */
export const useYoastHead = ({
  link,
  state,
}: UseYoastHeadParams): UseYoastHeadResult => {
  /**
   * Get the entity pointed by the current link.
   *
   * As we don't know which kind of entity is pointed by `link` and we only need
   * the `yoast_head` field, we cast the returned entity to a type with only
   * that property.
   */
  const entity = (getEntity({ state, link }) as unknown) as WithYoastHead;

  // Get the `yoast_head` field from entity.
  const html = entity?.yoast_head || "";

  const shouldUseTitle =
    state.yoast.onlyInSSR && state.frontity.rendering === "csr";
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

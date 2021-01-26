import * as React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";
import { useYoastHead } from "../hooks";
import headWrapper from "../processors/headWrapper";

/**
 * Render all meta tags included in the `yoast_meta` field, if that field exists
 * in the entity pointed by the current link.
 *
 * @param props - Frontity props injected by {@link connect}.
 *
 * @returns React element.
 */
export const Root: React.FC<Connect<Packages>> = ({ state, libraries }) => {
  // Get current link.
  const { link } = state.router;

  /**
   * Get `title` or `head` param from the `yoast_head` field, depending on the
   * Yoast package settings.
   */
  const { title, head } = useYoastHead(link);

  /**
   * Render the `title` string extracted from the `<title>` tag present in the
   * `yoast_head` field.
   */
  if (title) {
    return (
      <Head>
        <title>{title}</title>
      </Head>
    );
  }

  /**
   * Render all tags inside <head>.
   *
   * We need to use <Html2React> here plus a processor because we cannot add
   * the `yoast_head` string directly inside the <Head> component, it must be
   * parsed first and converted to React elements.
   */
  if (head) {
    const Html2React = libraries.html2react.Component;
    return <Html2React html={head} processors={[headWrapper]} />;
  }

  // Return nothing if there are not `title` or `head`.
  return null;
};

export default connect(Root);

import { Element } from "@frontity/html2react/types";

const httpRegexp = /^http:\/\//;

/**
 * Replace "http://" with "https://" in the src property of an HTML element.
 *
 * @param node - An HTML element.
 *
 * @returns The same element with http:// substituted with https://.
 */
export const httpToHttps = (node: Element) => {
  // AMP requires that the file is loaded over HTTPS
  if (node.props?.src?.match(httpRegexp)) {
    node.props.src = node.props.src.replace(httpRegexp, "https://");
    return node;
  }
  return node;
};

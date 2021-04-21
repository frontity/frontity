import { Element } from "@frontity/html2react/types";
import { warn } from "frontity";

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
    warn(
      `<${
        typeof node.component === "function"
          ? node.component.displayName || node.component.name
          : node.component
      }> element with src of ${
        node.props.src
      } was found but AMP requires resources to be loaded over HTTPS.\n
Frontity will update the src attribute to point to the HTTPS version but you need to ensure that the asset is available over HTTPS.`
    );
    return node;
  }
  return node;
};

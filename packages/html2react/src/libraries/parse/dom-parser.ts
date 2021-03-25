import { css, decode } from "frontity";
import * as Html2React from "../../../types";
import htmlAttributes from "./attributes/html.json";
import svgAttributes from "./attributes/svg.json";

// Map of lowercased HTML and SVG attributes to get their camelCase version.
const attributesMap: Record<string, string> = htmlAttributes
  .concat(svgAttributes)
  .reduce((map, value) => {
    map[value.toLowerCase()] = value;
    return map;
  }, {});

const nodeTypes = {
  1: "element",
  3: "text",
  8: "comment",
};

/**
 * Instance of `DOMParser` (only works on the browser).
 */
const parser = typeof window !== "undefined" && new DOMParser();

/**
 * Adapter used by the parser below.
 *
 * @param domNode - HTML DOM node.
 * @param parent - Parent of the HTML DOM node.
 * @returns Parsed tree in the desired format.
 */
const adaptDOMNode = (
  domNode: Node,
  parent?: Html2React.Element
): Html2React.Node => {
  let node: Html2React.Node;

  const type = nodeTypes[domNode.nodeType];

  if (type === "element") {
    const element = domNode as Element;
    node = {
      type: "element",
      component: element.tagName.toLowerCase(),
      props: Array.from(element.attributes).reduce(
        (props: Html2React.Element["props"], { name: key, value }) => {
          // Wordpress returns links with HTML escaped entitites so we have to decode them
          if (typeof value === "string") value = decode(value);

          // mapping from HTML attribute names to react names:  // https://github.com/facebook/react/blob/58b8797b7372c9296e65e08ce8297e4a394b7972/packages/react-dom/src/shared/DOMProperty.js#L241-L244
          if (key === "class") {
            props.className = value;
          } else if (key === "for") {
            props.htmlFor = value;
          } else if (/^data-/.test(key)) {
            props[key] = value;
          } else if (key === "style") {
            // Add inline styles to the component with `emotion`.
            props.css = css(value);
          } else if (!/^on/.test(key)) {
            const camelCaseKey =
              attributesMap[key.replace(/[-:]/, "").toLowerCase()];
            // Map keys with no value to `true` booleans.
            props[camelCaseKey || key] = value === null ? true : value;
          }

          return props;
        },
        {}
      ),
    };

    node.children = Array.from(domNode.childNodes).reduce(
      (tree: Html2React.Node[], child): Html2React.Node[] => {
        const childAdapted = adaptDOMNode(child, node as Html2React.Element);
        if (childAdapted) tree.push(childAdapted);
        return tree;
      },
      []
    );
  }

  if (type === "text") {
    const content = decode(domNode.textContent);

    if (content.trim().length) {
      node = { type, content };
    } else return null;
  }

  if (type === "comment") {
    const content = decode(domNode.textContent);

    if (content.trim().length) {
      node = { type, content };
    } else return null;
  }

  if (parent) node.parent = parent;

  return node;
};

/**
 * Parses the HTML and returns AST.
 *
 * @param html - The HTML from content.
 *
 * @returns The AST of the HTML.
 */
const parse = (html: string): Html2React.Node[] =>
  Array.from(parser.parseFromString(html, "text/html").body.childNodes).reduce(
    (tree: Html2React.Node[], element) => {
      const adapted = adaptDOMNode(element);
      if (adapted) tree.push(adapted);
      return tree;
    },
    []
  );

export default parse;

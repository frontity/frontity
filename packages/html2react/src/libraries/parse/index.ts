import { css, decode } from "frontity";
import { css as cssFunc } from "@emotion/css";
import { parse as himalaya } from "himalaya";
import { Element, Node } from "../../../types";
import htmlAttributes from "./attributes/html.json";
import svgAttributes from "./attributes/svg.json";
import { Node as HimalayaNode } from "../../../himalaya/types";

// Map of lowercased HTML and SVG attributes to get their camelCase version.
const attributesMap: Record<string, string> = htmlAttributes
  .concat(svgAttributes)
  .reduce((map, value) => {
    map[value.toLowerCase()] = value;
    return map;
  }, {});

/**
 * Adapts the Himalaya AST Specification v1 to our format.
 *
 * @param himalayaNode - The node comming from himalaya.
 * @param parent - The parent node.
 *
 * @returns The final and modified node.
 */
const adaptNode = (himalayaNode: HimalayaNode, parent?: Element): Node => {
  let node: Node;

  if (himalayaNode.type === "element") {
    node = {
      type: himalayaNode.type,
      component: himalayaNode.tagName,
      props: himalayaNode.attributes.reduce(
        (props: Element["props"], { key, value }) => {
          // Wordpress returns links with HTML escaped entitites so we have to decode them
          if (typeof value === "string") value = decode(value);

          // mapping from HTML attribute names to react names:  // https://github.com/facebook/react/blob/58b8797b7372c9296e65e08ce8297e4a394b7972/packages/react-dom/src/shared/DOMProperty.js#L241-L244
          if (
            key === "class" &&
            !isCustomComponent(himalayaNode.tagName, props)
          ) {
            props.className = value;
          } else if (key === "for") {
            props.htmlFor = value;
          } else if (/^data-/.test(key)) {
            props[key] = value;
          } else if (key === "style") {
            if (isCustomComponent(himalayaNode.tagName, props)) {
              (props as any).class = cssFunc(value);
              delete props.className;
            } else {
              // Add inline styles to the component with `emotion`.
              props.css = css(value);
            }
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

    node.children = himalayaNode.children.reduce(
      (tree: Node[], child): Node[] => {
        const childAdapted = adaptNode(child, node as Element);
        if (childAdapted) tree.push(childAdapted);
        return tree;
      },
      []
    );
  }

  if (himalayaNode.type === "text") {
    const content = decode(himalayaNode.content);

    if (content.trim().length) {
      node = {
        type: himalayaNode.type,
        content: content,
      };
    } else return null;
  }

  if (himalayaNode.type === "comment") {
    const content = decode(himalayaNode.content);

    if (content.trim().length) {
      node = {
        type: himalayaNode.type,
        content: content,
      };
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
const parse = (html: string): Node[] =>
  himalaya(html).reduce((tree: Node[], element) => {
    const adapted = adaptNode(element);
    if (adapted) tree.push(adapted);
    return tree;
  }, []);

/**
 * Checks if a component is a Custom Component.
 * This is function is a copy of:
 * https://github.com/facebook/react/blob/c954efa70f44a44be9c33c60c57f87bea6f40a10/packages/react-dom/src/shared/isCustomComponent.js.
 *
 * @param tagName - The name of the tag.
 * @param props - Props that are passed to that component.
 *
 * @returns True or false.
 */
function isCustomComponent(tagName: string, props: Element["props"]) {
  if (tagName.indexOf("-") === -1) {
    return typeof props.is === "string";
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}

export default parse;

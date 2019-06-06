import { parse as himalaya } from "himalaya";
import { Node as HimalayaNode } from "../../../himalaya/types";
import { Element, Node, Parse, Attributes } from "../../../types";
import he from "he";
import htmlMap from "./html-map";
import svgMap from "./svg-map";

// Adapts the Himalaya AST Specification v1
// (see https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md)
// to our format, with the following structure:

// Map of lowercased HTML and SVG attributes to get their camelCase version.
const attrMap: Attributes = { ...htmlMap, ...svgMap };

function adaptNode(element: HimalayaNode, parent?: Element): Node {
  let node: Node;

  if (element.type === "element") {
    node = {
      type: element.type,
      component: element.tagName,
      props: element.attributes.reduce(
        (props: Element["props"], { key, value }) => {
          if (key === "class") {
            props.className = value;
          } else if (key === "style") {
            props["data-style"] = value;
          } else if (!/^on/.test(key)) {
            const camelCaseKey = attrMap[key.toLowerCase()];
            // Map keys with no value to `true` booleans.
            props[camelCaseKey || key] = value === null ? true : value;
          }

          return props;
        },
        {}
      )
    };

    node.children = element.children.reduce((tree: Node[], child): Node[] => {
      const childAdapted = adaptNode(child, node as Element);
      if (childAdapted) tree.push(childAdapted);
      return tree;
    }, []);
  }

  if (element.type === "text") {
    const content = he.decode(element.content);

    if (content.trim().length) {
      node = {
        type: element.type,
        content: content
      };
    } else return null;
  }

  if (element.type === "comment") {
    const content = he.decode(element.content);

    if (content.trim().length) {
      node = {
        type: element.type,
        content: content
      };
    } else return null;
  }

  if (parent) node.parent = parent;

  return node;
}

const parse: Parse = html =>
  himalaya(html).reduce((tree: Node[], element) => {
    const adapted = adaptNode(element);
    if (adapted) tree.push(adapted);
    return tree;
  }, []);

export default parse;

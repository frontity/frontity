import { Package, State } from "frontity/types";
import React from "react";
import { SerializedStyles } from "@emotion/core";

/**
 * HTML to React converter for Frontity.
 */
interface Html2React extends Package {
  /**
   * Package name.
   */
  name: "@frontity/html2react";

  /**
   * Libraries exposed by this package.
   */
  libraries: {
    /**
     * Html2React namespace.
     */
    html2react: {
      /**
       * List of Processor used by the <Html2React> component by default.
       */
      processors: Processor[];

      /**
       * Convert an HTML string into React elements (see {@link Component}).
       */
      Component: Component;
    };
  };
}

export default Html2React;

/**
 * HTML element.
 */
export interface Element {
  /**
   * Node type.
   */
  type: "element";

  /**
   * Tag name or React component of this element.
   */
  component: string | React.ComponentType;

  /**
   * Element attributes or React properties.
   */
  props: {
    /**
     * CSS styles for this element created with the
     * [`css`](https://docs.frontity.org/api-reference-1/frontity#css) tagged
     * template.
     */
    css?: SerializedStyles;
  } & React.HTMLProps<any>;

  /**
   * Nodes wrapped by this element.
   */
  children?: Node[];

  /**
   * Parent element.
   */
  parent?: Element;
}

/**
 * Text nodes.
 */
export interface Text {
  /**
   * Node type.
   */
  type: "text";

  /**
   * Text content.
   */
  content: string;

  /**
   * Parent element.
   */
  parent?: Element;
}

/**
 * Comment nodes.
 */
export interface Comment {
  /**
   * Node type.
   */
  type: "comment";

  /**
   * Text content.
   */
  content: string;

  /**
   * Parent element.
   */
  parent?: Element;
}

/**
 * An HTML node.
 */
export type Node = Element | Text | Comment;

/**
 * Params received by both {@link Test} and {@link Process} functions of a
 * {@link Processor}.
 */
interface Params<NodeDef extends Node, Pkg extends Package> {
  /**
   * Specific node received by this function.
   */
  node: NodeDef;

  /**
   * The root node of the HTML tree.
   */
  root: Node[];

  /**
   * Frontity state.
   */
  state: State<Pkg>;

  /**
   * Frontity libraries.
   */
  libraries: Pkg["libraries"];
}

/**
 * Define a processor to be used by the Html2React {@link Component}.
 *
 * @example
 * ```
 * // Modify anchors to open a new tab in case they
 * // point to an external link.
 * const extAnchors = {
 *   name: "external anchors",
 *   priority: 10,
 *   test: ({ node }) =>
 *     node.component === "a" && node.props.href.startsWith("http"),
 *   processor: ({ node }) => {
 *     node.props.target = "_blank";
 *     return node;
 *   }
 * };
 * ```
 */
export interface Processor<
  NodeDef extends Node = Node,
  Pkg extends Package = Package
> {
  /**
   * Processor name.
   */
  name?: string;

  /**
   * Priority for this processor.
   *
   * @defaultValue 10
   */
  priority?: number;

  /**
   * Evaluate the current node, and if it returns `true`, this node will be
   * passed down to the processor function.
   *
   * @param params - Object of type {@link Params}.
   * @returns A boolean value with the result of the evaluation.
   */
  test: (params: Params<NodeDef, Pkg>) => boolean;

  /**
   * Modify the current node.
   *
   * @param params - Object of type {@link Params}.
   * @returns The same node modified, a plain object that will be merged with
   * the current node or a falsy value in case the node is deleted.
   */
  processor: (
    params: Params<NodeDef, Pkg>
  ) => Partial<Node> | false | null | undefined;
}

/**
 * Props passed to Html2React {@link Component}.
 */
export interface ComponentProps {
  /**
   * HTML code in string format.
   */
  html: string;

  /**
   * Array of processors (see {@link Processor}).
   */
  processors?: Processor[];
}

/**
 * Convert an HTML string into React elements.
 *
 * @param props - Object of type {@link ComponentProps}.
 */
export type Component = React.FC<ComponentProps>;

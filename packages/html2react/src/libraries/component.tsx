import * as React from "react";
import { connect, error, warn } from "frontity";
import { Connect, State } from "frontity/types";
import parse from "./parse";
import Html2ReactPackage, {
  ComponentProps,
  Processor,
  Node,
  Element,
} from "../../types";

/**
 * Payload received by {@link handleNodes}, {@link handleNode} and
 * {@link applyProcessors} functions.
 */
interface Payload {
  /**
   * Root of the node tree.
   */
  root: Node[];

  /**
   * Array of processors being evaluated.
   */
  processors: Processor[];

  /**
   * Frontity state (derived from {@link Html2ReactPackage}).
   */
  state: State<Html2ReactPackage>;

  /**
   * Frontity libraries (derived from {@link Html2ReactPackage}).
   */
  libraries: Html2ReactPackage["libraries"];
}

/**
 * Params passed to {@link applyProcessors}.
 */
interface ApplyProcessorsParams extends Payload {
  /**
   * Html2React node being handled.
   */
  node: Node;
}

/**
 * Test all given processors over the specified node and run those that have
 * matched.
 *
 * If the node must be deleted, this function returns `true`. If the node was
 * or was not modified by processors but it should not be deleted, this function
 * returns `false`.
 *
 * @param applyProcessorsParams - Object of type {@link ApplyProcessorsParams}.
 * @returns `true` if the node must be removed, `false` otherwise.
 */
const applyProcessors = ({
  node,
  processors,
  ...payload
}: ApplyProcessorsParams): boolean => {
  for (const proc of processors) {
    // Add deprecation warning for process.
    if ((proc as any).process)
      warn(
        `The property 'process' has been deprecated.
Please use the new 'processor' property instead and check the documentation to see the additional changes of the new API:
https://docs.frontity.org/api-reference-1/frontity-html2react#create-your-own-processors`
      );

    const processor = proc.processor || (proc as any).process;
    let isMatch = false;

    // Check if test and processor are set.
    if (!proc.test || !processor)
      error(
        `The processor ${
          proc.name || "(missing name)"
        } needs both a "test" and a "processor" properties.`
      );

    // Test processor.
    try {
      /**
       * Run the tester passing node and params merged for backward
       * compatibility.
       */
      const params = { node, ...payload };
      isMatch = proc.test({ ...node, ...params });
    } catch (e) {
      console.warn(e);
    }
    if (!isMatch) continue;

    // Apply processor.
    try {
      /**
       * Run the processor passing node and params merged, and payload as
       * a second argument for backward compatibility.
       */
      const params = { node, ...payload };
      const processed = processor({ ...node, ...params }, payload);
      // Return true if node was removed.
      if (!processed) return true;
      // Merge the nodes if the processor has applied changes.
      if (node !== processed) {
        /**
         * Remove props merged before process, just in case someone
         * has used the spread operator in a processor.
         */
        Object.keys(params).forEach((key) => delete processed[key]);
        // Assign returned props.
        Object.assign(node, processed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Return false if node was not removed.
  return false;
};

/**
 * Params passed to {@link handleNode}.
 */
interface HandleNodeParams extends Payload {
  /**
   * Html2React node being handled.
   */
  node: Node;

  /**
   * Node index to be used as the React element index.
   */
  index: number;
}

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

/**
 * Props for {@link Wrapper} component.
 */
interface WrapperProps {
  /**
   * The custom component that is passed as a prop.
   */
  Component: string;

  /**
   * CSS classes.
   */
  className: string;
}

/**
 * A wrapper component whose function is to pass the class name generated by
 * the emotion's babel plugin down to it's (only) child.
 *
 * @param props - Defined in {@link WrapperProps}.
 *
 * @returns A custom component with a `class` prop applied.
 */
const Wrapper: React.FC<WrapperProps> = ({
  Component,
  children,
  className,
  ...props
}) => {
  const CustomComponent = (Component as unknown) as React.ComponentType<{
    /**
     * TS seems to think that when you have a string as a component, it cannot
     * have children or props.
     */
    class: string;
  }>;
  return (
    <CustomComponent {...props} class={className}>
      {children}
    </CustomComponent>
  );
};

/**
 * Process a node and its children and return them converted to React elements.
 *
 * @param handleNodeParams - Object of type {@link HandleNodeParams}.
 * @returns React element.
 */
const handleNode = ({
  node,
  index,
  ...payload
}: HandleNodeParams): React.ReactNode => {
  // `applyProcessors` returns true if node was removed.
  if (applyProcessors({ node, ...payload })) return null;
  if (node.type === "comment") return null;
  if (node.type === "text") return node.content;
  if (node.type === "element") {
    if (
      // If the component is not a string, it could not be a custom component,
      // only a React component.
      typeof node.component === "string" &&
      isCustomComponent(node.component, node.props)
    ) {
      return (
        <Wrapper
          key={index}
          className={node.props.className}
          Component={node.component}
          {...node.props}
        >
          {node.children
            ? handleNodes({ nodes: node.children, ...payload })
            : null}
        </Wrapper>
      );
    }
    return (
      <node.component {...{ key: index, ...node.props }}>
        {node.children
          ? handleNodes({ nodes: node.children, ...payload })
          : null}
      </node.component>
    );
  }
};

/**
 * Params passed to {@link handleNodes}.
 */
interface HandleNodesParams extends Payload {
  /**
   * List of Html2React nodes.
   */
  nodes: Node[];
}

/**
 * Run a list of processors over a list of nodes and their children.
 *
 * @param handleNodesPayload - Object of type {@link HandleNodesPayload}.
 * @returns A React node.
 */
export const handleNodes = ({
  nodes,
  ...payload
}: HandleNodesParams): React.ReactNode => {
  const handled = nodes.reduce((final: React.ReactNodeArray, node, index) => {
    const handledNode = handleNode({ node, index, ...payload });
    if (handledNode) final.push(handledNode);
    return final;
  }, []);

  if (handled.length > 1) return handled;
  if (handled.length === 1) return handled[0];
  return null;
};

/**
 * Convert an HTML string into React elements.
 *
 * @param props - Component props (see {@link ComponentProps}).
 * @returns The `html` prop converted into React elements.
 */
export const Html2React: React.FC<
  Connect<Html2ReactPackage, ComponentProps>
> = ({ html, processors, state, libraries }) => {
  // Sort passed processors or the default ones stored in `libraries`.
  const sorted = (processors || libraries.html2react.processors).sort(
    (a, b) => (a.priority || 10) - (b.priority || 10)
  );

  /**
   * Store processors sorted by priority so it takes less time to sort them
   * the next time this component is rendered.
   */
  if (!processors) libraries.html2react.processors = sorted;

  const root = parse(html);

  return handleNodes({
    nodes: root,
    state,
    libraries,
    root,
    processors: sorted,
  }) as React.ReactElement;
};

export default connect(Html2React);

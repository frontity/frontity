import React from "react";
import { connect, error, warn } from "frontity";
import { Connect, State } from "frontity/types";
import parse from "./parse";
import Html2ReactPackage, {
  ComponentProps,
  Processor,
  Node,
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
  if (node.type === "element")
    return (
      <node.component {...{ key: index, ...node.props }}>
        {node.children
          ? handleNodes({ nodes: node.children, ...payload })
          : null}
      </node.component>
    );
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
export const Html2React: React.FC<Connect<
  Html2ReactPackage,
  ComponentProps
>> = ({ html, processors, state, libraries }) => {
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

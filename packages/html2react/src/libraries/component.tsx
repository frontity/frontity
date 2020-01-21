/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2ReactType, {
  Component,
  HandleNodes,
  HandleNode,
  ApplyProcessors
} from "../../types";

const applyProcessors: ApplyProcessors = ({ node, root, processors }) => {
  for (const processor of processors) {
    const { test: tester, process } = processor;
    let isMatch = false;

    // Test processor.
    try {
      isMatch = tester(node);
    } catch (e) {
      console.warn(e);
    }
    if (!isMatch) continue;

    // Apply processor.
    try {
      const processed = process(node, { root });
      // Return true if node was removed.
      if (!processed) return true;
      // Merge the nodes if the processor has applied changes.
      if (node !== processed) Object.assign(node, processed);
    } catch (e) {
      console.error(e);
    }
  }

  // Return false if node was not removed.
  return false;
};

const handleNode: HandleNode = ({ node, payload, index }) => {
  // `applyProcessors` returns true if node was removed.
  if (applyProcessors({ node, ...payload })) return null;
  if (node.type === "comment") return null;
  if (node.type === "text") return node.content;
  if (node.type === "element")
    return (
      <node.component {...{ key: index, ...node.props }}>
        {node.children ? handleNodes({ nodes: node.children, payload }) : null}
      </node.component>
    );
};

const handleNodes: HandleNodes = ({ nodes, payload }) => {
  const handled = nodes.reduce((final: React.ReactNodeArray, node, index) => {
    const handledNode = handleNode({ node, index, payload });
    if (handledNode) final.push(handledNode);
    return final;
  }, []);

  if (handled.length > 1) return handled;
  if (handled.length === 1) return handled[0];
  return null;
};

export const Html2React: Component<
  Connect<Html2ReactType, { html: string }>
> = ({ html, libraries }) => {
  const { processors, parse, decode } = libraries.html2react;
  const root = parse(html, decode);

  libraries.html2react.processors = processors.sort(
    (a, b) => (a.priority || 10) - (b.priority || 10)
  );

  return handleNodes({
    nodes: root,
    payload: {
      root,
      processors
    }
  }) as React.ReactElement;
};

export default connect(Html2React);

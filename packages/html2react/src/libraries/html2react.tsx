import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2React from "../..";
import {
  Component,
  HandleNodes,
  HandleNode,
  ApplyProcessors
} from "../../types";

const applyProcessors: ApplyProcessors = ({ node, tree, processors }) => {
  for (let processor of processors) {
    const { test, process } = processor;
    let isMatch = false;

    // Test processor.
    try {
      isMatch = test(node);
    } catch (e) {}
    if (!isMatch) continue;

    // Apply processor.
    try {
      const processed = process(node, tree);
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

const H2R: Component<Connect<Html2React, { html: string }>> = ({
  html,
  libraries
}) => {
  const { processors, parse, decode } = libraries.html2react;
  const tree = parse(html, decode);
  return handleNodes({
    nodes: tree,
    payload: {
      tree,
      processors: processors.sort(
        (a, b) => (a.priority || 10) - (b.priority || 10)
      )
    }
  }) as React.ReactElement;
};

export default connect(H2R);

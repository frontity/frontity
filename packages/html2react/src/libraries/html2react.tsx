import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2React from "../..";
import { Node } from "./parse";

function applyProcessors({
  node,
  tree,
  processors
}: {
  node: Node;
  tree: Node[];
  processors: any;
}): boolean {
  for (let processor of processors) {
    const { test, process } = processor;

    let isMatch = false;

    // Test processor.
    try {
      isMatch = test(node);
    } catch (e) {}

    // Apply processor.
    if (isMatch) {
      try {
        const processed = process(node, tree);
        // Return true if node was removed.
        if (!processed) return true;
        // Do a shallow merge if node is different.
        if (node !== processed) Object.assign(node, processed);
      } catch (e) {
        console.error(e);
      }
    }
  }

  // Return false if node was not removed
  return false;
}

function handleNode({
  node,
  payload,
  index
}: {
  node: Node;
  payload: {
    tree: Node[];
    processors: any;
  };
  index: number;
}): React.ReactNode {
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
}

function handleNodes({
  nodes,
  payload
}: {
  nodes: Node[];
  payload: {
    tree: Node[];
    processors: any;
  };
}): React.ReactNode {
  const handled = nodes.reduce((final: React.ReactNodeArray, node, index) => {
    const handledNode = handleNode({ node, index, payload });
    if (handledNode) final.push(handledNode);
    return final;
  }, []);

  if (handled.length > 1) return handled;
  if (handled.length === 1) return handled[0];
  return null;
}

const Component: React.FC<Connect<Html2React, { html: string }>> = ({
  html,
  libraries
}) => {
  const { processors, parse } = libraries.html2react;

  const tree = parse(html);

  return handleNodes({
    nodes: tree,
    payload: { tree, processors }
  }) as React.ReactElement;
};

export default connect(Component);

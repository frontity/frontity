import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2React from "../..";

function applyProcessors({
  node,
  htmlTree,
  processors
}: {
  node: any;
  htmlTree: any;
  processors: any;
}) {
  for (let i = 0; i < processors.length; i += 1) {
    const { options, test, process } = processors[i];

    const payload = {
      htmlTree,
      ...options
    };

    // Test processor function
    let isMatch = false;
    try {
      isMatch = test(node, payload);
    } catch (e) {
      // ignore error
    }

    // Apply processor function
    if (isMatch) {
      try {
        const processed = process(node, payload);

        // Return true if was removed
        if (!processed) return true;

        // Do a shallow merge if node is different
        if (node !== processed) {
          Object.assign(node, processed);
        }
      } catch (e) {
        // Show error message and continue processing
        console.error(e);
      }
    }
  }

  // Return false if node was not removed
  return false;
}

function handleNodes({
  nodes,
  htmlTree,
  processors
}: {
  nodes: any;
  htmlTree?: any;
  processors: any;
}) {
  if (!nodes) return null;

  const handled = nodes.map((node: any, index: number) =>
    handleNode({ node: node, index, htmlTree, processors })
  );

  const compacted = handled.filter(node => node);
  if (compacted.length > 1) return compacted;
  if (compacted.length === 1) return compacted[0];
  return null;
}

function handleNode({
  node,
  index,
  htmlTree,
  processors
}: {
  node: any;
  htmlTree: any;
  index: any;
  processors: any;
}) {
  const isRemoved = false; //applyProcessors({ node, htmlTree, processors });

  // Return nothing for 'comment' nodes
  if (isRemoved || node.type === "comment") return null;

  // Return the content of 'text' nodes
  if (node.type === "text") return node.content;

  // Convert 'element' nodes to React
  return (
    <node.component {...node.props} key={index}>
      {handleNodes({ nodes: node.children, htmlTree, processors })}
    </node.component>
  );
}

const Component: React.FC<Connect<Html2React, { html: string }>> = ({
  html,
  libraries
}) => {
  const { processors, parse } = libraries.html2react;

  const htmlTree = parse(html);

  console.log("tree:", htmlTree);

  return handleNodes({ nodes: htmlTree, processors });
};

export default connect(Component);

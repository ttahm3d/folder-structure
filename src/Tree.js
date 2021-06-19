import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";

const Tree = ({ data }) => {
  return (
    <>
      {data.map((child) => (
        <TreeNode key={child.id} node={child} />
      ))}
    </>
  );
};

const TreeNode = ({ node }) => {
  const isNode = node.selected === 1 || node.type === "item";
  return (
    <>
      {isNode ? (
        <TreeItem nodeId={node.id} label={node.name}>
          <Tree data={node.children} />
        </TreeItem>
      ) : (
        <TreeItem nodeId={node.id} label={node.name} />
      )}
    </>
  );
};

export default Tree;

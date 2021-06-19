import React, { useEffect } from "react";
import TreeItem from "@material-ui/lab/TreeItem";

const Tree = ({ data }) => {
  useEffect(() => {}, [data]);

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

  const onDragStart = (event, draggedNode) => {
    console.log(draggedNode);
    const data = JSON.stringify(draggedNode);
    event.dataTransfer.setData("node", data);
  };

  const onDrop = (event, droppableNode) => {
    let draggedNode = JSON.parse(event.dataTransfer.getData("node"));
    console.log(droppableNode.children);
    droppableNode.children.push(draggedNode);
    console.log(droppableNode.children);
  };

  const onDragEnd = (event, node) => {};

  useEffect(() => {}, [node]);

  return (
    <>
      {isNode ? (
        <TreeItem
          draggable
          nodeId={node.id}
          label={node.name}
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => onDragStart(e, node)}
          onDrop={(e) => onDrop(e, node)}
        >
          <Tree data={node.children} />
        </TreeItem>
      ) : (
        <TreeItem
          draggable
          nodeId={node.id}
          label={node.name}
          onDragStart={(e) => onDragStart(e, node)}
          onDragEnd={(e) => onDragEnd(e, node)}
        />
      )}
    </>
  );
};

export default Tree;

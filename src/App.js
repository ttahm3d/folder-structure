import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
// import Tree from "./Tree";

import "./App.css";

const fetchData = async () => {
  const response = await axios.get(
    `https://api.npoint.io/93bed93a99df4c91044e`
  );
  return response.data;
};

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const { data, error, loading } = useQuery("restaurantData", fetchData);

  useEffect(() => {
    setRecommendations(data ? data.body.Recommendations : []);
  }, [data]);

  return (
    <div className="App">
      <h1>Restaurtant list</h1>
      {error && <p>Error in loading</p>}
      {loading && <p>Loading</p>}
      {data &&
        recommendations.map((restaurant) => (
          <TreeView
            key={restaurant.RestaurantID}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem
              nodeId={restaurant.RestaurantID}
              label={restaurant.RestaurantName}
            >
              {
                (restaurant.menu[0].type = "sectionheader" ? (
                  <Tree data={restaurant.menu[0].children} />
                ) : null)
              }
            </TreeItem>
          </TreeView>
        ))}
    </div>
  );
}

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
  const [dragged, setDragged] = useState(false);
  const isNode = node.selected === 1 || node.type === "item";

  const onDragStart = (event, draggedNode) => {
    event.stopPropagation();
    console.log(draggedNode);
    const data = JSON.stringify(draggedNode);
    event.dataTransfer.setData("node", data);
  };

  const onDrop = (event, droppableNode) => {
    let draggedNode = JSON.parse(event.dataTransfer.getData("node"));
    droppableNode.children.push(draggedNode);
  };

  const onDragEnd = (event, node) => {
    event.preventDefault();
    event.stopPropagation();

    setDragged(true);
  };

  useEffect(() => {}, [node, node.children]);

  return (
    <>
      {isNode ? (
        <TreeItem
          style={{ display: dragged ? "none" : "block" }}
          draggable
          nodeId={node.id}
          label={node.name}
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => onDragStart(e, node)}
          onDrop={(e) => onDrop(e, node)}
          onDragEnd={(e) => onDragEnd(e, node)}
        >
          <Tree data={node.children} />
        </TreeItem>
      ) : (
        <TreeItem
          draggable
          nodeId={node.id}
          label={node.name}
          style={{ display: dragged ? "none" : "block" }}
          onDragStart={(e) => onDragStart(e, node)}
          onDragEnd={(e) => onDragEnd(e, node)}
        />
      )}
    </>
  );
};
export default App;

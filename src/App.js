import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Tree from "./Tree";

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

export default App;

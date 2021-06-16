import "./App.css";
import { useQuery } from "react-query";
import axios from "axios";

const fetchData = async () => {
  const response = await axios.get(
    `https://api.npoint.io/93bed93a99df4c91044e`
  );
  return response.data;
};

function App() {
  const { data, error, loading } = useQuery("restaurantData", fetchData);

  return (
    <div className="App">
      {error && <p>Error in loading</p>}
      {loading && <p>Loading</p>}
      {data && console.log(data)}
      <h1>Folder structure</h1>
    </div>
  );
}

export default App;

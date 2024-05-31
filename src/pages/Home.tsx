import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ListView from "../components/ListView";
import CardView from "../components/CardView";
import { Review } from "../types/Review";

function Home() {
  const [viewMode, setViewMode] = useState("list");
  const [data, setData] = useState<Review[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/camera");

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleIconSwitch = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "card" : "list"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header handleIconSwitch={handleIconSwitch} />
      <div className="p-4">
        {viewMode === "list" ? (
          <ListView data={data} />
        ) : (
          <CardView data={data} />
        )}
      </div>
    </div>
  );
}

export default Home;

import { useState } from "react";
import Header from "../components/Header";
import ListView from "../components/ListView";
import CardView from "../components/CardView";
import { Review } from "../types/Review";

interface HomeProps {
  data: Review[];
}

function Home({ data }: HomeProps) {
  const [viewMode, setViewMode] = useState("list");

  const handleIconSwitch = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "card" : "list"));
  };

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

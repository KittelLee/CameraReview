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
  const [searchTerm, setSearchTerm] = useState("");

  const handleIconSwitch = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "card" : "list"));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredData = data.filter((review) =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header handleIconSwitch={handleIconSwitch} handleSearch={handleSearch} />
      <div className="p-4">
        {viewMode === "list" ? (
          <ListView data={filteredData} searchTerm={searchTerm || ""} />
        ) : (
          <CardView data={filteredData} searchTerm={searchTerm || ""} />
        )}
      </div>
    </div>
  );
}

export default Home;

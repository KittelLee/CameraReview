import { useState, useEffect } from "react";
import "./globals.css";
import Home from "./pages/Home";
import { Review } from "./types/Review";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/Detail";

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/camera`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
          setFilteredReviews(data);
          console.log("Received camera data:", data);
        } else {
          console.error("No camera data found in the fetched data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApplyFilters = (filters: string[], sortOption: string) => {
    let filteredData = [...reviews];

    if (filters.length > 0) {
      filteredData = filteredData.filter((review) =>
        filters.includes(review.brand)
      );
    }

    switch (sortOption) {
      case "가격높은순":
        filteredData.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
          return priceB - priceA;
        });
        break;
      case "가격낮은순":
        filteredData.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
          return priceA - priceB;
        });
        break;
      case "이름순":
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredReviews(filteredData);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home data={filteredReviews} onApplyFilters={handleApplyFilters} />
          }
        />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

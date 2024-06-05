import { useState, useEffect } from "react";
import "./globals.css";
import Home from "./pages/Home";
import { Review } from "./types/Review";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/Detail";
import Navbar from "./components/Navbar";

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
          const priceA =
            typeof a.price === "number" ? a.price : parseFloat(a.price);
          const priceB =
            typeof b.price === "number" ? b.price : parseFloat(b.price);
          return priceB - priceA;
        });
        break;
      case "가격낮은순":
        filteredData.sort((a, b) => {
          const priceA =
            typeof a.price === "number" ? a.price : parseFloat(a.price);
          const priceB =
            typeof b.price === "number" ? b.price : parseFloat(b.price);
          return priceA - priceB;
        });
        break;
      case "이름순":
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "등급순":
        filteredData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredReviews(filteredData);
  };

  return (
    <div className="App">
      <Navbar onApplyFilters={handleApplyFilters} />
      <Routes>
        <Route path="/" element={<Home data={filteredReviews} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./globals.css";
import Home from "./pages/Home";
import { Review } from "./types/Review";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/Detail";

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/camera`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={reviews} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./globals.css";
import Home from "./pages/Home";
import { Review } from "./types/Review";

function App() {
  const [data, setData] = useState<Review[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/camera`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <h1>Camera Reviews</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>

      <Home />
    </div>
  );
}

export default App;

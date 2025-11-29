import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/api/auctions")   // ✅ correct route
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error loading auctions:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h1>All Auction Items</h1>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3>{item.title}</h3>                   {/* ✅ correct field */}
            <p>{item.description}</p>              {/* optional */}
            <p><strong>Starting Bid:</strong> ${item.startingBid}</p>

            <Link to={`/item/${item._id}`}>
              <button style={styles.button}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>No auction items found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "6px 12px",
    cursor: "pointer",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

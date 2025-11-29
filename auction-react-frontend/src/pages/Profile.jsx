import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function Profile() {
  const [items, setItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axiosClient
      .get("/auctions")
      .then((res) => {
        const userItems = res.data.filter(
          (item) => item.ownerId === userId
        );
        setItems(userItems);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div style={styles.container}>
      <h1>Your Items</h1>

      {items.length === 0 ? (
        <p>You have not added any items yet.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <Link to={`/item/${item._id}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link to="/add">
        <button style={styles.addButton}>Add New Item</button>
      </Link>
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
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  addButton: {
    marginTop: "30px",
    padding: "12px 20px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
  },
};

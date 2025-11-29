import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);

  const userId = localStorage.getItem("userId");

  // Load item details
  useEffect(() => {
    axiosClient
      .get(`/auctions/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!item) return <p style={{ padding: 20 }}>Loading...</p>;

  // DELETE item
  const handleDelete = () => {
    axiosClient
      .delete(`/auctions/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h1>{item.name}</h1>

      <p>{item.description}</p>
      <p><strong>Price:</strong> ${item.price}</p>

      {/* Only show edit/delete if user owns this item */}
      {item.ownerId === userId && (
        <div style={styles.actions}>
          <Link to={`/edit/${item._id}`}>
            <button style={styles.edit}>Edit</button>
          </Link>

          <button style={styles.delete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  },
  edit: {
    background: "#333",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
  },
  delete: {
    background: "red",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
  },
};

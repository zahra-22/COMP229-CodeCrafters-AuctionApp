import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function AddItem() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auctions", { name, description, price })
      .then((res) => {
        setSuccess("Item added successfully!");

        setTimeout(() => {
          navigate("/");
        }, 800);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h1>Add New Item</h1>

      <form style={styles.form} onSubmit={handleAdd}>
        <input
          style={styles.input}
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button style={styles.button}>Add Item</button>

        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  form: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  success: {
    marginTop: "10px",
    color: "green",
  },
};

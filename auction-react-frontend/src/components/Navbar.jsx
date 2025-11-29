import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link style={styles.logo} to="/">AUCTION APP</Link>
      </div>

      <div style={styles.right}>
        <Link style={styles.link} to="/">Home</Link>

        {token ? (
          <>
            <Link style={styles.link} to="/add">Add Item</Link>
            <Link style={styles.link} to="/profile">Profile</Link>
            <button style={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#222",
    color: "white",
  },
  left: {},
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

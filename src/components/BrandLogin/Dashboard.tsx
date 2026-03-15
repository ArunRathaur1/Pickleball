import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navbar } from "../layout/navbar";
import { Link } from "react-router-dom";
import ShowTournaments from "./ShowTournaments";

export default function BrandDashboard() {
  const [brand, setBrand] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const brandUserData = localStorage.getItem("brand");
    console.log("Brand User Data:", brandUserData);
    if (brandUserData) {
      try {
        const parsedData = JSON.parse(brandUserData);
        setBrand(parsedData.player);
        setMessage(parsedData.message);
      } catch (err) {
        console.error("Failed to parse brand_user cookie", err);
      }
    }
  }, []);

  if (!brand) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.welcome}>{message}</h1>
          <div style={styles.brandInfo}>
            <h2 style={styles.name}>{brand.name}</h2>
            <p>
              <strong>Phone:</strong> {brand.phone}
            </p>
            <p>
              <strong>Email:</strong> {brand.email}
            </p>
            <p style={styles.createdAt}>
              Account Created: {new Date(brand.createdAt).toLocaleString()}
            </p>
          </div>

          <div style={styles.actions}>
            <Link to="/addtournament" style={styles.link}>
              <button style={styles.primaryBtn}>Add Tournament</button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <ShowTournaments />
      </div>
    </>
  );
}

const baseColors = {
  primary: "#4caf50",
  secondary: "#388e3c",
  accent: "#2196f3",
  accentHover: "#1976d2",
  background: "#f0fdf4",
  text: "#000",
};

const styles: { [key: string]: React.CSSProperties } = {
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "#e0e0e0",
    fontFamily: "Arial, sans-serif",
  },
  loadingText: {
    fontSize: "1.2rem",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: baseColors.background,
    padding: "30px",
    borderRadius: "16px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  welcome: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: baseColors.primary,
    marginBottom: "20px",
  },
  brandInfo: {
    marginBottom: "20px",
    fontSize: "1rem",
    color: baseColors.text,
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: baseColors.primary,
  },
  createdAt: {
    marginTop: "10px",
    fontSize: "0.85rem",
    color: baseColors.primary,
  },
  actions: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
  },
  primaryBtn: {
    backgroundColor: baseColors.primary,
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  secondaryBtn: {
    backgroundColor: baseColors.accent,
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

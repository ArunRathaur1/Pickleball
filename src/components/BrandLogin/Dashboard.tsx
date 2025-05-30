import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navbar } from "../layout/navbar";
import { Link } from "react-router-dom";
import Tournaments from "@/pages/Tournament/Tournaments";
import ShowTournaments from "./ShowTournaments";
export default function BrandDashboard() {
  const [brand, setBrand] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const brandUserData = Cookies.get("brand_user");
    if (brandUserData) {
      try {
        const parsedData = JSON.parse(brandUserData);
        setBrand(parsedData.player); // Assuming it's called 'player' in cookie
        setMessage(parsedData.message);
      } catch (err) {
        console.error("Failed to parse brand_user cookie", err);
      }
    }
  }, []);

  if (!brand) {
    return (
      <div className="loading-container">
        <p>Loading user data...</p>
        <style>{`
          .loading-container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--bg);
            color: var(--text);
            font-family: Arial, sans-serif;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-card">
          <h1 className="welcome-message">{message}</h1>
          <div className="brand-info">
            <h2>{brand.name}</h2>
            <p>
              <strong>Phone:</strong> {brand.phone}
            </p>
            <p>
              <strong>Email:</strong> {brand.email}
            </p>
            <p className="created-at">
              Account Created: {new Date(brand.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="action-buttons">
            <Link to="/addtournament">
              <button className="action-btn">Add Tournament</button>
            </Link>
            <button className="action-btn secondary">Add Club</button>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div>
        <ShowTournaments></ShowTournaments>
      </div>
      <style>{`
        :root {
          --primary: #4caf50;
          --secondary: #388e3c;
          --bg: #fff;
          --text: #000;
          --card-bg: #f0fdf4;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #121212;
            --text: #e0e0e0;
            --card-bg: #1e2a1f;
          }
        }

        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          background-color: var(--bg);
          color: var(--text);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .dashboard-card {
          background-color: var(--card-bg);
          padding: 30px;
          border-radius: 16px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          text-align: center;
        }

        .welcome-message {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .brand-info h2 {
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: var(--primary);
        }

        .brand-info p {
          margin: 5px 0;
          font-size: 1rem;
        }

        .created-at {
          margin-top: 10px;
          font-size: 0.85rem;
          color: var(--primary);
        }

        .action-buttons {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-btn {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 12px 18px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .action-btn:hover {
          background-color: var(--secondary);
        }

        .action-btn.secondary {
          background-color: #2196f3;
        }

        .action-btn.secondary:hover {
          background-color: #1976d2;
        }
      `}</style>
    </>
  );
}

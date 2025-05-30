import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navbar
  
 } from "../layout/navbar";

export default function BrandDashboard() {
  const [player, setPlayer] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const brandUserData = Cookies.get("brand_user");
    if (brandUserData) {
      try {
        const parsedData = JSON.parse(brandUserData);
        setPlayer(parsedData.player);
        setMessage(parsedData.message);
      } catch (err) {
        console.error("Failed to parse brand_user cookie", err);
      }
    } else {
      console.log("No brand_user cookie found");
    }
  }, []);

  if (!player) {
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
      <Navbar></Navbar>
      <div className="dashboard-container">
        <h1 className="message">{message}</h1>
        <div className="player-info">
          <h2>{player.name}</h2>
          <p>
            <strong>Phone:</strong> {player.phone}
          </p>
          <p>
            <strong>Email:</strong> {player.email}
          </p>
          <p>
            <small>
              Account Created: {new Date(player.createdAt).toLocaleString()}
            </small>
          </p>
        </div>

        <style>{`
        /* Colors */
        :root {
          --green: #4caf50;
          --white: #fff;
          --black: #000;
          --bg: #fff;
          --text: #000;
          --card-bg: #e8f5e9;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #121212;
            --text: #eee;
            --card-bg: #1e2a1f;
          }
        }

        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          background-color: var(--bg);
          color: var(--text);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          text-align: center;
        }

        .message {
          color: var(--green);
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 1.5rem;
        }

        .player-info h2 {
          margin: 0 0 10px 0;
          color: var(--green);
          font-weight: 700;
          font-size: 1.3rem;
        }

        .player-info p {
          margin: 5px 0;
          font-size: 1rem;
          color: var(--text);
        }

        .player-info small {
          color: var(--green);
          font-size: 0.85rem;
        }
      `}</style>
      </div>
    </>
  );
}

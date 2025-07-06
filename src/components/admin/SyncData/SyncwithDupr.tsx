import React, { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API; // Use the environment variable for API URL
const continents = ["Africa", "Asia", "Europe", "NorthAmerica", "SouthAmerica"];

export default function SyncwithDupr() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSync = async (continent: string) => {
    setLoading(continent);
    setMessage("");

    try {
      const res = await axios.get(
        `${API}/ranking/sync-from-dupr/${continent}`
      );
      setMessage(
        `✅ ${continent} synced successfully. Updated: ${
          res.data.totalUpdated || "N/A"
        }`
      );
    } catch (err) {
      console.error(err);
      setMessage(`❌ Failed to sync ${continent}`);
    } finally {
      setLoading(null);
    }
  };

  const handleFillRankings = async () => {
    setLoading("fill-rankings");
    setMessage("");

    try {
      const res = await axios.get(
        `${API}/ranking/fill-rankings`
      );
      setMessage(
        `✅ Rankings updated! Total Ranked: ${res.data.totalRanked}, Singles: ${res.data.validSingles}, Doubles: ${res.data.validDoubles}`
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fill rankings.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Sync with DUPr</h2>
      <p style={{ marginBottom: "20px" }}>
        This will sync player data with the DUPr API by continent and update
        rankings.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => handleSync(continent)}
            disabled={loading === continent}
            style={{
              padding: "10px 20px",
              backgroundColor: loading === continent ? "#999" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading === continent ? "Syncing..." : `Sync ${continent}`}
          </button>
        ))}
      </div>

      <button
        onClick={handleFillRankings}
        disabled={loading === "fill-rankings"}
        style={{
          padding: "12px 24px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading === "fill-rankings"
          ? "Updating Rankings..."
          : "🧮 Fill Rankings"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "#333" }}>
          {message}
        </p>
      )}
    </div>
  );
}

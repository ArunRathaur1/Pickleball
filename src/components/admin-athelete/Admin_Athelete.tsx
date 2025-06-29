import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SimpleAthleteList() {
  const [athletes, setAthletes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/ranking/status-only/${statusFilter}`)
      .then((response) => {
        setAthletes(response.data.players || []);
      })
      .catch((error) => {
        console.error("Error fetching athletes:", error);
      });
  }, [statusFilter]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>{statusFilter} Athletes</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {athletes.map((athlete) => (
          <Link to={`/athelete_update/${athlete.duprId}`}>
            <div
              key={athlete._id}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={athlete.imageUrl || "https://via.placeholder.com/80"}
                alt={athlete.fullName}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />
              <h3>{athlete.fullName}</h3>
              <p>
                <strong>PlayerId:</strong> {athlete.playerId}
              </p>
              <p>
                <strong>Gender:</strong> {athlete.gender}
              </p>
              <p>
                <strong>Status:</strong> {athlete.status}
              </p>
              <p>
                <strong>Rating:</strong> {athlete.ratings?.singles || "NR"}
              </p>
              <p>
                <strong>Location:</strong> {athlete.shortAddress}
              </p>
              <p>
                <strong>Age:</strong> {athlete.age}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

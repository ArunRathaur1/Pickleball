import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SimpleAthleteList() {
  const [athletes, setAthletes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [playerIdInputs, setPlayerIdInputs] = useState({});
  const [statusInputs, setStatusInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    console.log("adminData:", adminData);

    let isValidAdmin = false;
    try {
      const parsed = JSON.parse(adminData);
      const admin = parsed.admin;
      isValidAdmin = admin && admin._id && admin.email;
    } catch (e) {
      isValidAdmin = false;
    }

    if (!adminData || !isValidAdmin) {
      navigate("/"); // Redirect to login
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`https://pickleball-phi.vercel.app/ranking/status-only/${statusFilter}`)
      .then((response) => {
        const fetchedAthletes = response.data.players || [];
        setAthletes(fetchedAthletes);

        // Prefill playerIdInputs and statusInputs
        const playerIdMap = {};
        const statusMap = {};
        fetchedAthletes.forEach((athlete) => {
          playerIdMap[athlete.duprId] = athlete.playerid || "";
          statusMap[athlete.duprId] = athlete.status || "";
        });
        setPlayerIdInputs(playerIdMap);
        setStatusInputs(statusMap);
      })
      .catch((error) => {
        console.error("Error fetching athletes:", error);
      });
  }, [statusFilter]);

  const handleInputChange = (duprId, value) => {
    setPlayerIdInputs((prev) => ({ ...prev, [duprId]: value }));
  };

  const handleStatusChange = (duprId, value) => {
    setStatusInputs((prev) => ({ ...prev, [duprId]: value }));
  };

  const handleSubmitPlayerId = async (athlete, playerid, status) => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    const email = adminData?.admin?.email;
    const password = adminData?.admin?.password;
    const duprId = athlete.duprId;

    if (!email || !password || !duprId || !playerid || !status) {
      alert(
        "All fields (email, password, duprId, playerid, status) are required."
      );
      return;
    }

    const statusUpper = status.toUpperCase();
    if (statusUpper !== "PENDING" && statusUpper !== "APPROVED") {
      alert("Status must be either 'PENDING' or 'APPROVED'.");
      return;
    }

    try {
      const response = await axios.put(
        "https://pickleball-phi.vercel.app/admin/update/playerid",
        {
          email,
          password,
          duprId,
          playerid,
          status: statusUpper,
        }
      );

      console.log("Server Response:", response.data);
      alert("Player ID and status updated successfully.");
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update player ID.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
        {statusFilter} Athletes
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Status Filter:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {athletes.map((athlete) => {
          const duprId = athlete.duprId;
          const playerIdValue = playerIdInputs[duprId] || "";
          const statusValue = statusInputs[duprId] || "";

          return (
            <div
              key={athlete._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={
                  athlete.playerlogoimage || "https://via.placeholder.com/80"
                }
                alt={athlete.fullName}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "12px",
                }}
              />
              <h3 style={{ margin: "8px 0" }}>{athlete.fullName}</h3>
              <p>
                <strong>PlayerId:</strong> {athlete.playerid}
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

              <input
                type="text"
                placeholder="Enter Player ID"
                value={playerIdValue}
                onChange={(e) => handleInputChange(duprId, e.target.value)}
                style={{
                  padding: "8px",
                  marginTop: "12px",
                  width: "90%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <select
                value={statusValue}
                onChange={(e) => handleStatusChange(duprId, e.target.value)}
                style={{
                  padding: "8px",
                  marginTop: "12px",
                  width: "90%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
              </select>

              <button
                onClick={() =>
                  handleSubmitPlayerId(athlete, playerIdValue, statusValue)
                }
                style={{
                  marginTop: "12px",
                  padding: "10px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Submit Player ID
              </button>

              <Link to={`/athelete_update/${athlete.duprId}`}>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 14px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Update Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function Admin_Athelete() {
  const [athletes, setAthletes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/athletes/admin")
      .then((response) => {
        setAthletes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching athletes:", error);
      });
  }, []);

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.DUPRIDSINGLES?.toString().includes(filter)
  );

  // Toggle status and send entire updated athlete data to backend
  const changeStatus = async (athlete) => {
    // Toggle status in the updated object
    const updatedAthlete = {
      ...athlete,
      status: !athlete.status,
    };

    const url = "http://localhost:5000/athletes";

    try {
      const response = await axios.post(url, updatedAthlete);

      if (response.status === 200 || response.status === 201) {
        // Update local state only if response is OK
        setAthletes((prevAthletes) =>
          prevAthletes.map((a) =>
            a._id === athlete._id ? { ...a, status: !a.status } : a
          )
        );
      } else {
        console.error("Failed to update status: ", response.statusText);
      }
    } catch (error) {
      console.error("Error updating athlete status:", error);
    }
  };
  

  return (
    <div style={styles.page}>
      <h1 style={{ marginBottom: "10px" }}>Admin Athlete Dashboard</h1>

      <input
        type="text"
        placeholder="Filter by DUPR ID (Singles)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={styles.input}
      />

      <div style={styles.grid}>
        {filteredAthletes.map((athlete) => (
          <div key={athlete._id} style={styles.card}>
            <img
              src={athlete.playerlogoimage}
              alt={athlete.name}
              style={styles.logo}
            />
            <h3>{athlete.name}</h3>
            <p>
              <strong>DUPR Singles:</strong> {athlete.DUPRIDSINGLES}
            </p>
            <p>
              <strong>DUPR Doubles:</strong> {athlete.DUPRIDDOUBLES}
            </p>
            <div
              style={{
                ...styles.status,
                backgroundColor: athlete.status ? "green" : "red",
              }}
            >
              {athlete.status ? "Active" : "Inactive"}
            </div>

            <button
              onClick={() => changeStatus(athlete)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                marginTop: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Change Status
            </button>
            <Link to={`/athelete_update/${athlete.identifier}`}>
              <button
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update the website
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    marginBottom: "20px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  status: {
    marginTop: "10px",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    display: "inline-block",
    fontWeight: "bold",
  },
};

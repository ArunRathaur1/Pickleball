import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SimpleSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    duperId: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, duperId, phone } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !duperId ||
      !phone
    ) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/playerlogin/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            DUPRID: duperId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      Cookies.set("player", JSON.stringify(data.player), { expires: 7 });
      alert("Signup successful!");
      navigate("/playerdashboard");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        duperId: "",
        phone: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <form onSubmit={handleSubmit}>
        {[
          "name",
          "email",
          "password",
          "confirmPassword",
          "duperId",
          "phone",
        ].map((field, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                textTransform: "capitalize",
              }}
            >
              {field === "duperId"
                ? "DUPR ID"
                : field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                field.toLowerCase().includes("password") ? "password" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

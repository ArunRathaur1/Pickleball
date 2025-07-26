import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API = import.meta.env.VITE_API;

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

    if (!name || !email || !password || !confirmPassword || !duperId || !phone) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      const response = await fetch(`${API}/playerlogin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          DUPRID: duperId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("player", JSON.stringify(data));
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
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Signup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password", "confirmPassword", "duperId", "phone"].map(
          (field, index) => (
            <div key={index}>
              <label
                className="block mb-1 text-gray-700 dark:text-gray-200 capitalize"
              >
                {field === "duperId"
                  ? "DUPR ID"
                  : field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field.toLowerCase().includes("password") ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )
        )}

        {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

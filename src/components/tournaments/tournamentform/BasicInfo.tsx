import React from "react";

export default function BasicInfo(props) {
  const { formData, handleInputChange, continents, darkMode = false } = props;

  const baseStyles = {
    section: {
      padding: "32px 0",
      background: darkMode
        ? "#1f2937"
        : "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
      borderRadius: "16px",
      marginBottom: "24px",
      color: darkMode ? "#f9fafb" : "#1f2937",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: darkMode ? "#f9fafb" : "#1f2937",
    },
    iconBox: {
      background: darkMode
        ? "linear-gradient(135deg, #22c55e, #15803d)"
        : "linear-gradient(135deg, #22c55e, #16a34a)",
      borderRadius: "12px",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: darkMode ? "#d1d5db" : "#374151",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "16px",
      border: darkMode ? "2px solid #374151" : "2px solid #e5e7eb",
      borderRadius: "12px",
      backgroundColor: darkMode ? "#374151" : "#ffffff",
      transition: "all 0.3s ease",
      boxShadow: darkMode ? "none" : "0 2px 8px rgba(0, 0, 0, 0.04)",
      outline: "none",
      color: darkMode ? "#f9fafb" : "#000",
    },
    select: {
      appearance: "none",
      cursor: "pointer",
      color: darkMode ? "#f9fafb" : "#000",
      backgroundColor: darkMode ? "#374151" : "#ffffff",
    },
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#22c55e";
    e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.2)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = darkMode ? "#374151" : "#e5e7eb";
    e.target.style.boxShadow = darkMode
      ? "none"
      : "0 2px 8px rgba(0, 0, 0, 0.04)";
  };

  return (
    <div style={baseStyles.section}>
      <div style={{ marginBottom: "48px" }}>
        <h3 style={baseStyles.title}>
          <span style={baseStyles.iconBox}>📋</span>
          Basic Information
        </h3>

        <div style={baseStyles.grid}>
          <div>
            <label style={baseStyles.label}>Tournament Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={baseStyles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label style={baseStyles.label}>Organizer</label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleInputChange}
              required
              style={baseStyles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={baseStyles.title}>
          <span
            style={{
              ...baseStyles.iconBox,
              background: "linear-gradient(135deg, #15803d, #166534)",
            }}
          >
            📍
          </span>
          Location Information
        </h3>

        <div style={baseStyles.grid}>
          {["location", "city", "state", "country"].map((field) => (
            <div key={field}>
              <label style={baseStyles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                style={baseStyles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))}

          <div>
            <label style={baseStyles.label}>Continent</label>
            <div style={{ position: "relative" }}>
              <select
                name="continent"
                value={formData.continent || ""}
                onChange={handleInputChange}
                required
                style={{ ...baseStyles.input, ...baseStyles.select }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="">Select Continent</option>
                {continents.map((continent) => (
                  <option
                    key={continent}
                    value={continent}
                    style={{ color: "#000" }}
                  >
                    {continent}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "12px",
                  color: darkMode ? "#9ca3af" : "#6b7280",
                }}
              >
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

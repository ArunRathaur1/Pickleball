import React from "react";

export default function BasicInfo(props) {
  const { formData, handleInputChange, continents } = props;

  return (
    <div
      style={{
        padding: "32px 0",
        background:
          "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
        borderRadius: "16px",
        marginBottom: "24px",
      }}
    >
      {/* Basic Information Section */}
      <div style={{ marginBottom: "48px" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📋
          </span>
          Basic Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Brand ID
            </label>
            <input
              type="text"
              name="brandId"
              value={formData.brandId}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div> */}

          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Tournament Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative", gridColumn: "span 2" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Organizer
            </label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>
        </div>
      </div>

      {/* Location Information Section */}
      <div>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #15803d, #166534)",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📍
          </span>
          Location Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          <div style={{ position: "relative", gridColumn: "span 2" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Location/Venue
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#15803d";
                e.target.style.boxShadow = "0 0 0 3px rgba(21, 128, 61, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#15803d";
                e.target.style.boxShadow = "0 0 0 3px rgba(21, 128, 61, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#15803d";
                e.target.style.boxShadow = "0 0 0 3px rgba(21, 128, 61, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#15803d";
                e.target.style.boxShadow = "0 0 0 3px rgba(21, 128, 61, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Continent
            </label>
            <div style={{ position: "relative" }}>
              <select
                name="continent"
                value={formData.continent || ""}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  fontSize: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#15803d";
                  e.target.style.boxShadow = "0 0 0 3px rgba(21, 128, 61, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                }}
              >
                <option value="">Select Continent</option>
                {continents.map((continent) => (
                  <option key={continent} value={continent}>
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
                  color: "#6b7280",
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

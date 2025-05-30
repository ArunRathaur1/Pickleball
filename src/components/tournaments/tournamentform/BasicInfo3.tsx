import React from "react";

export default function BasicInfo3(props) {
  const { formData, handleInputChange, formats, tiers } = props;

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#2e7d32",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1.5px solid #4caf50",
    fontSize: "15px",
    backgroundColor: "#e8f5e9",
    color: "#1b5e20",
    outline: "none",
    boxSizing: "border-box",
  };

  const sectionTitleStyle = {
    marginTop: "30px",
    marginBottom: "18px",
    color: "#1b5e20",
    fontWeight: "700",
    borderBottom: "2px solid #4caf50",
    paddingBottom: "4px",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const gridStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "1fr",
  };

  const responsiveGridStyle = {
    ...gridStyle,
    // Responsive grid for tablet and desktop
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  };

  return (
    <div
      style={{
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={sectionTitleStyle}>Contact Information</h3>

      <div style={responsiveGridStyle}>
        <div>
          <label style={labelStyle}>Registration Link:</label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label style={labelStyle}>Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label style={labelStyle}>Email ID:</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label style={labelStyle}>Contact Number:</label>
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
            placeholder="+1-234-567-8900"
          />
        </div>
      </div>

      <h3 style={sectionTitleStyle}>Tournament Details</h3>

      <div style={responsiveGridStyle}>
        <div>
          <label style={labelStyle}>Format:</label>
          <select
            name="format"
            value={formData.format || ""}
            onChange={handleInputChange}
            required
            style={selectStyle}
          >
            <option value="">Select Format</option>
            {formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Tier:</label>
          <select
            name="tier"
            value={formData.tier || ""}
            onChange={handleInputChange}
            required
            style={selectStyle}
          >
            <option value="">Select Tier</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                Tier {tier}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Prize Money:</label>
          <input
            type="number"
            name="prizeMoney"
            value={formData.prizeMoney || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
            placeholder="Enter amount"
          />
        </div>
      </div>

      <h3 style={sectionTitleStyle}>Important Dates</h3>

      <div style={responsiveGridStyle}>
        <div>
          <label style={labelStyle}>Registration End Date:</label>
          <input
            type="datetime-local"
            name="registrationEnd"
            value={formData.registrationEnd || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Start Date:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>End Date:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate || ""}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}

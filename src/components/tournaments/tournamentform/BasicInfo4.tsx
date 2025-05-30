import React, { useState } from "react";
import CloudinaryImageUploader from "@/components/admin-club/imageupload";

export default function BasicInfo4(props) {
  const {
    formData,
    setFormData,
    handleCategoryChange,
    genderOptions,
    removeCategory,
    addCategory,
    handleInputChange,
    handleSubmit,
  } = props;

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#004d00",
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      backgroundColor: "#e6f2e6",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 77, 0, 0.2)",
    },
    heading: {
      borderBottom: "2px solid #339933",
      paddingBottom: "8px",
      marginBottom: "20px",
      fontWeight: "700",
      fontSize: "1.5rem",
    },
    categoryBox: {
      backgroundColor: "#ccffcc",
      border: "1px solid #66bb66",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "inset 0 0 5px #66bb66",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "6px",
      marginTop: "10px",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #339933",
      fontSize: "14px",
      outlineColor: "#339933",
    },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #339933",
      fontSize: "14px",
      outlineColor: "#339933",
      backgroundColor: "#f0fff0",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #339933",
      fontSize: "14px",
      outlineColor: "#339933",
      resize: "vertical",
    },
    buttonPrimary: {
      backgroundColor: "#339933",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "20px",
      boxShadow: "0 3px 6px rgba(51, 153, 51, 0.5)",
      transition: "background-color 0.3s ease",
    },
    buttonRemove: {
      marginTop: "10px",
      backgroundColor: "#cc3333",
      color: "#fff",
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      boxShadow: "0 2px 4px rgba(204, 51, 51, 0.5)",
      transition: "background-color 0.3s ease",
    },
    buttonRemoveHover: {
      backgroundColor: "#992626",
    },
  };

  const [primaryHover, setPrimaryHover] = React.useState(false);
  const [removeHoverIndex, setRemoveHoverIndex] = React.useState(null);

  // This updates the imageUrl field in formData when upload succeeds
  const handleImageUpload = (uploadedUrl) => {
    setFormData({ ...formData, imageUrl: uploadedUrl });
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Categories</h3>
      {formData.categories.map((category, index) => (
        <div key={index} style={styles.categoryBox}>
          <h4>Category {index + 1}</h4>

          <label style={styles.label}>Category Name:</label>
          <input
            type="text"
            value={category.categoryName}
            onChange={(e) =>
              handleCategoryChange(index, "categoryName", e.target.value)
            }
            required
            style={styles.input}
          />

          <label style={styles.label}>Max Players:</label>
          <input
            type="number"
            value={category.maxPlayer}
            onChange={(e) =>
              handleCategoryChange(index, "maxPlayer", e.target.value)
            }
            required
            style={styles.input}
          />

          <label style={styles.label}>Gender:</label>
          <select
            value={category.gender}
            onChange={(e) =>
              handleCategoryChange(index, "gender", e.target.value)
            }
            required
            style={styles.select}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label style={styles.label}>Registration Fee:</label>
          <input
            type="number"
            value={category.fee}
            onChange={(e) => handleCategoryChange(index, "fee", e.target.value)}
            required
            style={styles.input}
          />

          {formData.categories.length > 1 && (
            <button
              type="button"
              onClick={() => removeCategory(index)}
              style={
                removeHoverIndex === index
                  ? { ...styles.buttonRemove, ...styles.buttonRemoveHover }
                  : styles.buttonRemove
              }
              onMouseEnter={() => setRemoveHoverIndex(index)}
              onMouseLeave={() => setRemoveHoverIndex(null)}
            >
              Remove Category
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        style={styles.buttonPrimary}
        onMouseEnter={() => setPrimaryHover(true)}
        onMouseLeave={() => setPrimaryHover(false)}
      >
        Add Category
      </button>
      <h3 style={{ ...styles.heading, marginTop: "40px" }}>
        Media and Description
      </h3>

      <label style={styles.label}>Image URL:</label>
      <input
        type="url"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        required
        style={styles.input}
      />
      <CloudinaryImageUploader onUploadSuccess={handleImageUpload} />
      <img src={formData.imageUrl}></img>
      <label style={styles.label}>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows="4"
        required
        style={styles.textarea}
      />

      <div>
        <button
          type="button"
          onClick={handleSubmit}
          style={styles.buttonPrimary}
          onMouseEnter={() => setPrimaryHover(true)}
          onMouseLeave={() => setPrimaryHover(false)}
        >
          Create Tournament
        </button>
      </div>
    </div>
  );
}

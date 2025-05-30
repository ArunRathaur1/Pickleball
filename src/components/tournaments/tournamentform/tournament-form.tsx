import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import BasicInfo2 from "./BasicInfo2";
import BasicInfo3 from "./BasicInfo3";
import BasicInfo4 from "./BasicInfo4";
// import MapLocationSection from "./MapLocationSection";

const TournamentForm = () => {
  const [formData, setFormData] = useState({
    brandId: "",
    name: "",
    organizer: "",
    location: "",
    city: "",
    state: "",
    country: "",
    continent: "",
    registrationLink: "",
    contactPerson: "",
    emailId: "",
    contactNo: "",
    format: "",
    registrationEnd: "",
    categories: [
      {
        categoryName: "",
        maxPlayer: "",
        gender: "",
        fee: "",
      },
    ],
    prizeMoney: "",
    tier: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    description: "",
    locationCoords: [0,0],
  });

  const continents = [
    "Africa",
    "Antarctica",
    "Asia",
    "Australia",
    "Europe",
    "North America",
    "South America",
  ];
  const formats = ["Knockout", "Round Robin", "Swiss", "League"];
  const tiers = [1, 2, 3, 4, 5];
  const genderOptions = [
    { value: 0, label: "Mixed/Open" },
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationCoordsChange = (newCoords) => {
    if (!Array.isArray(newCoords) || newCoords.length !== 2) return;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        locationCoords: newCoords,
      };
      console.log("Updating formData to:", updatedData); // This is the new updated data
      return updatedData;
    });
  };
  
  
  

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...formData.categories];
    newCategories[index] = {
      ...newCategories[index],
      [field]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      categories: newCategories,
    }));
  };

  const addCategory = () => {
    setFormData((prevData) => ({
      ...prevData,
      categories: [
        ...prevData.categories,
        {
          categoryName: "",
          maxPlayer: "",
          gender: "",
          fee: "",
        },
      ],
    }));
  };

  const removeCategory = (index) => {
    if (formData.categories.length > 1) {
      const newCategories = formData.categories.filter((_, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        categories: newCategories,
      }));
    }
  };

  const formatDataForSubmission = (data) => {
    return {
      ...data,
      prizeMoney: Number(data.prizeMoney),
      tier: Number(data.tier),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      registrationEnd: new Date(data.registrationEnd).toISOString(),
      categories: data.categories.map((cat) => ({
        ...cat,
        maxPlayer: Number(cat.maxPlayer),
        gender: Number(cat.gender),
        fee: Number(cat.fee),
      })),
      locationCoords: data.locationCoords.map((coord) => Number(coord)),
    };
  };

  const handleSubmit = async () => {
    const formattedData = formatDataForSubmission(formData);
    console.log("Form Data to be sent:", formattedData);

    try {
      const response = await fetch("http://localhost:5000/tournaments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Tournament created successfully!");
      } else {
        alert("Error creating tournament: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Create Tournament</h1>
      <div>
        <BasicInfo
          formData={formData}
          handleInputChange={handleInputChange}
          continents={continents}
        ></BasicInfo>
        <BasicInfo2
          formData={formData}
          onLocationSelect={handleLocationCoordsChange}
        ></BasicInfo2>
        <BasicInfo3
          formData={formData}
          handleInputChange={handleInputChange}
          formats={formats}
          tiers={tiers}
          setFormData={setFormData}
        ></BasicInfo3>
        <BasicInfo4
          formData={formData}
          handleCategoryChange={handleCategoryChange}
          genderOptions={genderOptions}
          removeCategory={removeCategory}
          addCategory={addCategory}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
        ></BasicInfo4>
      </div>
    </div>
  );
};

export default TournamentForm;

"use client";

import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import BasicInfo2 from "./BasicInfo2";
import BasicInfo3 from "./BasicInfo3";
import BasicInfo4 from "./BasicInfo4";
import Cookies from "js-cookie";
import { Navbar } from "@/components/layout/navbar";


const TournamentForm = () => {
  const [tournamentId, setTournamentId] = useState(null);
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
    locationCoords: [0, 0],
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1]; // Get last part of the URL
      setTournamentId(id);
    }
  }, []);
  
  useEffect(() => {
    const cookieData = Cookies.get("brand_user");

    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        const brandId = parsed?.player?._id;
        if (brandId) {
          setFormData((prevData) => ({
            ...prevData,
            brandId: brandId,
          }));
        }
      } catch (error) {
        console.error("Failed to parse brand_user cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tournamentId) return;
      try {
        const res = await fetch(
          `https://pickleball-phi.vercel.app/tournaments/data/${tournamentId}`
        );
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        if (!data || !data.name) throw new Error("Invalid tournament data");

        const tournament = data;
        setFormData({
          brandId: tournament.brandId || "",
          name: tournament.name || "",
          organizer: tournament.organizer || "",
          location: tournament.location || "",
          city: tournament.city || "",
          state: tournament.state || "",
          country: tournament.country || "",
          continent: tournament.continent || "",
          registrationLink: tournament.registrationLink || "",
          contactPerson: tournament.contactPerson || "",
          emailId: tournament.emailId || "",
          contactNo: tournament.contactNo || "",
          format: tournament.format || "",
          registrationEnd: tournament.registrationEnd?.slice(0, 16) || "",
          categories: tournament.categories?.map((cat) => ({
            categoryName: cat.categoryName || "",
            maxPlayer: cat.maxPlayer || "",
            gender: cat.gender || "",
            fee: cat.fee || "",
          })) || [
            {
              categoryName: "",
              maxPlayer: "",
              gender: "",
              fee: "",
            },
          ],
          prizeMoney: tournament.prizeMoney || "",
          tier: tournament.tier || "",
          startDate: tournament.startDate?.slice(0, 16) || "",
          endDate: tournament.endDate?.slice(0, 16) || "",
          imageUrl: tournament.imageUrl || "",
          description: tournament.description || "",
          locationCoords: tournament.locationCoords || [0, 0],
        });
      } catch (err) {
        console.error("Error fetching tournament data:", err);
        // Reset form to empty state
        setFormData({
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
          locationCoords: [0, 0],
        });
      }
    };

    fetchTournament();
  }, [tournamentId]);
  
  // ... rest of your handlers remain unchanged ...

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationCoordsChange = (newCoords) => {
    if (!Array.isArray(newCoords) || newCoords.length !== 2) return;

    setFormData((prevData) => ({
      ...prevData,
      locationCoords: newCoords.map(Number),
    }));
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
      locationCoords: data.locationCoords.map(Number),
    };
  };

  const handleSubmit = async () => {
    const formattedData = formatDataForSubmission(formData);
    try {
      const response = await fetch(
        "https://pickleball-phi.vercel.app/tournaments/add-or-update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Tournament created successfully!");
      } else {
        alert("Error creating tournament: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", margin: "0 auto" }}>
        <h1>{tournamentId ? "Update Tournament" : "Create Tournament"}</h1>

        <div>
          <BasicInfo
            formData={formData}
            handleInputChange={handleInputChange}
            continents={continents}
          />

          <BasicInfo2
            formData={formData}
            onLocationSelect={handleLocationCoordsChange}
          />

          <BasicInfo3
            formData={formData}
            handleInputChange={handleInputChange}
            formats={formats}
            tiers={tiers}
            setFormData={setFormData}
          />

          <BasicInfo4
            formData={formData}
            handleCategoryChange={handleCategoryChange}
            genderOptions={genderOptions}
            removeCategory={removeCategory}
            addCategory={addCategory}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
};

export default TournamentForm;

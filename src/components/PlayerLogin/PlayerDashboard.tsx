import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AddAthlete from "../athletes/AddAthlete";
import { Navbar } from "../layout/navbar";
import logo from './logo.png';
const API = import.meta.env.VITE_API; // Use the environment variable for API URL
export default function PlayerDashboard() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [websiteForm, setWebsiteForm] = useState({
    title: "",
    description: "",
    url: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const cookieData = localStorage.getItem("player");
        console.log(cookieData);
        if (!cookieData) {
          setError("Player not found in cookies");
          setLoading(false);
          return;
        }

        const player = JSON.parse(cookieData);
        const playerId = player.DUPRID;
        console.log(playerId);
        const response = await fetch(
          `${API}/playerlogin/userdata/${playerId}`
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch player data");
        }

        setPlayerData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebsiteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., POST to your API)
    console.log("Website Details Submitted:", websiteForm);
    setSubmitted(true);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-green-600 font-medium">Loading...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-xl text-red-600 font-medium">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 mb-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
                Welcome, {playerData.name}!
              </h1>

              {/* Main Content Grid - Left Details, Right Animation Space */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Player Details in 2x2 Grid */}
                <div className="space-y-6">
                  {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="group p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-green-300">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-green-600 font-medium uppercase tracking-wide">
                            Email
                          </p>
                          <p className="text-lg font-semibold text-gray-800 break-all">
                            {playerData.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="group p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-emerald-300">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-emerald-600 font-medium uppercase tracking-wide">
                            Phone
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {playerData.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* DUPRID */}
                    <div className="group p-6 bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl border border-lime-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-lime-300">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-lime-600 font-medium uppercase tracking-wide">
                            DUPRID
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {playerData.duperId}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Joined At */}
                    <div className="group p-6 bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-green-300">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-lime-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3a4 4 0 118 0v4m-4 6v6m-7 0h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-green-600 font-medium uppercase tracking-wide">
                            Joined At
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {new Date(
                              playerData.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Space for Lottie Animation */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md h-80   flex items-center justify-center">
                    <div className="text-center p-8">  
                      <img src={logo}></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AddAthlete Component */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
            <AddAthlete />
          </div>
        </div>
      </div>
    </div>
  );
}

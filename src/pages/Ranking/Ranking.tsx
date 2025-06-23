"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";

const ITEMS_PER_PAGE = 50;

const continents = [
  "Africa",
  "Asia",
  "Europe",
  "NorthAmerica",
  "SouthAmerica",
  "ALL",
];

const genders = ["ALL", "MALE", "FEMALE"];
const duprSortTypes = ["singles", "doubles"];

export default function Ranking() {
  const [selectedContinent, setSelectedContinent] = useState("Asia");
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [duprSortType, setDuprSortType] = useState("singles");
  const [currentPage, setCurrentPage] = useState(1);

  const [players, setPlayers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlayers = async () => {
    try {
      const query = new URLSearchParams({
        gender: selectedGender,
        duprSortType,
        page: currentPage.toString(),
        continent: selectedContinent,
      });

      const res = await fetch(
        `http://localhost:5000/ranking/filtered-players?${query}`
      );
      const data = await res.json();
      setPlayers(data.players || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch players:", err);
      setPlayers([]);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [selectedContinent, selectedGender, duprSortType, currentPage]);

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setCurrentPage(1);
  };

  const getRating = (player) =>
    player.ratingValue !== null ? player.ratingValue : "NR";

  const getImage = (url) =>
    url && url.trim() !== "" ? url : "https://via.placeholder.com/40?text=👤";

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold my-4">Player Rankings</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Gender */}
        <div>
          <label className="font-medium mr-2">Gender:</label>
          <select
            className="border px-3 py-1 rounded"
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.target.value);
              setCurrentPage(1);
            }}
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* DUPR Sort Type */}
        <div>
          <label className="font-medium mr-2">Rating Type:</label>
          <select
            className="border px-3 py-1 rounded"
            value={duprSortType}
            onChange={(e) => {
              setDuprSortType(e.target.value);
              setCurrentPage(1);
            }}
          >
            {duprSortTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Continent Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {continents.map((continent) => (
          <button
            key={continent}
            className={`px-4 py-2 rounded ${
              selectedContinent === continent
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleContinentChange(continent)}
          >
            {continent.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200 text-left text-sm font-semibold">
            <tr>
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">DUPR ID</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Continent</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.duprId} className="border-t">
                <td className="p-2 border text-center">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="p-2 border">
                  <img
                    src={getImage(player.imageUrl)}
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="p-2 border">{player.fullName}</td>
                <td className="p-2 border">{player.duprId}</td>
                <td className="p-2 border">{player.age ?? "N/A"}</td>
                <td className="p-2 border">{getRating(player)}</td>
                <td className="p-2 border">{player.Continent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600 self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 rounded ${
            currentPage >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

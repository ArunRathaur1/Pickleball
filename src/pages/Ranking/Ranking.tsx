"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Medal,
  Star,
} from "lucide-react";

const API = import.meta.env.VITE_API;
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
const statuses = ["ALL", "Pending", "Approved"];
const countries = ["ALL", "IN", "US", "UK", "CA", "AU", "DE", "FR"];

export default function Ranking() {
  const [selectedContinent, setSelectedContinent] = useState("Asia");
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [duprSortType, setDuprSortType] = useState("singles");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [currentPage, setCurrentPage] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [minAge, setminAge] = useState("");

  const [players, setPlayers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlayers = async () => {
    try {
      const query = new URLSearchParams();
      query.append("gender", selectedGender);
      query.append("duprSortType", duprSortType);
      query.append("page", currentPage.toString());
      query.append("continent", selectedContinent);
      if (playerName) query.append("name", playerName);
      if (minAge) query.append("minAge", minAge.toString());
      if (selectedCountry !== "ALL") query.append("country", selectedCountry);
      if (selectedStatus !== "ALL") query.append("status", selectedStatus);

      const res = await fetch(`${API}/ranking/filtered-players?${query}`);
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
  }, [
    selectedContinent,
    selectedGender,
    duprSortType,
    selectedStatus,
    selectedCountry,
    currentPage,
    playerName,
    minAge,
  ]);

  const getRating = (player) =>
    player.ratingValue !== null ? player.ratingValue : "NR";

  const getImage = (url) =>
    url && url.trim() !== "" ? url : "https://via.placeholder.com/40?text=👤";

  const getCountryCode = (shortAddress) => {
    if (!shortAddress) return "N/A";
    const parts = shortAddress.split(",");
    return parts[parts.length - 1].trim();
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg";
    if (rank === 3)
      return "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg";
    if (rank <= 10)
      return "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-md";
    return "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-4 h-4" />;
    if (rank === 2 || rank === 3) return <Medal className="w-4 h-4" />;
    if (rank <= 10) return <Star className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      <Navbar />
      <div className="mx-auto py-3">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 border border-green-100/50 dark:border-emerald-600/30 backdrop-blur-sm">
          <h1 className="text-center text-5xl font-bold mb-2 text-black dark:text-white">
            Player Rankings
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Filter Players
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* All filter selectors */}
            {[
              {
                label: "Continent",
                value: selectedContinent,
                setter: setSelectedContinent,
                options: continents,
              },
              {
                label: "Gender",
                value: selectedGender,
                setter: setSelectedGender,
                options: genders,
              },
              {
                label: "Country",
                value: selectedCountry,
                setter: setSelectedCountry,
                options: countries,
              },
              {
                label: "Status",
                value: selectedStatus,
                setter: setSelectedStatus,
                options: statuses,
              },
              {
                label: "DUPR Type",
                value: duprSortType,
                setter: setDuprSortType,
                options: duprSortTypes,
              },
            ].map(({ label, value, setter, options }) => (
              <div key={label}>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  {label}
                </label>
                <select
                  value={value}
                  onChange={(e) => {
                    setter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "ALL" ? `All ${label}s` : opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Name and Max Age Inputs */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Player Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Search by name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Min Age
              </label>
              <input
                type="number"
                value={minAge}
                onChange={(e) => setminAge(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Enter max age"
              />
            </div>
          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-green-100/50 dark:border-emerald-600/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                  <th className="px-6 py-4">Global Rank</th>
                  <th className="px-6 py-4">Rank by filters</th>
                  <th className="px-6 py-4">Player</th>
                  <th className="px-6 py-4">DUPR ID</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Continent</th>
                  <th className="px-6 py-4">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50 dark:divide-gray-700">
                {players.map((player, index) => {
                  const rank =
                    player.originalRank ??
                    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                  return (
                    <tr
                      key={player.duprId}
                      className="hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition"
                    >
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${getRankBadgeColor(
                            rank
                          )}`}
                        >
                          {getRankIcon(rank)}#{rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${getRankBadgeColor(
                            rank
                          )}`}
                        >
                          {index+1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={getImage(player.imageUrl)}
                            className="w-12 h-12 rounded-full"
                            alt="player"
                          />
                          <Link
                            to={
                              player.playerid
                                ? `/${player.playerid.trim()}`
                                : `/player/${player.duprId}`
                            }
                          >
                            {player.fullName || "Unknown Player"}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4">{player.duprId}</td>
                      <td className="px-6 py-4">{player.age ?? "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full font-bold">
                          {getRating(player)}
                        </span>
                      </td>
                      <td className="px-6 py-4">{player.Continent}</td>
                      <td className="px-6 py-4">
                        {getCountryCode(player.shortAddress)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 rounded-full font-semibold bg-emerald-500 text-white disabled:bg-gray-300"
          >
            <ChevronLeft className="inline w-4 h-4 mr-1" />
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-6 py-3 rounded-full font-semibold bg-emerald-500 text-white disabled:bg-gray-300"
          >
            Next
            <ChevronRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

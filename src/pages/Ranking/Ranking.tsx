"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import {
  Trophy,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Medal,
  Star,
} from "lucide-react";

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
  const [playerName, setPlayerName] = useState("");
  const [maxAge, setMaxAge] = useState("");


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
    if (maxAge) query.append("maxAge", maxAge.toString());



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
  }, [selectedContinent, selectedGender, duprSortType, currentPage,playerName,maxAge]);

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setCurrentPage(1);
  };

  const getRating = (player) =>
    player.ratingValue !== null ? player.ratingValue : "NR";

  const getImage = (url) =>
    url && url.trim() !== "" ? url : "https://via.placeholder.com/40?text=👤";

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
    if (rank === 2) return <Medal className="w-4 h-4" />;
    if (rank === 3) return <Medal className="w-4 h-4" />;
    if (rank <= 10) return <Star className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      <Navbar />
      <div className="mx-auto py-3">
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 border border-green-100/50 dark:border-emerald-600/30 backdrop-blur-sm">
          <h1 className="text-center text-5xl font-bold mb-2 text-black dark:text-white">
            Player Rankings
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Filter Players
            </h2>
          </div>

          {/* Filters Grid */}
          <div>
            {/* Gender Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Gender
                </label>
                <select
                  className="w-full border-2 border-green-200 dark:border-emerald-600/50 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50 transition-all duration-200 text-gray-700 dark:text-gray-200 font-medium shadow-sm"
                  value={selectedGender}
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {genders.map((g) => (
                    <option key={g} value={g} className="dark:bg-gray-700">
                      {g === "ALL"
                        ? "All Genders"
                        : g.charAt(0) + g.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* DUPR Sort Type */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Rating Type
                </label>
                <select
                  className="w-full border-2 border-green-200 dark:border-emerald-600/50 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50 transition-all duration-200 text-gray-700 dark:text-gray-200 font-medium shadow-sm"
                  value={duprSortType}
                  onChange={(e) => {
                    setDuprSortType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {duprSortTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="dark:bg-gray-700"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Continent Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Continent
              </label>
              <div className="flex flex-wrap gap-3">
                {continents.map((continent) => (
                  <button
                    key={continent}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                      selectedContinent === continent
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-green-200 dark:border-emerald-600/50 hover:border-emerald-300 dark:hover:border-emerald-400 hover:bg-green-50 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => handleContinentChange(continent)}
                  >
                    {continent === "ALL"
                      ? "🌍 All Continents"
                      : continent.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                ))}
              </div>
            </div>
            {/* Player Name and Age Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Player Name
                </label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border-2 border-green-200 dark:border-emerald-600/50 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50 text-gray-700 dark:text-gray-200 shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Max Age
                </label>
                <input
                  type="number"
                  placeholder="Enter maximum age"
                  value={maxAge}
                  onChange={(e) => {
                    setMaxAge(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border-2 border-green-200 dark:border-emerald-600/50 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50 text-gray-700 dark:text-gray-200 shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-green-100/50 dark:border-emerald-600/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    DUPR ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Continent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50 dark:divide-gray-700">
                {players.map((player, index) => {
                  const rank = player.originalRank ?? (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr
                      key={player.duprId}
                      className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-emerald-900/30 transition-all duration-200 group"
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
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={getImage(player.imageUrl)}
                              alt="avatar"
                              className="w-12 h-12 object-cover rounded-full border-3 border-green-200 dark:border-emerald-600/50 shadow-md group-hover:shadow-lg transition-all duration-200"
                            />
                            {rank <= 3 && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Trophy className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                              {player.fullName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-mono text-gray-700 dark:text-gray-300">
                          {player.duprId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {player.age ?? "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-md">
                            {getRating(player)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 dark:bg-emerald-900/50 text-green-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold">
                          {player.Continent}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300 font-medium bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm border border-green-100 dark:border-emerald-600/30">
              Page{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {totalPages}
              </span>
            </span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage >= totalPages
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

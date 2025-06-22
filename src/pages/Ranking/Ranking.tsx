"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";

const ITEMS_PER_PAGE = 20;

const continents = [
  "Aferica",
  "Asia",
  "Europe",
  "NorthAmerica",
  "SouthAmerica",
  "Oceana",
];

export default function Ranking() {
  const [selectedContinent, setSelectedContinent] = useState("Asia");
  const [ids, setIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchIds = async (continent) => {
    try {
      const res = await fetch(`/${continent}/id.txt`);
      const text = await res.text();
      const list = text.trim().split(",");
      setIds(list);
      setCurrentPage(0);
    } catch (err) {
      console.error("Failed to load IDs:", err);
      setIds([]);
    }
  };

  useEffect(() => {
    fetchIds(selectedContinent);
  }, [selectedContinent]);

  const totalPages = Math.ceil(ids.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const currentIds = ids.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold my-4">Ranking</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {continents.map((continent) => (
          <button
            key={continent}
            className={`px-4 py-2 rounded ${
              selectedContinent === continent
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedContinent(continent)}
          >
            {continent.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* ID List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {currentIds.map((id, idx) => (
          <div key={idx} className="border p-2 rounded bg-gray-100 text-center">
            {id}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600 self-center">
          Page {currentPage + 1} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded ${
            currentPage >= totalPages - 1
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

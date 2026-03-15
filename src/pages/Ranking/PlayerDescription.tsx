import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import bg from "../Playerprofile/Background.png"; // fallback image
const API = import.meta.env.VITE_API; // Use the environment variable for API URL
interface PlayerData {
  fullName: string;
  duprId: string;
  age: number;
  gender: string;
  shortAddress: string;
  imageUrl: string;
  status: string;
  singlerank: number;
  doublerank: number;
  ratings: {
    singles: string;
    doubles: string;
    defaultRating: string;
  };
}

export default function PlayerDescription() {
  const { duprid } = useParams();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!duprid) return;
    axios
      .get(`${API}/playerlogin/${duprid}`)
      .then((res) => {
        setPlayer(res.data);
        console.log("Player data fetched:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching player:", err);
        setLoading(false);
      });
  }, [duprid]);

  if (loading) return <p className="text-center text-lg">Loading player data...</p>;
  if (!player) return <p className="text-center text-red-500">Player not found.</p>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${player.imageUrl || bg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center p-6 w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase mb-6 tracking-wide">
          {player.fullName}
        </h1>

        {/* Ratings Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 space-y-4 mx-auto max-w-xl shadow-xl border border-white/20">
          <div className="text-xl md:text-2xl font-semibold">
            <span className="block">
              <strong>Singles Rating:</strong> {player.ratings.singles}
            </span>
            <span className="block">
              <strong>Doubles Rating:</strong> {player.ratings.doubles}
            </span>
            <span className="block">
              <strong>Default:</strong> {player.ratings.defaultRating}
            </span>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 space-y-2 text-lg shadow-lg max-w-xl mx-auto border border-white/20">
          <p><strong>Age:</strong> {player.age}</p>
          <p><strong>Gender:</strong> {player.gender}</p>
          <p><strong>Location:</strong> {player.shortAddress}</p>
          <p><strong>Status:</strong> {player.status}</p>
        </div>

        {/* Ranks Section */}
        <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 space-y-2 text-lg shadow-lg max-w-xl mx-auto border border-white/20">
          <p><strong>Singles Rank:</strong> #{player.singlerank || "N/A"}</p>
          <p><strong>Doubles Rank:</strong> #{player.doublerank || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

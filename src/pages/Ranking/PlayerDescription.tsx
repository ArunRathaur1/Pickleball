import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  sponsor?: {
    imageURL: string;
    sponsorRedirectUrl: string;
    sponsorPopupHeading: string;
    description: string;
    buttonText: string;
  };
}

export default function PlayerDescription() {
  const { duprid } = useParams();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!duprid) return;

    axios
      .get(`http://localhost:5000/playerlogin/${duprid}`)
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

  if (loading) {
    return <p className="text-center text-lg">Loading player data...</p>;
  }

  if (!player) {
    return <p className="text-center text-red-500">Player not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={
            player.imageUrl || "https://via.placeholder.com/150?text=No+Image"
          }
          alt={player.fullName}
          className="w-32 h-32 object-cover rounded-full border"
        />
        <div>
          <h2 className="text-3xl font-bold text-pickle">{player.fullName}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            <strong>Gender:</strong> {player.gender} <br />
            <strong>Age:</strong> {player.age} <br />
            <strong>Location:</strong> {player.shortAddress} <br />
            <strong>Status:</strong> {player.status}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-pickle">Ratings</h3>
          <p>Singles: {player.ratings.singles}</p>
          <p>Doubles: {player.ratings.doubles}</p>
          <p>Default: {player.ratings.defaultRating}</p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-pickle">Ranks</h3>
          <p>Singles Rank: #{player.singlerank || "N/A"}</p>
          <p>Doubles Rank: #{player.doublerank || "N/A"}</p>
        </div>
      </div>

      {player.sponsor?.imageURL && (
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl">
          <a
            href={player.sponsor.sponsorRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4"
          >
            <img
              src={player.sponsor.imageURL}
              alt="Sponsor"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-bold">
                {player.sponsor.sponsorPopupHeading}
              </h4>
              <p className="text-sm">{player.sponsor.description}</p>
              <button className="mt-2 px-3 py-1 bg-pickle text-white rounded-lg text-sm">
                {player.sponsor.buttonText}
              </button>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

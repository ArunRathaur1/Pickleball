import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const brandData = localStorage.getItem("brand");
        console.log(brandData);
        if (!brandData) {
          setError("No brand user data found in local storage.");
          setLoading(false);
          return;
        }

        const parsedData = JSON.parse(brandData);
        const brandId = parsedData?.player?._id;
        console.log(brandId);
        if (!brandId) {
          setError("Brand ID not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://pickleball-phi.vercel.app/tournaments/brand/${brandId}`
        );
        setTournaments(response.data);
      } catch (err) {
        setError("Failed to fetch tournaments.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🏆 Your Created Tournaments
        </h2>

        {loading ? (
          <div className="text-center text-blue-500 text-lg font-medium">
            Loading tournaments...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg font-medium">
            {error}
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-medium">
            No tournaments found.
          </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {tournaments.map((tournament) => (
                <Link to={`/update/brand/${tournament._id}`}>
                <div
                  key={tournament._id}
                  className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    {tournament.name}
                  </h3>
                  <p className="text-gray-700 mb-2">{tournament.description}</p>

                  <p className="text-sm text-gray-600 mb-1">
                    📍 <strong>Location:</strong> {tournament.location},{" "}
                    {tournament.city}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    🗓 <strong>Start Date:</strong>{" "}
                    {new Date(tournament.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    ✅ <strong>Status:</strong> {tournament.status}
                  </p>
                </div>
                </Link>
              ))}
            </div>
        )}
      </div>
    </div>
  );
}

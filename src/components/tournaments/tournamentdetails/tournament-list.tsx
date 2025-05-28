import React from "react";
import { Link } from "react-router-dom";
interface Tournament {
  _id: string;
  name: string;
  location: string;
  country: string;
  Continent: string;
  Tier: number;
  startDate: string;
  imageUrl?: string;
}

interface TournamentListProps {
  tournaments: Tournament[];
}

const TournamentList = ({ tournaments }: TournamentListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = (tournamentId: string) => {
    // For demo purposes, we'll just log the tournament ID
    console.log(`Viewing details for tournament: ${tournamentId}`);
  };

  const handleRegisterNow = () => {
    window.open("https://google.com", "_blank");
  };

  return (
    <div className="min-h-screen p-3">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 "
              >
                {tournament.imageUrl ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={tournament.imageUrl}
                      alt={tournament.name}
                      className="h-32 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="relative h-32 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 flex items-center justify-center p-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <h3 className="text-lg font-bold text-white text-center break-words relative z-10">
                      {tournament.name}
                    </h3>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/5 rounded-full" />
                  </div>
                )}

                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                    {tournament.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">📍</span>
                      </div>
                      <span className="text-xs font-medium truncate">
                        {tournament.location}, {tournament.country}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600 text-xs">🌍</span>
                      </div>
                      <span className="text-xs font-medium">
                        {tournament.Continent}
                      </span>
                      <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1 text-xs">🎖</span>
                        <span className="text-xs font-medium">
                          Tier {tournament.Tier}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-600 text-xs">📅</span>
                      </div>
                      <span className="text-xs font-medium">
                        {formatDate(tournament.startDate)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-2">
                    <Link to={`/tournament/${tournament._id}`} className="block">
                      <button
                        onClick={() => handleViewDetails(tournament._id)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                      >
                        <span className="text-xs">View Details</span>
                      </button>
                      </Link>
                      <button
                        onClick={handleRegisterNow}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                      >
                        <span className="text-xs">Register Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <span className="text-4xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Tournaments Available
              </h3>
              <p className="text-gray-600 max-w-md">
                Check back soon for exciting tournaments and competitions!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { TournamentList };

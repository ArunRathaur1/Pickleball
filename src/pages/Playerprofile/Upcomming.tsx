import React from "react";
import { CalendarClock, MapPin } from "lucide-react";

const matches = [
  {
    opponent: "Rafael Lopez",
    tournament: "Global Smash Open",
    location: "Madrid, Spain",
    date: "June 15, 2025",
    time: "15:30",
  },
  {
    opponent: "Kenji Tanaka",
    tournament: "Asia Pacific Series",
    location: "Tokyo, Japan",
    date: "June 22, 2025",
    time: "18:00",
  },
  {
    opponent: "Marcus Green",
    tournament: "World Championship Qualifier",
    location: "Sydney, Australia",
    date: "July 5, 2025",
    time: "14:00",
  },
];

const UpcomingMatches = () => {
  return (
    <section className="py-12 px-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-600 rounded-lg">
          <CalendarClock className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          🗓️ Upcoming Matches
        </h2>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left bg-white dark:bg-gray-800 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Opponent</th>
              <th className="px-6 py-4">Tournament</th>
              <th className="px-6 py-4 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Location
              </th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-100 text-sm divide-y divide-gray-200 dark:divide-gray-700">
            {matches.map((match, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <td className="px-6 py-4 font-semibold">{match.opponent}</td>
                <td className="px-6 py-4">{match.tournament}</td>
                <td className="px-6 py-4">{match.location}</td>
                <td className="px-6 py-4">{match.date}</td>
                <td className="px-6 py-4">{match.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpcomingMatches;

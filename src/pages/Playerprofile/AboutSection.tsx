import { Athlete } from "./Types";
import { Card, CardContent } from "@/components/ui/card";
import PlayerImages from "./PlayerImages";
import {
  User,
  MapPin,
  Calendar,
  Hash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import RecentArticles from "./RecentArticles";
import UpcomingMatches from "./Upcomming";

const mockMatches = [
  {
    tournament: "Australian Open",
    opponent: "Carlos Alvarez",
    result: "Win",
    score: "6-4, 3-6, 6-3",
    date: "2025-01-22",
  },
  {
    tournament: "Wimbledon",
    opponent: "Roger Taylor",
    result: "Loss",
    score: "4-6, 5-7",
    date: "2025-07-10",
  },
  {
    tournament: "US Open",
    opponent: "Daniil Medvedev",
    result: "Win",
    score: "7-6, 6-4",
    date: "2025-09-15",
  },
  {
    tournament: "French Open",
    opponent: "Rafael Nadal",
    result: "Loss",
    score: "3-6, 6-7",
    date: "2025-05-30",
  },
];

const AboutSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="space-y-8 p-6">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Bio Card */}
      <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Biography
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              {athlete.name} is a {athlete.age}-year-old{" "}
              {athlete.gender.toLowerCase()} athlete from {athlete.country}.
              Standing at {athlete.height} cm tall, they have accumulated{" "}
              {athlete.points.toLocaleString()} points in their career so far.
            </p>
            <p className="leading-relaxed">
              They have won {athlete.titlesWon.length} major titles and are
              sponsored by {athlete.sponsors.length} major brands, establishing
              themselves as a prominent figure in their sport.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Details Card */}
      <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Details
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Hash className="w-4 h-4" />
                <span>Athlete ID:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {athlete.DUPRID}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Country:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {athlete.country}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span>Gender:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {athlete.gender}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Age:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {athlete.age} years
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Stats Overview */}
    <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
          Career Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {athlete.points.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Points
            </div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {athlete.titlesWon.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Titles Won
            </div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {athlete.sponsors.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sponsors
            </div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {athlete.height}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Height (cm)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Recent Matches Table */}
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
          Recent Matches
        </h3>
        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-4 py-2 rounded-l-lg">Tournament</th>
              <th className="px-4 py-2">Opponent</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2 rounded-r-lg">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockMatches.map((match, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm rounded-lg"
              >
                <td className="px-4 py-2 font-semibold">{match.tournament}</td>
                <td className="px-4 py-2">{match.opponent}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      match.result === "Win" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {match.result === "Win" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {match.result}
                  </span>
                </td>
                <td className="px-4 py-2">{match.score}</td>
                <td className="px-4 py-2">{match.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
    <PlayerImages></PlayerImages>
    <UpcomingMatches></UpcomingMatches>
    <RecentArticles></RecentArticles>
  </div>
);

export default AboutSection;

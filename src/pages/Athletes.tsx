import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";
import Athlete_Background from "./spline/Athlete";

interface Sponsor {
  name: string;
  imageUrl: string;
}

interface Title {
  title: string;
  year: number;
}

interface RelatedContent {
  imageUrl: string;
  title: string;
  youtubeLink: string;
}

interface Athlete {
  _id: string;
  name: string;
  playerid: string;
  age: number;
  gender: string;
  country: string;
  height: number;
  points: number;
  titlesWon: Title[];
  imageUrl: string;
  instagramPage?: string;
  sponsors?: Sponsor[];
  relatedContent?: RelatedContent[];
}

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/athletes")
      .then((res) => {
        setAthletes(res.data);
        setFilteredAthletes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = athletes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((athlete) =>
        athlete.name.toLowerCase().includes(term)
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((athlete) => athlete.gender === genderFilter);
    }

    if (countryFilter) {
      filtered = filtered.filter(
        (athlete) => athlete.country === countryFilter
      );
    }

    filtered = filtered.sort((a, b) => b.points - a.points);
    setFilteredAthletes(filtered);
  }, [genderFilter, countryFilter, searchTerm, athletes]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 relative">
        {/* <Athlete_Background /> */}

        <div className="container mx-auto relative z-10 px-4 py-10">
          <div className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
            <h1 className="text-5xl font-extrabold text-center mb-6 text-emerald-600 dark:text-emerald-400 drop-shadow-lg">
              Athlete Leaderboard
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Search athletes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-5 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {[...new Set(athletes.map((a) => a.country))].map(
                    (country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {filteredAthletes.length === 0 ? (
              <div className="text-center text-emerald-600 dark:text-emerald-400 text-lg mt-5">
                No athletes found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow-inner bg-white dark:bg-gray-900">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-emerald-600 dark:bg-emerald-700 text-white">
                    <tr>
                      <th className="p-4 text-left">#</th>
                      <th className="p-4 text-left">Athlete</th>
                      <th className="p-4 text-left">Country</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">Points</th>
                      <th className="p-4 text-left">Titles</th>
                      <th className="p-4 text-left">Sponsors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredAthletes.map((athlete, index) => (
                      <tr
                        key={athlete._id}
                        className="hover:bg-emerald-600 hover:text-white transition duration-200 cursor-pointer"
                      >
                        <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                          {index + 1}
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={athlete.imageUrl}
                            alt={athlete.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                          />
                          <Link
                            to={`/${athlete.playerid}`}
                            className="hover:underline font-semibold text-gray-900 dark:text-gray-100"
                          >
                            {athlete.name}
                          </Link>
                        </td>
                        <td className="p-4">{athlete.country}</td>
                        <td className="p-4">{athlete.age}</td>
                        <td className="p-4 font-semibold text-emerald-700 dark:text-emerald-400">
                          {athlete.points}
                        </td>
                        <td className="p-4">
                          <ul>
                            {athlete.titlesWon?.slice(0, 2).map((title, i) => (
                              <li key={i}>
                                {title.title} ({title.year})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 flex gap-2">
                          {athlete.sponsors?.slice(0, 2).map((sponsor, i) => (
                            <img
                              key={i}
                              src={sponsor.imageUrl}
                              alt={sponsor.name}
                              title={sponsor.name}
                              className="w-6 h-6 object-contain"
                            />
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Athletes;

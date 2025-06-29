import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";

interface Athlete {
  _id: string;
  fullName: string;
  playerid: string;
  age: number;
  gender: string;
  shortAddress: string;
  height: number;
  duprId: string;
  status: string;
  playerlogoimage: string;
  ratings: {
    defaultRating: string;
    singles?: string;
    doubles?: string;
  };
}

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/ranking/with-playerid")
      .then((res) => {
        const approvedPlayers = res.data.players.filter(
          (player: Athlete) =>
            player.status === "APPROVED" && player.playerid.trim() !== ""
        );
        setAthletes(approvedPlayers);
        setFilteredAthletes(approvedPlayers);
      })
      .catch((err) => console.error("Error fetching athletes:", err));
  }, []);

  useEffect(() => {
    const filtered = athletes.filter((athlete) =>
      athlete.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAthletes(filtered);
  }, [searchTerm, athletes]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-pickle dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
            <h1 className="text-5xl font-extrabold text-center mb-6 text-pickle dark:text-pickle">
              Approved Athletes
            </h1>

            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 mx-auto mb-6 px-5 py-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md block focus:outline-none focus:ring-2 focus:ring-pickle"
            />

            {filteredAthletes.length === 0 ? (
              <div className="text-center text-pickle dark:text-pickle text-lg mt-5">
                No approved athletes found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow-inner">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-pickle dark:bg-pickle text-white">
                    <tr>
                      <th className="p-4 text-left">#</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Location</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">Player ID</th>
                      <th className="p-4 text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredAthletes.map((athlete, index) => (
                      <tr
                        key={athlete._id}
                        className="hover:bg-pickle hover:text-white transition duration-200 cursor-pointer"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={
                              athlete.playerlogoimage ||
                              "https://via.placeholder.com/50"
                            }
                            alt={athlete.fullName}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <Link
                            to={`/${athlete.playerid}`}
                            className="hover:underline font-semibold"
                          >
                            {athlete.fullName}
                          </Link>
                        </td>
                        <td className="p-4">{athlete.shortAddress || "N/A"}</td>
                        <td className="p-4">{athlete.age}</td>
                        <td className="p-4">{athlete.playerid}</td>
                        <td className="p-4">
                          {athlete.ratings?.defaultRating === "SINGLES"
                            ? athlete.ratings.singles
                            : athlete.ratings.doubles || "NR"}
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

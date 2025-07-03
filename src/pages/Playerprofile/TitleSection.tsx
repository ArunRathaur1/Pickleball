import { Trophy } from "lucide-react";

interface Title {
  title: string;
  year: number;
  positon: string;
  venue: string;
  _id: string;
}

interface Athlete {
  titlesWon: Title[];
}

const TitlesSection = ({ athlete }: { athlete: Athlete }) => {
  const titles = athlete?.titlesWon || [];

  return (
    <>
      <hr />
      <div className="relative min-h-screen overflow-hidden px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2
            className="text-[50px] sm:text-[70px] md:text-[90px] font-bold leading-none"
            style={{
              fontFamily: "Bebas Neue",
              color: "#E2D8B3",
              textShadow: "1px 1px 20px black",
            }}
          >
            Titles and
          </h2>
          <h2
            className="text-[50px] sm:text-[70px] md:text-[90px] font-bold"
            style={{
              fontFamily: "Bebas Neue",
              color: "#E2D8B3",
              textShadow: "1px 1px 20px black",
            }}
          >
            Achievements
          </h2>
          <p
            className="text-white text-xl mt-3"
            style={{ fontFamily: "Bebas Neue" }}
          >
            Celebrating the milestones of our champions
          </p>
        </div>

        {/* Titles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center items-stretch">
          {titles.map((title, index) => (
            <div
              key={title._id || index}
              className="p-6 rounded-3xl bg-[#E2D8B3] shadow-md"
            >
              <h3
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{
                  fontFamily: "Times New Roman",
                  color: "#003300",
                }}
              >
                {title.title}
              </h3>
              <p className="text-lg text-white mb-1">{title.year}</p>
              <hr className="border-green-700 border mb-3" />
              <p
                className="text-xl font-bold uppercase"
                style={{
                  fontFamily: "Bebas Neue",
                  color:
                    title.positon.toLowerCase() === "gold"
                      ? "#FFD700"
                      : title.positon.toLowerCase() === "silver"
                      ? "#C0C0C0"
                      : title.positon.toLowerCase() === "bronze"
                      ? "#CD7F32"
                      : "#000",
                }}
              >
                {title.positon}
              </p>
              <p
                className="text-xl text-[#009933]"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {title.venue}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {titles.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-300 mb-2">
              No Titles Yet
            </h3>
            <p className="text-green-400">
              The championship journey begins here...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TitlesSection;

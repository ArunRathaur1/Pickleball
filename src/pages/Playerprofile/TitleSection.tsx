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

  const latestVictoryYear =
    titles.length > 0 ? Math.max(...titles.map((t) => t.year)) : "N/A";

  const yearsActive =
    titles.length > 0
      ? new Date().getFullYear() - Math.min(...titles.map((t) => t.year))
      : "N/A";

  return (
    <>
      <hr></hr>
      <div className="relative min-h-screen overflow-hidden">
        <div
          style={{ marginTop: "-20px", paddingLeft: "40px" }}
          className="animate-zoom-in"
        >
          {/* Header Section */}
          <div
            style={{
              paddingLeft: "50px",
              lineHeight: "1.2",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Bebas Neue",
                textShadow: "1px 1px 20px black",
                fontSize: "90px",
                color: "#E2D8B3",
              }}
            >
              Titles and
            </div>
            <div
              style={{
                fontFamily: "Bebas Neue",
                color: "#E2D8B3",
                textShadow: "1px 1px 20px black",
                fontSize: "90px",
              }}
            >
              Achievements
            </div>
            <div
              style={{
                color: "white",
                fontSize: "30px",
                fontFamily: "Bebas Neue",
              }}
            >
              CELEBRATING THE MILESTONES OF OUR CHAMPIONS
            </div>
          </div>

          {/* Titles Grid */}
          <div className="flex flex-wrap justify-center gap-12 mt-12">
            {titles.map((title, index) => (
              <div
                key={title._id || index}
                className="group animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${0.6 + index * 0.1}s`,
                  animationFillMode: "forwards",
                  animationDuration: "0.8s",
                  flex: "1 1 45%",
                  maxWidth: "45%",
                }}
              >
                <div
                  className="relative p-8 card-hover"
                  style={{
                    backgroundColor: "#E2D8B3",
                    borderRadius: "70px",
                  }}
                >
                  <div className="relative flex items-center gap-6">
                    <div className="flex-1">
                      <h3
                        className="font-black text-white text-xl leading-tight mb-3 group-hover:text-green-200 transition-colors duration-300"
                        style={{
                          fontFamily: "times new roman",
                          color: "#003300",
                          fontSize: "50px",
                        }}
                      >
                        {title.title}
                      </h3>
                      <div style={{ fontSize: "25px", color: "white" }}>
                        {title.year}
                      </div>
                      <hr style={{ color: "green", border: "solid" }} />
                      <div className="flex items-center gap-3">
                        <span
                          className={`sparkle`}
                          style={{
                            fontFamily: "Bebas Neue",
                            fontSize: "50px",
                            textShadow: "1px 1px 20px black",
                            color:
                              title.positon.toLowerCase() === "gold"
                                ? "#FFD700"
                                : title.positon.toLowerCase() === "silver"
                                ? "#C0C0C0"
                                : title.positon.toLowerCase() === "bronze"
                                ? "#CD7F32"
                                : "black",
                          }}
                        >
                          {title.positon}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          style={{
                            fontFamily: "Bebas Neue",
                            fontSize: "50px",
                            color: "#009933",
                          }}
                        >
                          {title.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {titles.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
                <Trophy className="relative w-24 h-24 text-green-400/50 mx-auto mb-6 float-bounce animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                No Titles Yet
              </h3>
              <p className="text-green-400/60">
                The championship journey begins here...
              </p>
            </div>
          )}
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes zoom-in {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes sparkle {
            from {
              filter: brightness(1);
            }
            to {
              filter: brightness(1.5);
            }
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }

          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }

          .animate-zoom-in {
            animation: zoom-in 0.8s ease-out;
          }

          .float-bounce {
            animation: float 3s ease-in-out infinite;
          }

          .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card-hover:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }

          .sparkle {
            animation: sparkle 1s infinite alternate;
          }
        `}</style>
      </div>
    </>
  );
};

export default TitlesSection;

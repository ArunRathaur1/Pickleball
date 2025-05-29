import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Calendar, Star, Sparkles, Crown } from "lucide-react";

interface Title {
  title: string;
  year: number;
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 ">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative space-y-8 p-8">
        {/* Header Section with Enhanced Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4 p-8 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-green-500/20">
              <div className="relative">
                <Crown
                  className="w-12 h-12 text-green-400 animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
                <Sparkles
                  className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin"
                  style={{ animationDuration: "4s" }}
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
                  Championship Gallery
                </h1>
                <p className="text-green-300/80 text-lg mt-2 animate-pulse">
                  Celebrating victories and achievements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Trophy,
              value: titles.length,
              label: "Total Titles",
              delay: "0s",
              color: "from-green-600 to-emerald-700",
            },
            {
              icon: Calendar,
              value: latestVictoryYear,
              label: "Latest Victory",
              delay: "0.2s",
              color: "from-emerald-600 to-teal-700",
            },
            {
              icon: Star,
              value: yearsActive,
              label: "Years Active",
              delay: "0.4s",
              color: "from-teal-600 to-green-700",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group animate-slide-up opacity-0"
              style={{
                animationDelay: stat.delay,
                animationFillMode: "forwards",
                animationDuration: "0.8s",
              }}
            >
              <Card className="relative border-0 bg-black/40 backdrop-blur-md shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                <div className="absolute inset-[1px] bg-black/60 rounded-lg"></div>

                <CardContent className="relative p-8 text-center">
                  {/* Glowing background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div className="flex justify-center mb-4 relative">
                      <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full backdrop-blur-sm border border-green-400/30">
                        <stat.icon className="w-10 h-10 text-green-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-5xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-green-300/80 font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Titles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {titles.map((title, index) => (
            <div
              key={title._id || index}
              className="group animate-fade-in-up opacity-0"
              style={{
                animationDelay: `${0.6 + index * 0.1}s`,
                animationFillMode: "forwards",
                animationDuration: "0.8s",
              }}
            >
              <Card className="relative border-0 shadow-2xl hover:shadow-green-500/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2 overflow-hidden bg-black/60 backdrop-blur-md">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                <div className="absolute inset-[1px] bg-black/80 rounded-lg"></div>

                <CardContent className="relative p-0">
                  {/* Enhanced Header with Animations */}
                  <div className="relative bg-gradient-to-br from-green-700 via-emerald-800 to-green-900 p-8 overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8 animate-pulse"></div>
                    </div>

                    {/* Floating sparkles */}
                    <div className="absolute inset-0">
                      <Sparkles
                        className="absolute top-4 right-4 w-4 h-4 text-yellow-400/60 animate-spin"
                        style={{ animationDuration: "8s" }}
                      />
                      <Sparkles
                        className="absolute bottom-6 left-6 w-3 h-3 text-green-300/60 animate-spin"
                        style={{
                          animationDuration: "6s",
                          animationDirection: "reverse",
                        }}
                      />
                    </div>

                    <div className="relative flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-md animate-pulse"></div>
                        <div className="relative p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 group-hover:rotate-12 transition-transform duration-500">
                          <Award className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-white text-xl leading-tight mb-3 group-hover:text-green-200 transition-colors duration-300">
                          {title.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-white/90" />
                          <span className="text-white/95 font-bold text-lg bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            {title.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Footer */}
                  <div className="relative p-6 bg-black/90 border-t border-green-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold tracking-wide">
                        Championship Title
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-green-400 text-green-400 hover:scale-125 transition-transform duration-300 animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {titles.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
              <Trophy className="relative w-24 h-24 text-green-400/50 mx-auto mb-6 animate-bounce" />
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

      {/* Custom CSS for animations */}
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TitlesSection;

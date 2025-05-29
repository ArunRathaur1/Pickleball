import { Card, CardContent } from "@/components/ui/card";
import {
  PlaySquare,
  Eye,
  Clock,
  Play,
  Film,
  Zap,
  Sparkles,
} from "lucide-react";

interface Content {
  title: string;
  imageUrl: string;
  youtubeLink: string;
}

interface Athlete {
  relatedContent: Content[];
}

const ContentSection = ({ athlete }: { athlete: Athlete }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/10 to-emerald-900/20">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div
          className="absolute top-20 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        ></div>
      </div>

      <div className="relative space-y-8 p-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-6 p-8 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-green-600/10 backdrop-blur-md rounded-3xl border border-green-500/20">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full backdrop-blur-sm border border-green-400/30">
                  <Film className="w-10 h-10 text-green-400 animate-pulse" />
                </div>
                <Sparkles
                  className="absolute -top-2 -right-2 w-5 h-5 text-green-300 animate-spin"
                  style={{ animationDuration: "6s" }}
                />
              </div>
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
                  Media Gallery
                </h2>
                <p className="text-green-300/80 text-lg mt-2 animate-pulse">
                  Videos, interviews, and exclusive content
                </p>
              </div>
            </div>
          </div>
        </div>

        {athlete.relatedContent.length > 0 ? (
          <>
            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: PlaySquare,
                  value: athlete.relatedContent.length,
                  label: "Total Videos",
                  delay: "0s",
                  gradient: "from-green-600 to-emerald-700",
                  iconColor: "text-green-400",
                },
                {
                  icon: Eye,
                  value: "High",
                  label: "Engagement",
                  delay: "0.2s",
                  gradient: "from-emerald-600 to-teal-700",
                  iconColor: "text-emerald-400",
                },
                {
                  icon: Clock,
                  value: "Recent",
                  label: "Content Updates",
                  delay: "0.4s",
                  gradient: "from-teal-600 to-green-700",
                  iconColor: "text-teal-400",
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
                  <Card className="relative border-0 bg-black/30 backdrop-blur-md shadow-2xl hover:shadow-green-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-2 overflow-hidden">
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                    <div className="absolute inset-[1px] bg-black/60 rounded-lg"></div>

                    <CardContent className="relative p-8 text-center">
                      {/* Glowing Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`}
                      ></div>

                      <div className="relative">
                        <div className="flex justify-center mb-6 relative">
                          <div className="absolute inset-0 bg-green-400/10 rounded-full blur-lg animate-pulse"></div>
                          <div className="relative p-5 bg-gradient-to-br from-green-500/15 to-emerald-600/15 rounded-full backdrop-blur-sm border border-green-400/20 group-hover:rotate-12 transition-transform duration-500">
                            <stat.icon
                              className={`w-12 h-12 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}
                            />
                          </div>
                          <div className="absolute -top-1 -right-1">
                            <Zap
                              className="w-4 h-4 text-green-300 animate-bounce"
                              style={{ animationDelay: `${index * 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div className="text-4xl font-black text-green-400 mb-3 group-hover:scale-105 transition-transform duration-300">
                          {stat.value}
                        </div>
                        <div className="text-green-300/80 font-semibold tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Enhanced Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {athlete.relatedContent.map((content, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: `${0.8 + index * 0.15}s`,
                    animationFillMode: "forwards",
                    animationDuration: "0.9s",
                  }}
                >
                  <Card className="relative border-0 shadow-2xl hover:shadow-green-500/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden bg-black/40 backdrop-blur-md">
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                    <div className="absolute inset-[1px] bg-black/80 rounded-lg"></div>

                    <CardContent className="relative p-0">
                      <a
                        href={content.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="relative overflow-hidden aspect-video">
                          {/* Image with Enhanced Effects */}
                          <img
                            src={content.imageUrl}
                            alt={content.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:brightness-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMxRjJBMzciLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSI5MCIgcj0iMzAiIGZpbGw9IiM0Yjk1NDMiLz48cGF0aCBkPSJNMTUwIDc1TDE3NSA5MEwxNTAgMTA1Vjc1WiIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNGI5NTQzIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+VmlkZW8gQ29udGVudDwvdGV4dD48L3N2Zz4=";
                            }}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse"></div>
                              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                                <Play
                                  className="w-10 h-10 text-white ml-1"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Corner Sparkle */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Sparkles
                              className="w-6 h-6 text-green-300 animate-spin"
                              style={{ animationDuration: "4s" }}
                            />
                          </div>

                          {/* Bottom Gradient Badge */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-green-300 text-sm font-medium">
                                Watch Now
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Title Section */}
                        <div className="p-6 bg-black/90">
                          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-green-300 transition-colors duration-300 line-clamp-2 mb-2">
                            {content.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-green-400/80 text-sm font-medium">
                                Video Content
                              </span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div
                                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Enhanced Empty State */
          <div className="text-center py-24 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative p-8 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full backdrop-blur-sm border border-green-400/20">
                <Film className="w-20 h-20 text-green-400/60 animate-pulse" />
              </div>
              <Sparkles
                className="absolute -top-2 -right-2 w-8 h-8 text-green-300 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
            <h3 className="text-3xl font-black text-green-300 mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              No Content Available
            </h3>
            <p className="text-green-400/60 text-lg">
              Stay tuned for exciting media content coming soon...
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <div
                className="w-2 h-2 bg-green-400/40 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-400/40 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-400/40 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for Enhanced Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ContentSection;

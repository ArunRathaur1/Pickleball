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
      <div className="relative space-y-8 p-8">
        <hr></hr>
        <div
          style={{
            fontFamily: "Bebas Neue",
            fontWeight: "bold",
            fontSize: "80px",
            color: "#E2D8B3",
          }}
        >
          VIDEOS CONTENT
        </div>
          <hr></hr>
        {athlete.relatedContent.length > 0 ? (
          <>
            {/* Enhanced Stats Section */}

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

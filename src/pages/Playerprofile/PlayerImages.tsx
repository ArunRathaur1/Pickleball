import React from "react";
import { Card } from "@/components/ui/card";

// Placeholder random athlete images
const images = [
  "https://images.unsplash.com/photo-1600226411809-bb3c4b7339a7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1603415526960-f9e129d4ed91?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1619441207978-3c58b7d6831b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1593341646782-402a2d02d3ea?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1571019613914-85f342c1d4d2?auto=format&fit=crop&w=400&q=80",
];

const PlayerImages = () => {
  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-220px * 6 - 1.5rem * 6));
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6),
              0 0 40px rgba(34, 197, 94, 0.4);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.05);
          animation: glow 2s ease-in-out infinite;
        }

        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-hover:hover .shimmer-overlay {
          opacity: 1;
        }

        .gradient-border {
          background: linear-gradient(
            45deg,
            #22c55e,
            #16a34a,
            #15803d,
            #166534
          );
          background-size: 400% 400%;
          animation: gradient-shift 4s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5),
            0 0 20px rgba(34, 197, 94, 0.3), 0 0 30px rgba(34, 197, 94, 0.1);
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <section className="overflow-hidden py-12 bg-gradient-to-br from-white via-gray-50 to-green-50 dark:from-black dark:via-gray-900 dark:to-gray-800 relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-4 h-4 bg-green-600 rounded-full animate-ping"></div>
        </div>

        {/* Main title with enhanced styling */}
        <div className="text-center mb-8 animate-float">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent mb-2 pulse-glow">
            Player Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Enhanced scrolling gallery */}
        <div className="relative w-full">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10"></div>

          <div className="animate-scroll flex w-max gap-6">
            {[...images, ...images].map((src, idx) => (
              <Card
                key={idx}
                className="min-w-[240px] h-[320px] overflow-hidden border-0 bg-white dark:bg-black rounded-2xl card-hover relative group"
                style={{
                  animationDelay: `${idx * 200}ms`,
                }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 gradient-border rounded-2xl p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-white dark:bg-black rounded-xl"></div>
                </div>

                {/* Image container */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt={`Player ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Shimmer overlay */}
                  <div className="shimmer-overlay"></div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Player info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="font-bold text-lg">
                      Player {(idx % 6) + 1}
                    </h3>
                    <p className="text-sm opacity-90">Professional Athlete</p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse"
              style={{ animationDelay: `${i * 300}ms` }}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PlayerImages;

import React, { useState, useEffect } from "react";
import {
  Building2,
  TrendingUp,
  Star,
  Award,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const SponsorsSection = ({ athlete = { sponsors: [] } }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSponsor, setHoveredSponsor] = useState(null);
  const sponsorCount = athlete.sponsors?.length || 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div>
        <hr style={{ color: "#E2D8B3" }}></hr>
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ padding: "50px" }}
        >
          <div
            style={{
              color: "#E2D8B3",
              fontFamily: "Bebas Neue",
              fontSize: "100px",
            }}
          >
            Sponsors
          </div>
          <div
            style={{
              color: "white",
              fontFamily: "Bebas Neue",
              fontSize: "30px",
              marginTop: "-30px",
            }}
          >
            PARTNER WITH US IN CHAMPIONING THE FUTURE OF PICKLEBALL
          </div>
        </div>
        <hr style={{ color: "#E2D8B3" }}></hr>

        {sponsorCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {athlete.sponsors.map((sponsor, index) => (
              <div
                key={index}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSponsor(index)}
                onMouseLeave={() => setHoveredSponsor(null)}
                className={`transition-all duration-700 transform ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
              >
                <div className="relative p-0 h-full backdrop-blur-md rounded-xl flex flex-col">
                  <div className="flex-1 flex items-center justify-center px-4 pt-4">
                    <img
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      className="transition-transform duration-500 hover:scale-105"
                      style={{ width: "500px", border: "solid" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`relative overflow-hidden border-0 bg-white shadow-2xl max-w-2xl mx-auto rounded-lg transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            No sponsors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsSection;

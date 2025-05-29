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

const getSponsorStrength = (count) => {
  if (count < 3)
    return {
      label: "Emerging",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      icon: Star,
    };
  if (count <= 5)
    return {
      label: "Growing",
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      icon: TrendingUp,
    };
  return {
    label: "Elite",
    color: "text-green-600",
    bgColor: "bg-green-600/30",
    icon: Trophy,
  };
};

const SponsorsSection = ({ athlete = { sponsors: [] } }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSponsor, setHoveredSponsor] = useState(null);
  const sponsorCount = athlete.sponsors?.length || 0;
  const strength = getSponsorStrength(sponsorCount);
  const StrengthIcon = strength.icon;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements - Made Transparent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-transparent rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "4s" }}
        />

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-32 right-1/4 w-8 h-8 border-2 border-green-300/30 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-emerald-300/20 rounded-full animate-bounce delay-500" />
        <div className="absolute top-2/3 right-32 w-4 h-4 bg-green-400/25 animate-pulse delay-700" />
      </div>

      <div
        className={`relative z-10 space-y-8 p-8 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl backdrop-blur-sm border border-green-200/50">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-black bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                Official Sponsors
              </h2>
              <p className="text-green-600/80 text-lg font-medium">
                Elite brand partnerships & endorsements
              </p>
            </div>
          </div>
        </div>

        {sponsorCount > 0 ? (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div
                className={`group relative overflow-hidden border-0 bg-white shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 rounded-lg ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-transparent" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="relative p-8 bg-transparent">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800">
                        Partnership Count
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                      {sponsorCount}
                    </div>
                    <p className="text-green-600/70 font-medium">
                      Active Brand Collaborations
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`group relative overflow-hidden border-0 bg-white shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 delay-200 rounded-lg ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-transparent" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <StrengthIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800">
                        Market Presence
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`text-5xl font-black ${strength.color} drop-shadow-sm`}
                    >
                      {strength.label}
                    </div>
                    <p className="text-green-600/70 font-medium">
                      Brand Endorsement Level
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {athlete.sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer rounded-lg ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredSponsor(index)}
                  onMouseLeave={() => setHoveredSponsor(null)}
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-[2px] bg-transparent rounded-lg" />

                  <div className="relative p-0 h-full backdrop-blur-md bg-white/30 rounded-xl">
                    {/* Logo Section */}
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-12 flex items-center justify-center min-h-[200px] group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-500">
                      {/* Floating Particles */}
                      {hoveredSponsor === index && (
                        <>
                          <div className="absolute top-6 left-6 w-3 h-3 bg-green-400 rounded-full animate-bounce" />
                          <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce delay-100" />
                          <div className="absolute bottom-8 left-8 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200" />
                        </>
                      )}

                      <img
                        src={sponsor.imageUrl}
                        alt={sponsor.name}
                        className="max-h-32 max-w-full object-contain transition-all duration-500 group-hover:scale-125 filter group-hover:brightness-110"
                        onError={(e) => {
                          const target = e.target;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
            <div class='flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl text-white font-black text-4xl shadow-xl transform group-hover:scale-125 transition-transform duration-500'>
              ${sponsor.name.charAt(0).toUpperCase()}
            </div>
          `;
                          }
                        }}
                      />

                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    </div>

                    {/* Sponsor Name */}
                    <div className="p-6 text-center bg-gradient-to-r from-white to-green-50/50 group-hover:from-green-50 group-hover:to-emerald-50 transition-all duration-500">
                      <h3 className="font-bold text-green-800 group-hover:text-green-700 transition-colors duration-500 text-xl">
                        {sponsor.name}
                      </h3>

                      {/* Animated Underline */}
                      <div className="mt-3 h-1 bg-gradient-to-r from-green-400 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
                    </div>
                  </div>

                  {/* Hover Sparkle Effect */}
                  {hoveredSponsor === index && (
                    <div className="absolute top-3 right-3">
                      <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className={`relative overflow-hidden border-0 bg-white shadow-2xl max-w-2xl mx-auto rounded-lg ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-transparent" />
            <div className="relative p-16 text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-30 animate-pulse" />
                </div>
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
                Seeking Elite Partnerships
              </h3>
              <p className="text-green-600/80 text-lg font-medium leading-relaxed">
                This exceptional athlete is actively exploring premium
                sponsorship opportunities with forward-thinking brands.
              </p>

              {/* Animated Dots */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsSection;

import { Athlete } from "./Types";
import { Badge } from "@/components/ui/badge";
import { Instagram, Award, MapPin, Calendar } from "lucide-react";

const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 dark:from-slate-900 dark:via-emerald-900 dark:to-black">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    {/* Floating particles effect */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        ></div>
      ))}
    </div>

    <div className="relative z-10 p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/30 backdrop-blur-sm shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img
                src={athlete.imageUrl}
                alt={athlete.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg animate-bounce">
              <Award className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            {/* Name and ID */}
            <div className="mb-6">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent mb-2 animate-fade-in">
                {athlete.name}
              </h1>
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/90 text-sm font-medium shadow-lg">
                <span className="text-emerald-200">DUPRID:</span>{" "}
                {athlete.DUPRID}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 px-4 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <MapPin className="w-4 h-4 mr-2" />
                {athlete.country}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 px-4 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {athlete.gender}
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Age</p>
                <p className="text-2xl font-bold text-white">{athlete.age}</p>
                <p className="text-white/60 text-xs">years</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="flex justify-center mb-2">
                  <div className="w-5 h-5 bg-cyan-300 rounded-sm"></div>
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Height</p>
                <p className="text-2xl font-bold text-white">
                  {athlete.height}
                </p>
                <p className="text-white/60 text-xs">cm</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-lg col-span-2 lg:col-span-1">
                <div className="flex justify-center mb-2">
                  <Award className="w-5 h-5 text-yellow-300" />
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Points</p>
                <p className="text-2xl font-bold text-white">
                  {athlete.points.toLocaleString()}
                </p>
                <p className="text-white/60 text-xs">total</p>
              </div>
            </div>

            {/* Instagram Link */}
            {athlete.instagramPage && (
              <a
                href={athlete.instagramPage}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group overflow-hidden"
              >
                {/* Background hover effect safely layered behind */}
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none" />

                {/* Foreground content with higher z-index */}
                <Instagram className="w-5 h-5 z-10" />
                <span className="z-10">Follow on Instagram</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(180deg);
        }
      }

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

      .animate-float {
        animation: float linear infinite;
      }

      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }
    `}</style>
  </div>
);

export default HeroSection;

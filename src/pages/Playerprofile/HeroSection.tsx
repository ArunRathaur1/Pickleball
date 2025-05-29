import { Athlete } from "./Types";
import { Badge } from "@/components/ui/badge";
import { Instagram, Award, MapPin, Calendar } from "lucide-react";
const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div
    className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat text-white"
    style={{ backgroundImage: `url(${athlete.imageUrl})` }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 backdrop-blur-sm z-0" />
    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center items-start text-left px-8 lg:px-16">
      {/* Player Logo */}
      <img
        src={athlete.playerlogoimage}
        alt={`${athlete.name} Logo`}
        className="w-20 h-20 mb-4 rounded-full border-2 border-white/30 shadow-lg"
      />

      {/* Name & Player ID */}
      <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent animate-fade-in">
        {athlete.name}
      </h1>
      <p className="text-sm mt-2 font-medium text-white/80">
        Player ID: <span className="text-emerald-300">{athlete.playerid}</span>
      </p>

      {/* DUPRID */}
      <div className="mt-3 bg-white/10 px-4 py-1 rounded-full text-sm backdrop-blur-md border border-white/20 max-w-max">
        DUPRID: {athlete.DUPRID}
      </div>

      {/* About */}
      <p className="mt-6 max-w-xl text-white/90 text-lg italic">
        "{athlete.about}"
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mt-10 max-w-xl">
        <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-white text-sm shadow-md">
          <MapPin className="w-4 h-4 mr-2" />
          {athlete.country}
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white text-sm shadow-md">
          {athlete.gender}
        </Badge>
        <Badge className="bg-white/10 border border-white/20 px-4 py-2 text-white text-sm shadow-md">
          <Calendar className="w-4 h-4 mr-2" />
          {athlete.age} yrs
        </Badge>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 text-white text-sm shadow-md">
          <Award className="w-4 h-4 mr-2" />
          {athlete.points} Points
        </Badge>
      </div>

      {/* Instagram */}
      {athlete.instagramPage && (
        <a
          href={athlete.instagramPage}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 rounded-full text-white text-sm font-medium hover:scale-105 transition-all shadow-lg"
        >
          <Instagram className="w-4 h-4" />
          Follow on Instagram
        </a>
      )}
    </div>

    {/* Animations */}
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
      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }
    `}</style>
  </div>
);

export default HeroSection;

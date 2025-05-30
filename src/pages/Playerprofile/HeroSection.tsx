import { Athlete } from "./Types";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Award,
  MapPin,
  Calendar,
  Youtube,
  Twitter,
} from "lucide-react";

const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div
    className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat text-white overflow-hidden"
    style={{ backgroundImage: `url(${athlete.imageUrl})` }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 z-0" />

    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto h-full px-6 lg:px-16 flex items-center justify-between text-left animate-slide-up">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center h-full">
        {/* Name & Player ID */}
        <h1 className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-green-300 via-lime-200 to-emerald-100 bg-clip-text text-transparent animate-fade-in drop-shadow-lg">
          {athlete.name}
        </h1>
        <p className="text-md lg:text-lg mt-3 font-medium text-green-100/90 tracking-wide">
          Player ID:{" "}
          <span className="text-lime-300 font-semibold text-lg">
            {athlete.playerid}
          </span>
        </p>

        {/* DUPRID */}
        <div className="mt-4 bg-white/5 px-5 py-2 rounded-full text-md backdrop-blur-md border border-green-300/20 max-w-max text-green-100 font-medium tracking-wide">
          DUPRID: {athlete.DUPRID}
        </div>

        {/* About */}
        <p className="mt-8 max-w-2xl text-green-100/95 text-xl italic leading-relaxed">
          "{athlete.about}"
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mt-12 max-w-xl text-base">
          <Badge className="bg-gradient-to-r from-green-700 to-green-600 px-5 py-3 text-white text-base shadow-lg border border-green-500/20 backdrop-blur-sm">
            <MapPin className="w-5 h-5 mr-2" />
            {athlete.country}
          </Badge>
          <Badge className="bg-gradient-to-r from-lime-600 to-green-500 px-5 py-3 text-white text-base shadow-lg border border-green-300/20">
            {athlete.gender}
          </Badge>
          <Badge className="bg-white/5 border border-green-300/20 px-5 py-3 text-white text-base shadow-lg">
            <Calendar className="w-5 h-5 mr-2" />
            {athlete.age} yrs
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-lime-300 px-5 py-3 text-green-900 text-base shadow-md font-bold">
            <Award className="w-5 h-5 mr-2" />
            {athlete.points} Points
          </Badge>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row sm:gap-6 gap-4 mt-10">
          {/* Instagram */}
          {athlete.instagramPage && (
            <a
              href={athlete.instagramPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-green-600 px-8 py-4 rounded-full text-white text-lg font-semibold hover:scale-105 transition-all shadow-xl hover:shadow-green-400/30"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          )}

          {/* YouTube */}
          {athlete.youtubeHandle && (
            <a
              href={athlete.youtubeHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 rounded-full text-white text-lg font-semibold hover:scale-105 transition-all shadow-xl hover:shadow-green-400/30"
            >
              <Youtube className="w-5 h-5" />
              Watch on YouTube
            </a>
          )}

          {/* Twitter */}
          {athlete.twitterHandle && (
            <a
              href={athlete.twitterHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-500 px-8 py-4 rounded-full text-white text-lg font-semibold hover:scale-105 transition-all shadow-xl hover:shadow-sky-300/30"
            >
              <Twitter className="w-5 h-5" />
              Follow on Twitter
            </a>
          )}
        </div>
      </div>

      {/* Right: Logo */}
      <div className="hidden lg:block flex-shrink-0 ml-8 animate-pop">
        <div className="w-[500px] h-[500px] overflow-hidden rounded-full shadow-2xl ring-4 ring-green-400/30 ring-offset-4 ring-offset-green-100/10">
          <img
            src={athlete.playerlogoimage}
            alt={`${athlete.name} Logo`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Animations */}
    <style jsx>{`
      @keyframes fade-in {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slide-up {
        0% {
          opacity: 0;
          transform: translateY(40px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pop {
        0% {
          transform: scale(0.8);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
      }

      .animate-slide-up {
        animation: slide-up 1.2s ease-out forwards;
      }

      .animate-pop {
        animation: pop 1s ease-in-out forwards;
      }
    `}</style>
  </div>
);

export default HeroSection;

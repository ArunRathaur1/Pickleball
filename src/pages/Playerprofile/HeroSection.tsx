import { Athlete } from "./Types";
import { Instagram, Youtube } from "lucide-react";

const capitalizeWords = (str: string) => str.toUpperCase();
const textColorClass = "text-[#E2D8B3]";

const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="relative w-full h-screen ">
    {/* ✅ Background Image */}
    <div
      className="absolute top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat z-0"
      style={{ backgroundImage: `url(${athlete.playerlogoimage})`,marginTop:'-70px',zIndex:"-100"}}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* ✅ Foreground Content */}
    <div
      className="relative z-10 mx-auto h-full flex items-center justify-between text-left animate-slide-up"
      style={{ paddingRight: "5%" }}
    >
      <div className="flex-1 flex flex-col justify-center h-full items-end text-right">
        <h1
          className={`text-5xl lg:text-7xl font-extrabold animate-fade-in ${textColorClass}`}
          style={{
            fontFamily: "Bebas Neue",
            fontSize: "150px",
            marginTop: "-100px",
            letterSpacing: "0.08em",
          }}
        >
          {capitalizeWords(athlete.name)}
        </h1>

        <div className="mt-3" style={{ marginTop: "30px" }}>
          <p
            className={`text-3xl font-bold uppercase ${textColorClass}`}
            style={{
              fontFamily: "Bebas Neue",
              fontSize: "60px",
              letterSpacing: "0.08em",
            }}
          >
            {capitalizeWords(athlete.playerid)}
          </p>
          <p
            className={`text-lg font-medium uppercase text-white mt-1`}
            style={{ fontFamily: "Montserrat", marginTop: "20px" }}
          >
            Player ID
          </p>

          <div className="my-4" style={{ marginTop: "30px" }} />

          <p
            className={`text-3xl font-bold uppercase ${textColorClass}`}
            style={{
              fontFamily: "Bebas Neue",
              fontSize: "60px",
              letterSpacing: "0.08em",
            }}
          >
            {capitalizeWords(athlete.DUPRID)}
          </p>
          <p
            className={`text-lg font-medium uppercase text-white mt-1`}
            style={{ fontFamily: "Montserrat", marginTop: "20px" }}
          >
            DUPRID
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-6 mt-10 justify-end">
          {athlete.instagramPage && (
            <a
              href={athlete.instagramPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white text-lg font-semibold hover:scale-110 transition-transform uppercase"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
              FOLLOW ON INSTAGRAM
            </a>
          )}

          {athlete.youtubeHandle && (
            <a
              href={athlete.youtubeHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white text-lg font-semibold hover:scale-110 transition-transform uppercase"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
              WATCH ON YOUTUBE
            </a>
          )}
        </div>

        {/* Rank Badge */}
        <div
          className="absolute text-white text-4xl font-bold uppercase tracking-widest z-20 md:left-10 md:top-10 left-1/2 transform -translate-x-1/2 md:transform-none"
          style={{
            fontFamily: "Bebas Neue",
            top: "450px",
            fontSize: "300px",
            height: "100px",
          }}
        >
          #14
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

      .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
      }

      .animate-slide-up {
        animation: slide-up 1.2s ease-out forwards;
      }
    `}</style>
  </div>
);

export default HeroSection;

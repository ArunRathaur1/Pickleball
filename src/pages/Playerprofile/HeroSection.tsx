import { Athlete } from "./Types";
import { Instagram, Youtube } from "lucide-react";
import Image_Background from "./Background.png";

const capitalizeWords = (str: string) => str.toUpperCase();
const textColorClass = "text-[#E2D8B3]";

const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="relative w-full h-screen " style={{ zIndex: "-5" }}>
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover  z-0"
      style={{
        backgroundImage: `url(${Image_Background})`,
        top: "-100px",
        width: "100%",
        height: "100hv",
      }}
    />

    {/* Player Logo Image */}
    <div
      className="absolute inset-0 bg-cover bg-center z-10"
      style={{ backgroundImage: `url(${athlete.playerlogoimage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0  z-10" />
    </div>

    {/* Foreground Text and Content */}
    <div
      className="relative z-20 mx-auto h-full flex items-center justify-between text-left animate-slide-up"
      style={{ paddingRight: "5%" }}
    >
      <div className="flex-1 flex flex-col justify-center h-full items-end text-right">
        <h1
          className={`text-5xl lg:text-7xl font-extrabold animate-fade-in ${textColorClass}`}
          style={{
            fontFamily: "Bebas Neue",
            fontSize: "116px",
            marginTop: "-80px",
            letterSpacing: "0.08em",
            textShadow: "2px 2px 20px rgba(0, 0, 0, 1)", // Added text shadow
          }}
        >
          {athlete.name}
        </h1>

        <div className="mt-3" style={{ marginTop: "70px" }}>
          <p
            className={`text-3xl font-bold uppercase ${textColorClass}`}
            style={{
              fontFamily: "Bebas Neue",
              fontSize: "98px",
              letterSpacing: "0.08em",
            }}
          >
            {athlete.DUPRIDDOUBLES}
          </p>
          <p
            className="text-lg font-medium uppercase text-white mt-1"
            style={{
              fontFamily: "Montserrat",
              marginTop: "20px",
              fontSize: "12.7px",
            }}
          >
            DOPRDOUBLES
          </p>

          <div className="my-4" style={{ marginTop: "50px" }} />

          <p
            className={`text-3xl font-bold uppercase ${textColorClass}`}
            style={{
              fontFamily: "Bebas Neue",
              fontSize: "98px",
              letterSpacing: "0.08em",
            }}
          >
            {athlete.DUPRIDSINGLES}
          </p>
          <p
            className="text-lg font-medium uppercase text-white mt-1"
            style={{
              fontFamily: "Montserrat",
              marginTop: "20px",
              fontSize: "12.7px",
            }}
          >
            DUPERSINGLES
          </p>
        </div>

        {/* Social Links */}
        <div
          className="flex flex-col gap-6 mt-10 justify-end"
          style={{ marginTop: "100px" }}
        >
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
          className={`absolute font-bold uppercase tracking-widest z-30 
    left-1/4 transform -translate-x-1/2 md:left-10 md:top-10 md:transform-none 
    ${textColorClass} text-[100px] md:text-[273px]`}
          style={{
            fontFamily: "Bebas Neue",
            top: "300px",
            textShadow: "2px 2px 20px rgba(0, 0, 0, 1)",
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

import { Athlete } from "./Types";
import { Instagram, Youtube } from "lucide-react";
import Image_Background from "./Background.png";

const textColorClass = "text-[#E2D8B3]";

const textShadow = "2px 2px 20px rgba(0, 0, 0, 1)";

const HeroSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="relative w-full min-h-screen pt-[120px]">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center "
      style={{
        backgroundImage: `url(${Image_Background})`,
        paddingTop: "120px",
        width: "120%",
        left: "-5%",
        marginTop:'-120px',
        zIndex:"-1"
      }}
    ></div>

    {/* Player Logo Image */}
    <div
      className="absolute inset-0 bg-cover bg-center "
      style={{ backgroundImage: `url(${athlete.playerlogoimage})` }}
    ></div>

    {/* Foreground Text and Content */}
    <div
      className="relative z-20 mx-auto h-full flex items-center justify-between text-left animate-slide-up"
      style={{ paddingRight: "5%" }}
    >
      <div className="flex-1 flex flex-col justify-center h-full items-end text-right">
        <h1
          className={`text-[40px] sm:text-[60px] md:text-[116px] font-extrabold animate-fade-in ${textColorClass}`}
          style={{
            fontFamily: "Bebas Neue",
            marginTop: "-80px",
            letterSpacing: "0.08em",
            textShadow,
          }}
        >
          {athlete.fullName}
        </h1>

        <div className="mt-3 sm:mt-6">
          {/* Doubles Rating */}
          <p
            className={`font-bold uppercase ${textColorClass} text-[40px] sm:text-[60px] md:text-[98px]`}
            style={{
              fontFamily: "Bebas Neue",
              letterSpacing: "0.08em",
              textShadow,
            }}
          >
            {athlete.ratings.doubles}
          </p>
          <p
            className="text-[10px] sm:text-[12px] md:text-[12.7px] font-medium uppercase text-white mt-1"
            style={{
              fontFamily: "Montserrat",
              textShadow,
            }}
          >
            DUPRDOUBLES
          </p>

          <div className="my-6 sm:my-8" />

          {/* Singles Rating */}
          <p
            className={`font-bold uppercase ${textColorClass} text-[40px] sm:text-[60px] md:text-[98px]`}
            style={{
              fontFamily: "Bebas Neue",
              letterSpacing: "0.08em",
              textShadow,
            }}
          >
            {athlete.ratings.singles}
          </p>
          <p
            className="text-[10px] sm:text-[12px] md:text-[12.7px] font-medium uppercase text-white mt-1"
            style={{
              fontFamily: "Montserrat",
              textShadow,
            }}
          >
            DUPRSINGLES
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4 sm:gap-6 mt-8 items-end sm:items-end">
          {athlete.instagramPage && (
            <a
              href={athlete.instagramPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base md:text-lg font-semibold hover:scale-110 transition-transform uppercase"
              aria-label="Instagram"
              style={{ textShadow }}
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              FOLLOW ON INSTAGRAM
            </a>
          )}
          {athlete.youtubeHandle && (
            <a
              href={athlete.youtubeHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base md:text-lg font-semibold hover:scale-110 transition-transform uppercase"
              aria-label="YouTube"
              style={{ textShadow }}
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
              WATCH ON YOUTUBE
            </a>
          )}
        </div>

        {/* Rank Badge */}
        <div
          className={`
    absolute z-30 font-bold uppercase tracking-widest
    text-[60px] sm:text-[100px] md:text-[273px]
    left-4 sm:left-8 md:left-10
    top-[100px] sm:top-[140px] md:top-[180px]
    ${textColorClass}
  `}
          style={{
            fontFamily: "Bebas Neue",
            textShadow,
          }}
        >
          {athlete.rank}
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

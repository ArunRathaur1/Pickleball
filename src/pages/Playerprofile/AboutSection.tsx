import { Athlete } from "./Types";
import AboutBackground from "./About  BG.png";

const textColorClass = "text-[#E2D8B3] font-[Bebas Neue]";

const AboutSection = ({ athlete }: { athlete: Athlete }) => {
  return (
    <>
      {/* Scrollable Foreground Content */}
      <hr style={{ color: "#E2D8B3" }}></hr>
      <div className="relative w-full px-4 md:px-20 py-16 space-y-24">
        {athlete.imageUrl?.map((item, index) => (
          <div
            key={item._id}
            className={`flex flex-col md:flex-row gap-16 items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className="space-y-8 md:w-1/2">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-wide text-[#E2D8B3]"
                style={{
                  textShadow: "1px 1px 10px black",
                }}
              >
                {item.text.toUpperCase()}
              </h1>
            </div>
            <div className=" border-2 border-[#E2D8B3] p-[5px]">
              <img
                src={item.image}
                alt={item.text}
                className="object-cover h-[300px] md:h-[400px] rounded-sm"
                style={{ width: "900px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutSection;

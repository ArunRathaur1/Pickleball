import { Athlete } from "./Types";
import { Card, CardContent } from "@/components/ui/card";
import Website_Background from "../spline/website";
import { Quote, Star, CheckCircle } from "lucide-react";

const AboutSection = ({ athlete }: { athlete: Athlete }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated Grid Pattern */}
          <div className="grid grid-cols-12 gap-4 h-full opacity-30">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="bg-green-500/10 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "3s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-16 px-4 md:px-10 py-12 max-w-7xl mx-auto" style={{fontSize:"50px"}}>
        {/* Hero Header */}
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            {/* Glowing Effect Behind Text */}
            <div className="absolute inset-0 blur-2xl bg-green-500/30 rounded-full scale-150"></div>

            <h1 className="relative text-6xl md:text-8xl font-black text-white leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                {athlete.name}
              </span>
            </h1>

            {/* Animated Underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full animate-pulse"></div>

            {/* Side Decorations */}
            <div className="absolute -left-8 top-1/2 w-2 h-16 bg-green-400 rounded-full animate-bounce opacity-60"></div>
            <div
              className="absolute -right-8 top-1/2 w-2 h-16 bg-green-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Discover the journey, achievements, and inspiring story of an
            exceptional athlete
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-24">
          {athlete.imageUrl?.map((item, index) => (
            <div
              key={item._id}
              className={`flex flex-col lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              } items-center gap-16 lg:gap-20`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative group">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-green-400/20 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 group">
                  {/* Border Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-3xl p-0.5 animate-pulse">
                    <div className="bg-black rounded-3xl h-full w-full"></div>
                  </div>

                  <div className="relative z-10 m-0.5">
                    <img
                      src={item.image}
                      alt={`athlete-story-${index}`}
                      className="rounded-3xl w-full h-80 lg:h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-white rounded-full animate-bounce opacity-80"></div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 space-y-8">
                <Card className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-700 border border-green-400/20 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg">
                  <CardContent className="p-8 lg:p-12">
                    <div className="flex items-start gap-6">
                      {/* Quote Icon */}
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-green-500/30">
                        <Quote className="w-7 h-7 text-black font-bold" />
                      </div>

                      <div className="flex-1 space-y-6">
                        <p className="text-lg lg:text-xl text-white leading-relaxed font-light tracking-wide" style={{fontSize:"30px"}}>
                          {item.text}
                        </p>

                        {/* Story Metadata */}
                        <div className="flex items-center justify-between pt-4 border-t border-green-400/20">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-green-400 text-green-400 opacity-80"
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-400 font-medium">
                              Chapter {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Decorative Line */}
                <div
                  className={`relative ${index % 2 !== 0 ? "lg:ml-auto" : ""}`}
                >
                  <div className="w-24 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
                  <div className="absolute top-0 left-0 w-6 h-0.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center py-16">
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl scale-150"></div>

            <div className="relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-sm rounded-full border border-green-400/30 shadow-lg shadow-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
              <span className="text-white font-medium tracking-wide">
                Journey Continues
              </span>
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping opacity-25"></div>
      </div>
    </div>
  );
};

export default AboutSection;

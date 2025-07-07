"use client";

import { useState } from "react";
import { Athlete } from "./Types";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";
import { Menu } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const tabOptions = [
  { value: "hero", label: "HERO" },
  { value: "about", label: "ABOUT" },
  { value: "titles", label: "TITLES" },
  { value: "sponsors", label: "SPONSORS" },
  { value: "content", label: "CONTENT" },
];

const TabsSection = ({ athlete }: { athlete: Athlete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden text-white">
      {/* Mobile Navbar */}
      <div className="sm:hidden px-4 py-3 flex justify-between items-center ">
        <span className="font-bold text-lg">MENU</span>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 py-2  space-y-2">
          {tabOptions.map(({ value, label }) => (
            <button
              key={value}
              className="block w-full text-left text-lg font-semibold hover:text-yellow-400"
              onClick={() => handleScroll(value)}
            >
              {label}
            </button>
          ))}
          <hr className="border-gray-600 my-2" />
          <RouterLink to="/">
            <button className="text-blue-400 hover:text-yellow-400 w-full text-left font-semibold">
              Home
            </button>
          </RouterLink>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden sm:flex justify-between items-center px-8 py-6">
        <div className="flex gap-10">
          {tabOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleScroll(value)}
              className="hover:text-green-400"
              style={{ fontFamily: "Times New Roman", fontSize: "30px" }}
            >
              {label}
            </button>
          ))}
        </div>
        <RouterLink to="/">
          <button className="border px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Home
          </button>
        </RouterLink>
      </div>

      {/* All Sections Rendered */}
      <div id="hero" className="scroll-mt-20">
        <HeroSection athlete={athlete} />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutSection athlete={athlete} />
      </div>
      <div id="titles" className="scroll-mt-20">
        <TitleSection athlete={athlete} />
      </div>
      <div id="sponsors" className="scroll-mt-20">
        <SponsorSection athlete={athlete} />
      </div>
      <div id="content" className="scroll-mt-20">
        <ContentSection athlete={athlete} />
      </div>
    </div>
  );
};

export default TabsSection;

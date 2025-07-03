"use client";

import { useState } from "react";
import { Athlete } from "./Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";
import { Link, Menu, Router } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
const tabOptions = [
  { value: "hero", label: "HERO" },
  { value: "about", label: "ABOUT" },
  { value: "titles", label: "TITLES" },
  { value: "sponsors", label: "SPONSORS" },
  { value: "content", label: "CONTENT" },
];

const TabsSection = ({ athlete }: { athlete: Athlete }) => {
  const [selectedTab, setSelectedTab] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="relative z-1000">
        <Tabs
          defaultValue="hero"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          {/* 📱 Mobile Navbar */}
          <div className="sm:hidden px-4 py-3 flex justify-between items-center text-white bg-black">
            <span className="font-bold text-lg">
              {tabOptions.find((tab) => tab.value === selectedTab)?.label}
            </span>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} />
            </button>
          </div>

          {/* 📱 Hamburger Menu */}
          {menuOpen && (
            <div className="sm:hidden px-4 py-2 bg-gray-800 text-white space-y-2">
              {tabOptions.map(({ value, label }) => (
                <button
                  key={value}
                  className="block w-full text-left text-lg font-semibold hover:text-yellow-400"
                  onClick={() => {
                    setSelectedTab(value);
                    setMenuOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
              <hr className="border-gray-600 my-2" />
              <RouterLink to='/'>
              <button
                className="block w-full text-left text-lg font-semibold text-blue-400 hover:text-yellow-400"
                onClick={() => {
                  setSelectedTab("hero"); // assuming "hero" is your home
                  setMenuOpen(false);
                }}
              >
                Home
              </button>
              </RouterLink>
            </div>
          )}

          {/* 🖥️ Desktop Navbar */}
          <div className="hidden sm:flex justify-between items-center px-8 py-6 bg-transparent text-white">
            {/* Tabs */}
            <TabsList
              style={{ marginBottom: "20px" }}
              className="flex flex-wrap justify-start gap-10 bg-transparent text-white font-bold scrollbar-hide"
            >
              {tabOptions.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-[state=active]:border-b-4 data-[state=active]:bg-transparent whitespace-nowrap"
                  style={{
                    fontSize: "28px",
                    padding: "10px 20px",
                    color: "white",
                    fontFamily: "Times New Roman, serif",
                    marginBottom: "100px",
                    zIndex: "1000",
                  }}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* 👉 Top-right Button */}
            <RouterLink to='/'>
            <button
              className="text-white border px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Home
            </button>
            </RouterLink>
          </div>

          {/* Tab Content */}
          <div className="relative">
            <TabsContent value="hero">
              <HeroSection athlete={athlete} />
            </TabsContent>
            <TabsContent value="about" className="animate-in">
              <AboutSection athlete={athlete} />
            </TabsContent>
            <TabsContent value="titles" className="animate-in">
              <TitleSection athlete={athlete} />
            </TabsContent>
            <TabsContent value="sponsors" className="animate-in">
              <SponsorSection athlete={athlete} />
            </TabsContent>
            <TabsContent value="content" className="animate-in">
              <ContentSection athlete={athlete} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsSection;

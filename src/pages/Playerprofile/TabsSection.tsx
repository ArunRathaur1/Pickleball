import { Athlete } from "./Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Trophy, Star, Play, Sparkles } from "lucide-react";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";

const TabsSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="relative w-full min-h-screen overflow-hidden">
    {/* ✅ Foreground Content */}
    <div className="relative z-10">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList
          style={{ marginTop: "30px", marginBottom: "-10px" }}
          className="flex justify-center gap-2 md:gap-4 mb-8 
             bg-transparent text-white font-bold 
            "
        >
          {/* Tab Buttons */}
          <TabsTrigger value="hero" className="group ...">
            <Sparkles
              className="w-4 h-4 group-data-[state=active]:animate-pulse"
              style={{ fontSize: "30px" }}
            />
            <span className="hidden sm:inline" style={{ fontSize: "30px" }}>
              Hero
            </span>
          </TabsTrigger>
          <TabsTrigger value="about" className="group ...">
            <User className="w-4 h-4 group-data-[state=active]:animate-pulse" />
            <span className="hidden sm:inline" style={{ fontSize: "30px" }}>
              About
            </span>
          </TabsTrigger>
          <TabsTrigger value="titles" className="group ...">
            <Trophy className="w-4 h-4 group-data-[state=active]:animate-bounce" />
            <span className="hidden sm:inline" style={{ fontSize: "30px" }}>
              Titles
            </span>
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="group ...">
            <Star className="w-4 h-4 group-data-[state=active]:animate-spin" />
            <span className="hidden sm:inline" style={{ fontSize: "30px" }}>
              Sponsors
            </span>
          </TabsTrigger>
          <TabsTrigger value="content" className="group ...">
            <Play className="w-4 h-4 group-data-[state=active]:animate-pulse" />
            <span className="hidden sm:inline" style={{ fontSize: "30px" }}>
              Content
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="relative">
          <TabsContent value="hero">
            <HeroSection athlete={athlete} />
          </TabsContent>
          <TabsContent value="about" className="animate-in ...">
            <AboutSection athlete={athlete} />
          </TabsContent>
          <TabsContent value="titles" className="animate-in ...">
            <TitleSection athlete={athlete} />
          </TabsContent>
          <TabsContent value="sponsors" className="animate-in ...">
            <SponsorSection athlete={athlete} />
          </TabsContent>
          <TabsContent value="content" className="animate-in ...">
            <ContentSection athlete={athlete} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Decorative Blur Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl pointer-events-none"></div>
    </div>
  </div>
);

export default TabsSection;

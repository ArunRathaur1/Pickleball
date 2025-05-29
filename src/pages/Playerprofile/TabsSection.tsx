import { Athlete } from "./Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Trophy, Star, Play, Sparkles } from "lucide-react";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";

const TabsSection = ({ athlete }: { athlete: Athlete }) => (
  <div className=" ">
    <Tabs defaultValue="about" className="w-full">
      {/* Enhanced TabsList with glass morphism effect */}
      <TabsList style={{marginTop:'30px',marginBottom:'-10px'}} className="flex justify-center gap-2 md:gap-4 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md  rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/50 overflow-x-auto scrollbar-hide">
        <TabsTrigger
          value="hero"
          className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25
            text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20
            whitespace-nowrap min-w-max"
        >
          <Sparkles className="w-4 h-4 group-data-[state=active]:animate-pulse" />
          <span className="hidden sm:inline">Hero</span>
        </TabsTrigger>

        <TabsTrigger
          value="about"
          className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/25
            text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20
            whitespace-nowrap min-w-max"
        >
          <User className="w-4 h-4 group-data-[state=active]:animate-pulse" />
          <span className="hidden sm:inline">About</span>
        </TabsTrigger>

        <TabsTrigger
          value="titles"
          className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-500 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/25
            text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20
            whitespace-nowrap min-w-max"
        >
          <Trophy className="w-4 h-4 group-data-[state=active]:animate-bounce" />
          <span className="hidden sm:inline">Titles</span>
        </TabsTrigger>

        <TabsTrigger
          value="sponsors"
          className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25
            text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20
            whitespace-nowrap min-w-max"
        >
          <Star className="w-4 h-4 group-data-[state=active]:animate-spin" />
          <span className="hidden sm:inline">Sponsors</span>
        </TabsTrigger>

        <TabsTrigger
          value="content"
          className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/25
            text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20
            whitespace-nowrap min-w-max"
        >
          <Play className="w-4 h-4 group-data-[state=active]:animate-pulse" />
          <span className="hidden sm:inline">Content</span>
        </TabsTrigger>
      </TabsList>

      {/* Enhanced Tab Contents with stagger animations */}
      <div className="relative">
        <TabsContent
          value="hero"
        >
        
            <HeroSection athlete={athlete} />
        </TabsContent>

        <TabsContent
          value="about"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-bottom-4"
        >
         
            <AboutSection athlete={athlete} />
        </TabsContent>

        <TabsContent
          value="titles"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-bottom-4"
        >
         
            <TitleSection athlete={athlete} />
        </TabsContent>

        <TabsContent
          value="sponsors"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-bottom-4"
        >
          
            <SponsorSection athlete={athlete} />
        </TabsContent>

        <TabsContent
          value="content"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-bottom-4"
        >
         
            <ContentSection athlete={athlete} />
        </TabsContent>
      </div>
    </Tabs>

    {/* Decorative Elements */}
    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl pointer-events-none"></div>
  </div>
);

export default TabsSection;

import { Athlete } from "./Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";

const TabsSection = ({ athlete }: { athlete: Athlete }) => (
  <div
    className="relative w-full min-h-screen overflow-hidden"
    style={{ fontFamily: "Times New Roman, serif" }}
  >
    {/* ✅ Foreground Content */}
    <div className="relative z-10">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList
          style={{ marginTop: "30px", marginBottom: "-10px",gap:"5%",paddingLeft:'5%' }}
          className="flex justify-start gap-8 bg-transparent text-white font-bold pl-6"
        >
          {[
            { value: "hero", label: "Hero" },
            { value: "about", label: "About" },
            { value: "titles", label: "Titles" },
            { value: "sponsors", label: "Sponsors" },
            { value: "content", label: "Content" },
          ].map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:border-b-4 data-[state=active]:bg-transparent"
              style={{
                fontSize: "30px",
                color: "white",
                fontFamily: "Times New Roman, serif",
              }}
            >
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

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

      {/* Decorative Blur Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl pointer-events-none"></div>
    </div>
  </div>
);

export default TabsSection;

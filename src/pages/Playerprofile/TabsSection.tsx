import { Athlete } from "./Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSection from "./AboutSection";
import TitleSection from "./TitleSection";
import SponsorSection from "./SponsorsSection";
import ContentSection from "./ContentSection";

const TabsSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="p-4 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="flex justify-center gap-4 mb-6 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl shadow-sm">
        <TabsTrigger
          value="about"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-4 py-2 rounded-lg font-medium transition-all"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="titles"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all"
        >
          Titles
        </TabsTrigger>
        <TabsTrigger
          value="sponsors"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 px-4 py-2 rounded-lg font-medium transition-all"
        >
          Sponsors
        </TabsTrigger>
        <TabsTrigger
          value="content"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 px-4 py-2 rounded-lg font-medium transition-all"
        >
          Related Content
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="animate-fadeIn">
        <AboutSection athlete={athlete} />
      </TabsContent>

      <TabsContent value="titles" className="animate-fadeIn">
        <TitleSection athlete={athlete} />
      </TabsContent>

      <TabsContent value="sponsors" className="animate-fadeIn">
        <SponsorSection athlete={athlete} />
      </TabsContent>

      <TabsContent value="content" className="animate-fadeIn">
        <ContentSection athlete={athlete} />
      </TabsContent>
    </Tabs>
  </div>
);

export default TabsSection;

import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Calendar, Star } from "lucide-react";

const sampleTitles = [
  { title: "US Open", year: "2018" },
  { title: "Wimbledon", year: "2019" },
  { title: "Australian Open", year: "2020" },
  { title: "French Open", year: "2021" },
  { title: "ATP Finals", year: "2022" },
  { title: "Indian Wells", year: "2023" },
  { title: "Miami Open", year: "2024" },
];

const TitlesSection = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
        <Trophy className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Titles Won
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Championship victories and achievements
        </p>
      </div>
    </div>

    {/* Summary Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="border-0 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="flex justify-center mb-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
            {sampleTitles.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Titles
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="flex justify-center mb-2">
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
            {Math.max(...sampleTitles.map((t) => parseInt(t.year)))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Latest Victory
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="flex justify-center mb-2">
            <Star className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            {new Date().getFullYear() -
              Math.min(...sampleTitles.map((t) => parseInt(t.year)))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Years Active
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Titles Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleTitles.map((title, index) => (
        <Card
          key={index}
          className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="relative">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8"></div>
                </div>

                <div className="relative flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg leading-tight mb-1">
                      {title.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/80" />
                      <span className="text-white/90 font-medium">
                        {title.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Championship Title
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default TitlesSection;

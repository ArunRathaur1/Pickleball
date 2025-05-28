import { Athlete } from "./Types";
import { Card, CardContent } from "@/components/ui/card";
import { PlaySquare, Eye, Clock } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const ContentSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="space-y-6 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
        <FaYoutube className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Related Content</h2>
        <p className="text-gray-600 dark:text-gray-400">Videos, interviews, and media coverage</p>
      </div>
    </div>

    {athlete.relatedContent.length > 0 ? (
      <>
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <PlaySquare className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-700 dark:text-red-400">
                {athlete.relatedContent.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Videos</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Eye className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">High</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Engagement</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">Recent</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Content Updates</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {athlete.relatedContent.map((content, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white dark:bg-gray-800"
            >
              <CardContent className="p-0">
                <a
                  href={content.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={content.imageUrl}
                      alt={content.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTM1IDcwTDE3NSA5MEwxMzUgMTEwVjcwWiIgZmlsbD0iIjlCOUJBMCIvPjwvc3ZnPg==';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-red-600 rounded-full p-4 shadow-lg">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                      {content.title}
                    </h3>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    ) : (
      <p className="text-gray-500">No related content available.</p>
    )}
  </div>
);

export default ContentSection;

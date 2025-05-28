import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Newspaper, ArrowRight, Eye } from "lucide-react";

const articles = [
  {
    title: "Player Dominates in Latest Championship Final",
    summary:
      "With a stunning display of athleticism, the player clinched the title and impressed spectators worldwide.",
    date: "May 12, 2025",
    image:
      "https://images.unsplash.com/photo-1601758123927-196d5f6c7f01?auto=format&fit=crop&w=800&q=80",
    category: "Championship",
    readTime: "3 min read",
  },
  {
    title: "Injury Recovery: Athlete's Comeback Story",
    summary:
      "After months on the sidelines, the player returns stronger and more determined than ever before.",
    date: "April 26, 2025",
    image:
      "https://images.unsplash.com/photo-1584467735871-1f13d1e1d447?auto=format&fit=crop&w=800&q=80",
    category: "Recovery",
    readTime: "5 min read",
  },
  {
    title: "Exclusive: Behind the Scenes with Top Coach",
    summary:
      "A deep dive into the training methods and strategy sessions that keep the athlete at the top.",
    date: "April 2, 2025",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    category: "Exclusive",
    readTime: "7 min read",
  },
];

const RecentArticles = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden transition-colors duration-500">
    

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full opacity-20 dark:opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover the most captivating sports stories, exclusive interviews,
            and behind-the-scenes content
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="group overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-green-400 dark:hover:border-green-500 transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-400/20">
                {/* Image with overlay */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg">
                      {article.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/40 to-transparent transition-opacity duration-500 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-black dark:text-white text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300 border-2 border-green-400">
                        <Eye className="w-4 h-4" />
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4 bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400 hover:border-green-500">
            <span className="flex items-center gap-2">
              Load More Stories
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentArticles;

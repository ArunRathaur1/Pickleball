import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function PickleballInsights() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white text-black py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-lg font-semibold text-green-600 uppercase tracking-wider">
            Insights • Tips • Gear Reviews • Breaking News
          </h1>
          <h2 className="text-4xl font-bold mt-4 text-gray-900">
            Your Go-To Source for Everything Pickleball
          </h2>
          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            Stay ahead with expert advice, in-depth reviews, and the latest
            updates from the fastest-growing sport in the world—designed for
            players of all levels.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300"
          >
            Explore Articles
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

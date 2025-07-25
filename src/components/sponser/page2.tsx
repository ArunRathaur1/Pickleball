import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function PickleballCommunity() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      id="container04"
      className="flex flex-col items-center justify-center h-[40vh] bg-white text-gray-900 py-16 px-6"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-3xl text-center"
        initial={{ x: -50, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-lg font-semibold text-gray-600">
          THE LEADING VOICE IN PICKLEBALL
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
          10K+ ACTIVE FANS & ENTHUSIASTS
        </h2>
        <p className="text-lg text-gray-700 mt-4 leading-relaxed">
          Passionate competitors? Check. Weekend warriors? Absolutely. Industry
          leaders? We have them too. Connect with the most vibrant community in
          the fastest-growing sport worldwide.
        </p>
      </motion.div>
    </motion.div>
  );
}

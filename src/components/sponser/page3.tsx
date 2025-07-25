import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../images/sp1.svg";
import hero2 from "../../images/sp2.webp";
import hero3 from "../../images/sp3.png";
import hero4 from "../../images/sp4.png";
import hero5 from "../../images/sp5.jpg";
import hero6 from "../../images/sp6.webp";
import hero7 from "../../images/sp7.png";

export default function TrustedBrands() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin: "0px", threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const brands = [
    {
      src: hero1,
      alt: "sixzeropickleball",
      link: "https://www.sixzeropickleball.com/",
    },
    { src: hero2, alt: "Globalsports", link: "https://globalsports.net.in/" },
    {
      src: hero3,
      alt: "Itsgoa",
      link: "https://itsgoa.com/aguada-pickleball-arena",
    },
    { src: hero4, alt: "Duper", link: "https://www.dupr.com/" },
    {
      src: hero6,
      alt: "MaxWill",
      link: "https://www.maxwillsports.com/",
    },
    { src: hero7, alt: "Pickleball", link: "https://pickleball.in/" },
  ];

  return (
    <div
      className="bg-black text-white py-20 px-4 min-h-screen flex flex-col items-center"
      ref={containerRef}
    >
      <motion.h2
        className="text-5xl font-extrabold mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        Trusted by Top Brands
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center"
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <a
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="w-[160px] h-[80px] object-contain"
              />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

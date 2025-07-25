"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GallerySection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin: "-100px", threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const images = [
    {
      src: "/Partner with The Dink_files/66f87bbd.jpg",
      alt: "We've live-streamed the Major League Pickleball draft",
    },
    {
      src: "/Partner with The Dink_files/7b8e8c6e.jpg",
      alt: "We've given away a pickleball facility with Katy Perry",
    },
    {
      src: "/Partner with The Dink_files/e95ea067.jpg",
      alt: "We've crashed NBC news",
    },
  ];

  return (
    <div id="gallery06" className="w-full bg-black py-12 flex justify-center">
      <div className="max-w-6xl w-full px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg bg-gray-900 border border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;

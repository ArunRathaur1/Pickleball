"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
const API = import.meta.env.VITE_API; // Use the environment variable for API URL
const CampaignForm: React.FC = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Custom inView hook using IntersectionObserver
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShake(true);
    setTimeout(() => setShake(false), 500);

    const form = e.currentTarget;
    const formData = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch(
        `${API}/inquary/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Form submitted successfully!");
        form.reset();
      } else {
        setStatus("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Error submitting form.");
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div
      id="container02"
      className="w-full bg-white py-12 flex justify-center transition-all duration-500"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full px-6"
      >
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-600">
            Let's hit your campaign goals
          </p>
          <motion.h2
            className="text-3xl font-bold text-gray-900"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            What We Offer
          </motion.h2>
          <p className="text-gray-500 mt-2">
            Product Launches, Brand Awareness, Events, Livestreams, Giveaways,
            Travel & Getaways, PR & Announcements, B2B Lead Generation, Custom
            Paddles
          </p>
        </div>

        {/* Form */}
        <motion.form
          id="form01"
          method="post"
          onSubmit={handleSubmit}
          className={`bg-white shadow-lg rounded-lg p-6 transition-all ${
            shake ? "animate-shake" : ""
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.input
              type="text"
              name="name"
              placeholder="Name"
              maxLength={128}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="text"
              name="company"
              placeholder="Company Name"
              maxLength={128}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              maxLength={128}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          <motion.textarea
            name="message"
            placeholder="Message"
            maxLength={16384}
            required
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            whileFocus={{ scale: 1.02 }}
          ></motion.textarea>

          {status && (
            <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
          )}

          <div className="mt-6 flex justify-center">
            <motion.button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Send Request</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          <input type="hidden" name="id" value="form01" />
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CampaignForm;

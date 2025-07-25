import { useState } from "react";
import { FaLinkedin, FaEnvelope, FaTwitter, FaGithub,FaInstagram } from "react-icons/fa";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ContactForm from "./Contactform";
import TeamMemberCard from "./TeamMembercard";
import indreshverma from '../../images/indreshverma.jpg'
import arunrathaur from '../../images/arunrathaur.jpg';
import shrey from '../../images/shrey.jpg';
const teamMembers = {
  founders: [
    {
      name: "Samarth Mishra",
      role: "CEO & Founder",
      bio: "International Pickleball Player.",
      image: "/images/founder1.jpg", // replace with actual image path
      // linkedin: "https://www.linkedin.com/in/founder1",
      // twitter: "https://twitter.com/founder1",
      // email: "founder1@example.com",
    },
    {
      name: "Shrey Mishra",
      role: "COO & Founder",
      bio: "International Pickleball Player.",
      image: shrey, // replace with actual image path
      // linkedin: "https://www.linkedin.com/in/shreysuryamishra/",
      // instagram: "https://www.instagram.com/shreysuryamishra/",
      // email: "founder2@example.com",
    },
  ],
  developers: [
    {
      name: "Arun Rathaur",
      role: "Software Developer",
      bio: "CSE-2027 NIT-Raipur",
      image: arunrathaur, // replace with actual image path
      linkedin: "https://www.linkedin.com/in/arun-rathaur-5995651b7/",
      github: "https://github.com/ArunRathaur1",
      email: "arunrathaur92.6@gmail.com",
    },
    {
      name: "Indresh Verma",
      role: "Software Developer",
      bio: "CSE-2027 NIT-Raipur",
      image: indreshverma, // replace with actual image path
      linkedin: "https://www.linkedin.com/in/indreshverma04/",
      github: "https://github.com/indreshverma2004",
      email: "indreshkverma2004@gmail.com",
    },
  ],
};




const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("founders");

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      {/* Team Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab("founders")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === "founders"
                ? "bg-green-600 text-white shadow-md transform scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Founders
          </button>
          <button
            onClick={() => setActiveTab("developers")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === "developers"
                ? "bg-green-600 text-white shadow-md transform scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Team Members
          </button>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeTab === "founders" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
              Our Founders
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
              {teamMembers.founders.map((founder, index) => (
                <TeamMemberCard key={index} member={founder} isFounder={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "developers" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
              Our Development Team
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
              {teamMembers.developers.map((dev, index) => (
                <TeamMemberCard key={index} member={dev} isFounder={false} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-purple-700 mb-6">
                  Our Office
                </h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Address:</h4>
                  <p className="text-gray-600">
                    123 Innovation Street, Tech City, TC 12345
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Phone:</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Email:</h4>
                  <p className="text-gray-600">info@yourcompany.com</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Follow Us:
                  </h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                      <FaTwitter className="text-2xl" />
                    </a>
                    <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
                      <FaGithub className="text-2xl" />
                    </a>
                    <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>

                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        )}
      </div>

      <Footer />

    </div>
  );
};

export default ContactPage;

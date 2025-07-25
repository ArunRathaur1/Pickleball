import React, { useState } from "react";
import SignupBrand from "@/components/Signup/SignupBrand";
import SignupPlayer from "@/components/Signup/SingupPlayer";
import { Navbar } from "@/components/layout/navbar";
export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<"Player" | "Brand">(
    "Player"
  );

  return (
    <>
        <Navbar></Navbar>
      <div className="min-h-screen  py-10 px-4">
        <div className="max-w-2xl mx-auto  p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>

          {/* Selection Buttons */}
          <div className="flex justify-center "style={{ gap: "1rem", marginBottom: "2rem" }}>
            <button
              onClick={() => setSelectedType("Player")}
              className={`px-4 py-2 rounded-md font-semibold ${
                selectedType === "Player"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Player
            </button>
            <button
              onClick={() => setSelectedType("Brand")}
              className={`px-4 py-2 rounded-md font-semibold ${
                selectedType === "Brand"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Brand
            </button>
          </div>

          {/* Conditional Form */}
          {selectedType === "Player" ? <SignupPlayer /> : <SignupBrand />}
        </div>
      </div>
    </>
  );
}

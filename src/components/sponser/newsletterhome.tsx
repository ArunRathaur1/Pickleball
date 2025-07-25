import React, { useState } from "react";
const API = import.meta.env.VITE_API;

export default function Newsletter({ onClose }) {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidEmail = email.trim() !== "" && validateEmail(email);
  const showError = touched && !isValidEmail && email.trim() !== "";

  const handleSubscribe = async () => {
    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
        setEmail("");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg p-6 rounded-lg w-80 border-2 border-green-500 dark:border-green-600 z-50">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full text-sm font-bold hover:bg-red-600 dark:hover:bg-red-400 shadow-md flex items-center justify-center w-6 h-6"
        aria-label="Close newsletter"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-2">Stay Updated</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Subscribe to our newsletter
      </p>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full p-3 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
            showError
              ? "border-red-400 dark:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none`}
        />
        {showError && (
          <p className="text-red-500 text-xs mt-1">Invalid email format</p>
        )}
      </div>

      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-2.5 rounded-md transition duration-300 disabled:opacity-50"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>

      {response && (
        <p className="text-green-600 dark:text-green-400 text-sm mt-3 font-medium">
          {response.message}
        </p>
      )}
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-3">{error}</p>
      )}
    </div>
  );
}

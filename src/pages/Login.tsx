import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    userType: "Player",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.userType === "Player") {
        const response = await axios.post(`${API}/playerlogin/login`, {
          DUPRID: formData.id,
          password: formData.password,
        });

        const data = response.data;
        localStorage.setItem("player", JSON.stringify(data));
        navigate("/playerdashboard");
      } else {
        const response = await axios.post(`${API}/brand/login`, {
          email: formData.id,
          password: formData.password,
        });

        const data = response.data;
        localStorage.setItem("brand", JSON.stringify(data));
        navigate("/branddashboard");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Login failed! Please try again.";
      alert(message);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-all">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md transition-all">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                {formData.userType === "Player" ? "DUPR ID" : "Brand ID"}
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={
                  formData.userType === "Player" ? "Enter DUPR ID" : "Enter email id"
                }
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="userType" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Select User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Player">Player</option>
                <option value="Brand">Brand</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

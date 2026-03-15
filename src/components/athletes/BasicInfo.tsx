import React from "react";
import CloudinaryImageUploader from "../admin-club/imageupload";
import { Info } from "lucide-react";

export default function BasicInfo({ formData, handleChange, formErrors }) {
  const handleImageUpload = (imageUrl: string) => {
    handleChange({
      target: {
        name: "playerlogoimage",
        value: imageUrl,
      },
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Info size={18} />
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
                formErrors.fullName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Short Address */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Short Address</label>
            <input
              type="text"
              name="shortAddress"
              value={formData.shortAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* DUPR ID SINGLES */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">DUPR ID (Singles)</label>
            <input
              type="text"
              readOnly
              name="ratings.singles"
              value={formData.ratings.singles}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* DUPR ID DOUBLES */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">DUPR ID (Doubles)</label>
            <input
              type="text"
              name="ratings.doubles"
              readOnly
              value={formData.ratings.doubles}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="10"
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                formErrors.age ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formErrors.age && (
              <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
                formErrors.gender ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height in cm"
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                formErrors.height ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formErrors.height && (
              <p className="text-red-500 text-xs mt-1">{formErrors.height}</p>
            )}
          </div>

          {/* Player Logo Image */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Player Logo Image
            </label>
            <CloudinaryImageUploader onUploadSuccess={handleImageUpload} />
            {formData.playerlogoimage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current image:</p>
                <img
                  src={formData.playerlogoimage}
                  alt="Player logo preview"
                  className="w-20 h-20 object-cover rounded-md border dark:border-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Brief description about the athlete..."
            rows={4}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

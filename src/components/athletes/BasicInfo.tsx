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
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
          <Info size={18} />
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className={`w-full p-2 border rounded-md ${
                formErrors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          {/* Short Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Address
            </label>
            <input
              type="text"
              name="shortAddress"
              value={formData.shortAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          {/* DUPR ID SINGLES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              DUPR ID (Singles)
            </label>
            <input
              type="text"
              readOnly
              name="ratings.singles"
              value={formData.ratings.singles}
              onChange={handleChange}
            />
          </div>

          {/* DUPR ID DOUBLES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              DUPR ID (Doubles)
            </label>
            <input
              type="text"
              name="ratings.doubles"
             readOnly
              value={formData.ratings.doubles}
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="10"
              className={`w-full p-2 border rounded-md ${
                formErrors.age ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.age && (
              <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                formErrors.gender ? "border-red-500" : "border-gray-300"
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
            <label className="block text-sm font-medium mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height in cm"
              className={`w-full p-2 border rounded-md ${
                formErrors.height ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.height && (
              <p className="text-red-500 text-xs mt-1">{formErrors.height}</p>
            )}
          </div>

          {/* Player Logo Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Player Logo Image
            </label>
            <CloudinaryImageUploader onUploadSuccess={handleImageUpload} />
            {formData.playerlogoimage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Current image:</p>
                <img
                  src={formData.playerlogoimage}
                  alt="Player logo preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Brief description about the athlete..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

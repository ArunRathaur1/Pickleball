import React from "react";
import CloudinaryImageUploader from "../admin-club/imageupload";
import {
  Info,
  Trash2,
  Plus,
  Award,
  Users,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

export default function BasicInfo(props) {
  const { formData, handleChange, formErrors } = props;

  // Handle Cloudinary upload success
  const handleImageUpload = (imageUrl) => {
    // Create a synthetic event to match the existing handleChange function
    const syntheticEvent = {
      target: {
        name: "playerlogoimage",
        value: imageUrl,
      },
    };
    handleChange(syntheticEvent);
  };

  return (
    <div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
          <Info size={18} />
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Athlete's full name"
              className={`w-full p-2 border rounded-md ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              DUPRID DOUBLES
            </label>
            <input
              type="text"
              name="DUPRIDDOUBLES"
              value={formData.DUPRIDDOUBLES}
              onChange={handleChange}
              placeholder="Unique athlete ID "
              className={`w-full p-2 border rounded-md ${
                formErrors.DUPRIDDOUBLES ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.DUPRIDDOUBLES && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.DUPRIDDOUBLES}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              DUPRID SINGLES
            </label>
            <input
              type="text"
              name="DUPRIDSINGLES"
              value={formData.DUPRIDSINGLES}
              onChange={handleChange}
              placeholder="Unique athlete ID "
              className={`w-full p-2 border rounded-md ${
                formErrors.DUPRIDSINGLES ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.DUPRIDSINGLES && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.DUPRIDSINGLES}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age (minimum 10)"
              min="10"
              className={`w-full p-2 border rounded-md ${
                formErrors.age ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.age && (
              <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
            )}
          </div>

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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className={`w-full p-2 border rounded-md ${
                formErrors.country ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.country && (
              <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
            )}
          </div>

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
              min="0"
              step="any"
              className={`w-full p-2 border rounded-md ${
                formErrors.height ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.height && (
              <p className="text-red-500 text-xs mt-1">{formErrors.height}</p>
            )}
          </div>

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

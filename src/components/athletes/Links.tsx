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

export default function Links(props) {
  const {
    formData,
    handleChange,
    handleImageUrlChange,
    removeImageUrl,
    formErrors,
    addImageUrl,
  } = props;

  // Handle Cloudinary upload success for specific image index
  const handleImageUpload = (index, imageUrl) => {
    handleImageUrlChange(index, imageUrl);
  };

  return (
    <div>
      <div className="space-y-4 pt-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
          <Users size={18} />
          Social Media
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Instagram Page
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                <Instagram size={18} className="text-pink-500" />
              </span>
              <input
                type="text"
                name="instagramPage"
                value={formData.instagramPage}
                onChange={handleChange}
                placeholder="https://www.instagram.com/username"
                className="w-full p-2 border border-gray-300 rounded-r-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              YouTube Handle
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                <Youtube size={18} className="text-red-500" />
              </span>
              <input
                type="text"
                name="youtubeHandle"
                value={formData.youtubeHandle}
                onChange={handleChange}
                placeholder="https://www.youtube.com/@username"
                className="w-full p-2 border border-gray-300 rounded-r-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Twitter Handle
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                <Twitter size={18} className="text-blue-400" />
              </span>
              <input
                type="text"
                name="twitterHandle"
                value={formData.twitterHandle}
                onChange={handleChange}
                placeholder="https://www.twitter.com/username"
                className="w-full p-2 border border-gray-300 rounded-r-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image URLs Section */}
      <div className="space-y-4 pt-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
          <Info size={18} />
          Athlete Images
        </h3>

        {formData.imageUrl.map((url, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">Image #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeImageUrl(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Image
                </label>
                <CloudinaryImageUploader
                  onUploadSuccess={(imageUrl) =>
                    handleImageUpload(index, imageUrl)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Or Enter Image URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="Image URL"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {url && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={url}
                    alt={`Athlete image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {formErrors.imageUrl && (
          <p className="text-red-500 text-sm">{formErrors.imageUrl}</p>
        )}

        <button
          type="button"
          onClick={addImageUrl}
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-md border border-blue-200"
        >
          <Plus size={16} />
          Add Image URL
        </button>
      </div>
    </div>
  );
}

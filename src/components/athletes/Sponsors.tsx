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

export default function Sponsors(props) {
  const { formData, removeField, handleNestedChange, formErrors, addField } = props;

  const handleImageUpload = (index, imageUrl) => {
    handleNestedChange(index, "imageUrl", imageUrl, "sponsors");
  };

  return (
    <div>
      {/* Sponsors Section */}
      <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400 pt-2">
          <Users size={18} />
          Sponsors
        </h3>

        {formData.sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                Sponsor #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeField(index, "sponsors")}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Sponsor Name
                </label>
                <input
                  type="text"
                  value={sponsor.name}
                  onChange={(e) =>
                    handleNestedChange(index, "name", e.target.value, "sponsors")
                  }
                  placeholder="Sponsor name"
                  className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
                    formErrors[`sponsor_${index}_name`]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {formErrors[`sponsor_${index}_name`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`sponsor_${index}_name`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Sponsor Logo
                </label>
                <div className="space-y-2">
                  <CloudinaryImageUploader
                    onUploadSuccess={(imageUrl) => handleImageUpload(index, imageUrl)}
                  />
                  <input
                    type="text"
                    value={sponsor.imageUrl}
                    onChange={(e) =>
                      handleNestedChange(index, "imageUrl", e.target.value, "sponsors")
                    }
                    placeholder="Or enter logo URL manually"
                    className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
                      formErrors[`sponsor_${index}_image`]
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {formErrors[`sponsor_${index}_image`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors[`sponsor_${index}_image`]}
                    </p>
                  )}
                  {sponsor.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={sponsor.imageUrl}
                        alt="Sponsor logo preview"
                        className="h-16 w-auto object-contain border rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addField("sponsors", { name: "", imageUrl: "" })}
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2 rounded-md border border-blue-200 dark:border-blue-600"
        >
          <Plus size={16} />
          Add Sponsor
        </button>
      </div>

      {/* Titles Won Section */}
      <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400 pt-2">
          <Award size={18} />
          Titles Won
        </h3>

        {formData.titlesWon.map((title, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                Title #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeField(index, "titlesWon")}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Title Name
                </label>
                <input
                  type="text"
                  value={title.title}
                  onChange={(e) =>
                    handleNestedChange(index, "title", e.target.value, "titlesWon")
                  }
                  placeholder="Championship name"
                  className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
                    formErrors[`title_${index}_name`]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {formErrors[`title_${index}_name`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`title_${index}_name`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Year
                </label>
                <input
                  type="number"
                  value={title.year}
                  onChange={(e) =>
                    handleNestedChange(index, "year", e.target.value, "titlesWon")
                  }
                  placeholder="Year won"
                  min="1900"
                  max="2025"
                  className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border ${
                    formErrors[`title_${index}_year`]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {formErrors[`title_${index}_year`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`title_${index}_year`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Position
                </label>
                <select
                  value={title.positon}
                  onChange={(e) =>
                    handleNestedChange(index, "positon", e.target.value, "titlesWon")
                  }
                  className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border ${
                    formErrors[`title_${index}_positon`]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select position</option>
                  <option value="Gold">Gold 🥇</option>
                  <option value="Silver">Silver 🥈</option>
                  <option value="Bronze">Bronze 🥉</option>
                </select>
                {formErrors[`title_${index}_positon`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`title_${index}_positon`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Venue
                </label>
                <input
                  type="text"
                  value={title.venue}
                  onChange={(e) =>
                    handleNestedChange(index, "venue", e.target.value, "titlesWon")
                  }
                  placeholder="Venue"
                  className={`w-full p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border ${
                    formErrors[`title_${index}_venue`]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {formErrors[`title_${index}_venue`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`title_${index}_venue`]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addField("titlesWon", {
              title: "",
              year: "",
              venue: "",
              positon: "",
            })
          }
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2 rounded-md border border-blue-200 dark:border-blue-600"
        >
          <Plus size={16} />
          Add Title
        </button>
      </div>
    </div>
  );
}

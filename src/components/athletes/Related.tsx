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

export default function Related(props) {
  const {
    formData,
    removeField,
    handleNestedChange,
    formErrors,
    addField,
    submitMessage,
    isSubmitting,
  } = props;

  const handleImageUpload = (index, imageUrl) => {
    handleNestedChange(index, "imageUrl", imageUrl, "relatedContent");
  };

  return (
    <div>
      <div className="space-y-4 pt-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
          <Youtube size={18} />
          Related Content
        </h3>

        {formData.relatedContent.map((content, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">Content #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeField(index, "relatedContent")}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      "title",
                      e.target.value,
                      "relatedContent"
                    )
                  }
                  placeholder="Content title"
                  className={`w-full p-2 border rounded-md ${
                    formErrors[`content_${index}_title`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formErrors[`content_${index}_title`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`content_${index}_title`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  YouTube Link
                </label>
                <input
                  type="text"
                  value={content.youtubeLink}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      "youtubeLink",
                      e.target.value,
                      "relatedContent"
                    )
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`w-full p-2 border rounded-md ${
                    formErrors[`content_${index}_link`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formErrors[`content_${index}_link`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[`content_${index}_link`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Thumbnail
                </label>
                <div className="space-y-2">
                  <CloudinaryImageUploader
                    onUploadSuccess={(imageUrl) =>
                      handleImageUpload(index, imageUrl)
                    }
                  />
                  <input
                    type="text"
                    value={content.imageUrl}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        "imageUrl",
                        e.target.value,
                        "relatedContent"
                      )
                    }
                    placeholder="Or enter thumbnail URL manually"
                    className={`w-full p-2 border rounded-md ${
                      formErrors[`content_${index}_image`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors[`content_${index}_image`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors[`content_${index}_image`]}
                    </p>
                  )}
                  {content.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={content.imageUrl}
                        alt="Thumbnail preview"
                        className="h-20 w-auto object-cover border rounded"
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
          onClick={() =>
            addField("relatedContent", {
              imageUrl: "",
              title: "",
              youtubeLink: "",
            })
          }
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-md border border-blue-200"
        >
          <Plus size={16} />
          Add Related Content
        </button>
      </div>

      {/* Form feedback */}
      {submitMessage.message && (
        <div
          className={`p-3 rounded ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitMessage.message}
        </div>
      )}

      {/* Submit button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-1/3 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:bg-blue-400"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

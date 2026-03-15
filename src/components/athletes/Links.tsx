import React from "react";
import CloudinaryImageUploader from "../admin-club/imageupload";
import {
  Info,
  Trash2,
  Plus,
  Users,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

interface LinksProps {
  formData: {
    instagramPage: string;
    youtubeHandle: string;
    twitterHandle: string;
    imageUrlGallery: {
      image: string;
      text: string;
    }[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUrlChange: (
    index: number,
    value: { image: string; text: string }
  ) => void;
  removeImageUrl: (index: number) => void;
  formErrors: Record<string, string>;
  addImageUrl: () => void;
}

export default function Links(props: LinksProps) {
  const {
    formData,
    handleChange,
    handleImageUrlChange,
    removeImageUrl,
    formErrors,
    addImageUrl,
  } = props;

  const handleImageUpload = (index: number, uploadedUrl: string) => {
    const updated = { ...formData.imageUrlGallery[index], image: uploadedUrl };
    handleImageUrlChange(index, updated);
  };

  const handleManualImageUrlInput = (index: number, url: string) => {
    const updated = { ...formData.imageUrlGallery[index], image: url };
    handleImageUrlChange(index, updated);
  };

  const handleImageTextChange = (index: number, text: string) => {
    const updated = { ...formData.imageUrlGallery[index], text };
    handleImageUrlChange(index, updated);
  };

  return (
    <div>
      {/* Social Media */}
      <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400 pt-2">
          <Users size={18} />
          Social Media
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {["instagramPage", "youtubeHandle", "twitterHandle"].map((field) => {
            const labelMap: Record<string, string> = {
              instagramPage: "Instagram Page",
              youtubeHandle: "YouTube Handle",
              twitterHandle: "Twitter Handle",
            };

            const iconMap: Record<string, React.ReactNode> = {
              instagramPage: <Instagram size={18} className="text-pink-500" />,
              youtubeHandle: <Youtube size={18} className="text-red-500" />,
              twitterHandle: <Twitter size={18} className="text-blue-400" />,
            };

            return (
              <div key={field}>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {labelMap[field]}
                </label>
                <div className="flex items-center">
                  <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600">
                    {iconMap[field]}
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={formData[field as keyof typeof formData] as string}
                    onChange={handleChange}
                    placeholder={`https://www.${
                      field.includes("youtube")
                        ? "youtube.com/@"
                        : field.includes("twitter")
                        ? "twitter.com/"
                        : "instagram.com/"
                    }username`}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-r-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Athlete Images */}
      <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400 pt-2">
          <Info size={18} />
          Athlete Images
        </h3>

        {formData.imageUrlGallery.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Image #{index + 1}
              </h4>
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
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Upload Image
                </label>
                <CloudinaryImageUploader
                  onUploadSuccess={(url: string) => handleImageUpload(index, url)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Or Enter Image URL
                </label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => handleManualImageUrlInput(index, e.target.value)}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600"
                />
                {formErrors[`imageUrlGallery_${index}_text`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[`imageUrlGallery_${index}_text`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleImageTextChange(index, e.target.value)}
                  placeholder="Enter description"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600"
                />
              </div>

              {item.image && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <img
                    src={item.image}
                    alt={`Athlete image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {formErrors.imageUrlGallery && (
          <p className="text-red-500 text-sm">{formErrors.imageUrlGallery}</p>
        )}

        <button
          type="button"
          onClick={addImageUrl}
          className="w-full py-2 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2 rounded-md border border-blue-200 dark:border-blue-700"
        >
          <Plus size={16} />
          Add Image URL
        </button>
      </div>
    </div>
  );
}

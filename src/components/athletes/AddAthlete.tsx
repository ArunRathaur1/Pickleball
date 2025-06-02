import React, { useState, ChangeEvent, FormEvent } from "react";
import CloudinaryImageUploader from "../admin-club/imageupload";
import { useParams } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import Links from "./Links";
import Sponsors from "./Sponsors";
import Related from "./Related";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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

interface AthleteFormData {
  name: string;
  playerlogoimage: string;
  playerid: string;
  age: string;
  gender: string;
  country: string;
  height: string;
  DUPRIDSINGLES: string;
  DUPRIDDOUBLES: string;
  identifier: string;
  sponsors: { name: string; imageUrl: string }[];
  instagramPage: string;
  youtubeHandle: string;
  twitterHandle: string;
  about: string;
  titlesWon: { title: string; year: string }[];
  relatedContent: { imageUrl: string; title: string; youtubeLink: string }[];
  imageUrl: {
    image: string;
    text: string;
  }[];
}

export default function AddAthlete() {
  const [formData, setFormData] = useState<AthleteFormData>({
    name: "",
    playerlogoimage: "",
    playerid: "",
    age: "",
    gender: "",
    country: "",
    height: "",
    DUPRIDSINGLES: "",
    DUPRIDDOUBLES: "",
    identifier: "",
    sponsors: [{ name: "", imageUrl: "" }],
    instagramPage: "",
    youtubeHandle: "",
    twitterHandle: "",
    about: "",
    titlesWon: [{ title: "", year: "" }],
    relatedContent: [{ imageUrl: "", title: "", youtubeLink: "" }],
    imageUrl: [{ image: "", text: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get ID from route params
  useEffect(() => {
    const fetchAthlete = async () => {
      let playerId = id;

      if (!playerId) {
        const cookieData = Cookies.get("player");
        if (cookieData) {
          try {
            const player = JSON.parse(cookieData);
            playerId = player?.player?._id;
          } catch (e) {
            console.error("Error parsing cookie data:", e);
          }
        }
      }

      // If no ID is found anywhere, set loading to false and return
      if (!playerId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/athletes/loginid/${playerId}`
        );

        const athleteData = response.data;
        console.log(athleteData);

        setFormData({
          name: athleteData.name || "",
          playerlogoimage: athleteData.playerlogoimage || "",
          playerid: athleteData.playerid || "",
          age: athleteData.age ? athleteData.age.toString() : "",
          gender: athleteData.gender || "",
          country: athleteData.country || "",
          height: athleteData.height ? athleteData.height.toString() : "",
          DUPRIDSINGLES: athleteData.DUPRIDSINGLES || "",
          DUPRIDDOUBLES: athleteData.DUPRIDDOUBLES || "",
          identifier: athleteData.identifier || playerId,
          sponsors:
            athleteData.sponsors?.length > 0
              ? athleteData.sponsors.map((sponsor) => ({
                  name: sponsor.name || "",
                  imageUrl: sponsor.imageUrl || "",
                }))
              : [{ name: "", imageUrl: "" }],
          instagramPage: athleteData.instagramPage || "",
          youtubeHandle: athleteData.youtubeHandle || "",
          twitterHandle: athleteData.twitterHandle || "",
          about: athleteData.about || "",
          titlesWon:
            athleteData.titlesWon?.length > 0
              ? athleteData.titlesWon.map((title) => ({
                  title: title.title || "",
                  year: title.year?.toString() || "",
                }))
              : [{ title: "", year: "" }],
          relatedContent:
            athleteData.relatedContent?.length > 0
              ? athleteData.relatedContent.map((content) => ({
                  imageUrl: content.imageUrl || "",
                  title: content.title || "",
                  youtubeLink: content.youtubeLink || "",
                }))
              : [{ imageUrl: "", title: "", youtubeLink: "" }],
          imageUrl:
            athleteData.imageUrl?.length > 0
              ? athleteData.imageUrl.map((item) => ({
                  image: item.image || item || "",
                  text: item.text || "",
                }))
              : [{ image: "", text: "" }],
        });
      } catch (err) {
        console.error("Error fetching athlete data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthlete();
  }, []);
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.playerid.trim()) errors.playerid = "Player ID is required";
    if (!formData.age) errors.age = "Age is required";
    if (Number(formData.age) < 10) errors.age = "Age must be at least 10";
    if (!formData.gender) errors.gender = "Gender selection is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.height) errors.height = "Height is required";
    if (!formData.DUPRIDSINGLES.trim())
      errors.DUPRIDSINGLES = "DUPRID SINGLES is required";
    if (!formData.DUPRIDDOUBLES.trim())
      errors.DUPRIDDOUBLES = "DUPRID DOUBLES is required";
    // Validate at least one image URL with image field filled
    const validImageUrls = formData.imageUrl.filter((item) =>
      item.image.trim()
    );
    if (validImageUrls.length === 0)
      errors.imageUrl = "At least one image URL is required";

    // Validate individual image entries
    formData.imageUrl.forEach((item, idx) => {
      if (item.image.trim() && !item.text.trim()) {
        errors[`imageUrl_${idx}_text`] =
          "Text description is required when image is provided";
      }
    });

    // Validate sponsors
    formData.sponsors.forEach((sponsor, idx) => {
      if (!sponsor.name.trim())
        errors[`sponsor_${idx}_name`] = "Sponsor name is required";
      if (!sponsor.imageUrl.trim())
        errors[`sponsor_${idx}_image`] = "Sponsor image URL is required";
    });

    // Validate titles
    formData.titlesWon.forEach((title, idx) => {
      if (!title.title.trim())
        errors[`title_${idx}_name`] = "Title name is required";
      if (!title.year) errors[`title_${idx}_year`] = "Year is required";
    });

    // Validate related content
    formData.relatedContent.forEach((content, idx) => {
      if (!content.imageUrl.trim())
        errors[`content_${idx}_image`] = "Content image URL is required";
      if (!content.title.trim())
        errors[`content_${idx}_title`] = "Content title is required";
      if (!content.youtubeLink.trim())
        errors[`content_${idx}_link`] = "YouTube link is required";
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleNestedChange = (
    index: number,
    field: string,
    value: string,
    key: keyof Pick<
      AthleteFormData,
      "sponsors" | "titlesWon" | "relatedContent"
    >
  ) => {
    const updatedArray = [...formData[key]] as any[];
    updatedArray[index][field] = value;
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));

    // Clear error for this field if it exists
    const errorKey = `${key
      .replace("Won", "")
      .replace("Content", "")}_${index}_${
      field === "imageUrl"
        ? "image"
        : field === "title" && key === "titlesWon"
        ? "name"
        : field === "youtubeLink"
        ? "link"
        : field
    }`;
    if (formErrors[errorKey]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[errorKey];
        return updated;
      });
    }
  };

  const handleImageUrlChange = (
    index: number,
    value: { image: string; text: string }
  ) => {
    const updatedArray = [...formData.imageUrl];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, imageUrl: updatedArray }));

    // Clear error if exists
    if (formErrors.imageUrl) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.imageUrl;
        return updated;
      });
    }
  };

  const addField = (
    key: keyof Pick<
      AthleteFormData,
      "sponsors" | "titlesWon" | "relatedContent"
    >,
    newItem: any
  ) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));
  };

  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: [...prev.imageUrl, { image: "", text: "" }],
    }));
  };

  const removeField = (
    index: number,
    key: keyof Pick<
      AthleteFormData,
      "sponsors" | "titlesWon" | "relatedContent"
    >
  ) => {
    if (formData[key].length <= 1) {
      return; // Keep at least one item
    }
    const updatedArray = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const removeImageUrl = (index: number) => {
    if (formData.imageUrl.length <= 1) {
      return; // Ensure at least one entry remains
    }

    const updatedArray = formData.imageUrl.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, imageUrl: updatedArray }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitMessage({
        type: "error",
        message: "Please fix the errors in the form",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", message: "" });

    try {
      // Filter out empty image URLs (only keep entries with image field filled)
      const filteredImageUrls = formData.imageUrl.filter((item) =>
        item.image.trim()
      );

      // Prepare data for submission
      const submitData = {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        titlesWon: formData.titlesWon.map((t) => ({
          title: t.title,
          year: Number(t.year),
        })),
        imageUrl: filteredImageUrls,
      };
      console.log("data", formData);
      // For actual API call (you might want to use PUT for updates):
      await axios.post("http://localhost:5000/athletes", submitData);

      setSubmitMessage({
        type: "success",
        message: "Athlete updated successfully!",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Failed to update athlete. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">
              Loading Athlete Data...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800">
            Edit Athlete Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <BasicInfo
              formData={formData}
              handleChange={handleChange}
              formErrors={formErrors}
            />

            {/* Social Media Handles */}
            <Links
              formData={formData}
              handleChange={handleChange}
              handleImageUrlChange={handleImageUrlChange}
              removeImageUrl={removeImageUrl}
              formErrors={formErrors}
              addImageUrl={addImageUrl}
            />

            {/* Sponsors Section */}
            <Sponsors
              formData={formData}
              removeField={removeField}
              handleNestedChange={handleNestedChange}
              formErrors={formErrors}
              addField={addField}
            />

            {/* Related Content Section */}
            <Related
              formData={formData}
              removeField={removeField}
              handleNestedChange={handleNestedChange}
              formErrors={formErrors}
              addField={addField}
              submitMessage={submitMessage}
              isSubmitting={isSubmitting}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

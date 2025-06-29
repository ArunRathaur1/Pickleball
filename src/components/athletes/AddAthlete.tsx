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
  Cookie,
} from "lucide-react";

interface RatingData {
  singles: string;
  singlesVerified: string;
  singlesProvisional: boolean;
  singlesReliabilityScore: number;
  doubles: string;
  doublesVerified: string;
  doublesProvisional: boolean;
  doublesReliabilityScore: number;
  defaultRating: string;
  provisionalRatings: {
    singlesRating: number | null;
    doublesRating: number | null;
    coach: string | null;
  };
}

interface AthleteFormData {
  id?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  shortAddress: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: string;
  height: string;
  playerlogoimage: string;
  playerid: string;
  imageUrl: string;
  ratings: RatingData;

  enablePrivacy: boolean;
  isPlayer1: boolean;
  verifiedEmail: boolean;
  registered: boolean;

  duprId: string;

  showRatingBanner: boolean;
  status: string;

  sponsor: Record<string, any>;
  sponsors: { name: string; imageUrl: string }[];

  lucraConnected: boolean;

  instagramPage: string;
  youtubeHandle: string;
  twitterHandle: string;
  about: string;

  titlesWon: {
    title: string;
    year: string;
    venue: string;
    positon: string;
  }[];

  relatedContent: {
    imageUrl: string;
    title: string;
    youtubeLink: string;
  }[];

  imageUrlGallery: {
    image: string;
    text: string;
  }[];

  Continent: string | null;
  createdAt?: string;
}

export default function AddAthlete() {
  const [formData, setFormData] = useState<AthleteFormData>({
    fullName: "",
    firstName: "",
    lastName: "",
    shortAddress: "",
    gender: "MALE",
    age: "",
    height: "",
    playerlogoimage: "",
    playerid: "",
    imageUrl: "",

    ratings: {
      singles: "NR",
      singlesVerified: "NR",
      singlesProvisional: false,
      singlesReliabilityScore: 0,
      doubles: "NR",
      doublesVerified: "NR",
      doublesProvisional: false,
      doublesReliabilityScore: 0,
      defaultRating: "DOUBLES",
      provisionalRatings: {
        singlesRating: null,
        doublesRating: null,
        coach: null,
      },
    },

    enablePrivacy: false,
    isPlayer1: false,
    verifiedEmail: false,
    registered: false,

    duprId: "",

    showRatingBanner: false,
    status: "",

    sponsor: {},
    sponsors: [{ name: "", imageUrl: "" }],

    lucraConnected: false,

    instagramPage: "",
    youtubeHandle: "",
    twitterHandle: "",
    about: "",

    titlesWon: [{ title: "", year: "", positon: "", venue: "" }],
    relatedContent: [{ imageUrl: "", title: "", youtubeLink: "" }],
    imageUrlGallery: [{ image: "", text: "" }],

    Continent: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAthlete = async () => {
      let playerId = id;
      console.log("Fetching athlete data for ID:", playerId);
      if (!playerId) {
        const cookieData = Cookies.get("player");
        if (cookieData) {
          try {
            const player = JSON.parse(cookieData);
            playerId = player?.player?.DUPRID;
          } catch (e) {
            console.error("Error parsing cookie data:", e);
          }
        }
      }

      if (!playerId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/playerlogin/${playerId}`
        );

        const athleteData = response.data;
        console.log("Received athlete data:", athleteData);

        // Create default ratings object if not provided
        const defaultRatings: RatingData = {
          singles: "NR",
          singlesVerified: "NR",
          singlesProvisional: false,
          singlesReliabilityScore: 0,
          doubles: "NR",
          doublesVerified: "NR",
          doublesProvisional: false,
          doublesReliabilityScore: 0,
          defaultRating: "DOUBLES",
          provisionalRatings: {
            singlesRating: null,
            doublesRating: null,
            coach: null,
          },
        };

        setFormData({
          id: athleteData.id,
          fullName: athleteData.fullName || "",
          firstName: athleteData.firstName || "",
          lastName: athleteData.lastName || "",
          shortAddress: athleteData.shortAddress || "",
          gender: athleteData.gender || "MALE",
          age: athleteData.age ? athleteData.age.toString() : "",
          height: athleteData.height ? athleteData.height.toString() : "",
          playerlogoimage: athleteData.playerlogoimage || "",
          playerid: athleteData.playerid || "",
          imageUrl: athleteData.imageUrl || "",

          // Handle ratings - merge with defaults if partial data exists
          ratings: athleteData.ratings
            ? { ...defaultRatings, ...athleteData.ratings }
            : defaultRatings,

          enablePrivacy: athleteData.enablePrivacy || false,
          isPlayer1: athleteData.isPlayer1 || false,
          verifiedEmail: athleteData.verifiedEmail || false,
          registered: athleteData.registered || false,

          duprId: athleteData.duprId || "",

          showRatingBanner: athleteData.showRatingBanner || false,
          status: athleteData.status || "",

          sponsor: athleteData.sponsor || {},
          sponsors:
            athleteData.sponsors?.length > 0
              ? athleteData.sponsors.map((sponsor: any) => ({
                  name: sponsor.name || "",
                  imageUrl: sponsor.imageUrl || "",
                }))
              : [{ name: "", imageUrl: "" }],

          lucraConnected: athleteData.lucraConnected || false,

          instagramPage: athleteData.instagramPage || "",
          youtubeHandle: athleteData.youtubeHandle || "",
          twitterHandle: athleteData.twitterHandle || "",
          about: athleteData.about || "",

          titlesWon:
            athleteData.titlesWon?.length > 0
              ? athleteData.titlesWon.map((title: any) => ({
                  title: title.title || "",
                  year: title.year?.toString() || "",
                  positon: title.positon || "",
                  venue: title.venue || "",
                }))
              : [{ title: "", year: "", positon: "", venue: "" }],

          relatedContent:
            athleteData.relatedContent?.length > 0
              ? athleteData.relatedContent.map((content: any) => ({
                  imageUrl: content.imageUrl || "",
                  title: content.title || "",
                  youtubeLink: content.youtubeLink || "",
                }))
              : [{ imageUrl: "", title: "", youtubeLink: "" }],

          imageUrlGallery:
            athleteData.imageUrlGallery?.length > 0
              ? athleteData.imageUrlGallery.map((item: any) => ({
                  image: item.image || item || "",
                  text: item.text || "",
                }))
              : [{ image: "", text: "" }],

          Continent: athleteData.Continent || null,
          createdAt: athleteData.createdAt,
        });
      } catch (err) {
        console.error("Error fetching athlete data:", err);
        setSubmitMessage({
          type: "error",
          message: "Failed to load athlete data. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAthlete();
    
  }, [id]);
  const playerCookie = Cookies.get("player");
  let password = "";
  if (playerCookie) {
    try {
      const parsed = JSON.parse(playerCookie);
      password = parsed.player.password;
      console.log("Extracted password from cookies:", password);
    } catch (err) {
      console.error("Error parsing player cookie:", err);
    }
  }
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.playerid.trim()) errors.playerid = "Player ID is required";
    if (!formData.age) errors.age = "Age is required";
    if (Number(formData.age) < 10) errors.age = "Age must be at least 10";
    if (!formData.gender) errors.gender = "Gender selection is required";
    if (!formData.shortAddress.trim())
      errors.shortAddress = "Address is required";
    if (!formData.height) errors.height = "Height is required";

    // Validate at least one image URL with image field filled
    const validImageUrls = formData.imageUrlGallery.filter((item) =>
      item.image.trim()
    );
    if (validImageUrls.length === 0)
      errors.imageUrlGallery = "At least one image URL is required";

    // Validate individual image entries
    formData.imageUrlGallery.forEach((item, idx) => {
      if (item.image.trim() && !item.text.trim()) {
        errors[`imageUrlGallery_${idx}_text`] =
          "Text description is required when image is provided";
      }
    });

    // Validate sponsors - only if they have data
    formData.sponsors.forEach((sponsor, idx) => {
      if (sponsor.name.trim() || sponsor.imageUrl.trim()) {
        if (!sponsor.name.trim())
          errors[`sponsor_${idx}_name`] = "Sponsor name is required";
        if (!sponsor.imageUrl.trim())
          errors[`sponsor_${idx}_image`] = "Sponsor image URL is required";
      }
    });

    // Validate titles - only if they have data
    formData.titlesWon.forEach((title, idx) => {
      if (
        title.title.trim() ||
        title.year ||
        title.positon.trim() ||
        title.venue.trim()
      ) {
        if (!title.title.trim())
          errors[`title_${idx}_name`] = "Title name is required";
        if (!title.year) errors[`title_${idx}_year`] = "Year is required";
        if (!title.positon.trim())
          errors[`title_${idx}_positon`] = "Position is required";
        if (!title.venue.trim())
          errors[`title_${idx}_venue`] = "Venue is required";
      }
    });

    // Validate related content - only if they have data
    formData.relatedContent.forEach((content, idx) => {
      if (
        content.imageUrl.trim() ||
        content.title.trim() ||
        content.youtubeLink.trim()
      ) {
        if (!content.imageUrl.trim())
          errors[`content_${idx}_image`] = "Content image URL is required";
        if (!content.title.trim())
          errors[`content_${idx}_title`] = "Content title is required";
        if (!content.youtubeLink.trim())
          errors[`content_${idx}_link`] = "YouTube link is required";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      // Check for nested fields using dot notation (e.g., "ratings.singles")
      if (name.includes(".")) {
        const keys = name.split(".");
        setFormData((prev) => {
          const updated = { ...prev };
          let nested: any = updated;

          for (let i = 0; i < keys.length - 1; i++) {
            nested[keys[i]] = { ...nested[keys[i]] }; // clone intermediate objects
            nested = nested[keys[i]];
          }

          nested[keys[keys.length - 1]] = value;
          return updated;
        });
      } else {
        // Normal flat update
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

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

  const handleImageUrlGalleryChange = (
    index: number,
    value: { image: string; text: string }
  ) => {
    const updatedArray = [...formData.imageUrlGallery];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, imageUrlGallery: updatedArray }));

    // Clear error if exists
    if (formErrors.imageUrlGallery) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.imageUrlGallery;
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

  const addImageUrlGallery = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrlGallery: [...prev.imageUrlGallery, { image: "", text: "" }],
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
      return;
    }
    const updatedArray = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const removeImageUrlGallery = (index: number) => {
    if (formData.imageUrlGallery.length <= 1) {
      return;
    }

    const updatedArray = formData.imageUrlGallery.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, imageUrlGallery: updatedArray }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage({ type: "", message: "" });

    try {
      const filteredImageUrls = formData.imageUrlGallery.filter((item) =>
        item.image.trim()
      );

      const filteredSponsors = formData.sponsors.filter(
        (sponsor) => sponsor.name.trim() && sponsor.imageUrl.trim()
      );

      const filteredTitles = formData.titlesWon.filter(
        (title) =>
          title.title.trim() ||
          title.year ||
          title.positon.trim() ||
          title.venue.trim()
      );

      const filteredRelatedContent = formData.relatedContent.filter(
        (content) =>
          content.imageUrl.trim() &&
          content.title.trim() &&
          content.youtubeLink.trim()
      );

      const DUPRID = formData.duprId;

      // Prepare the common data
      let submitData: any = {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        titlesWon: filteredTitles.map((t) => ({
          ...t,
          year: Number(t.year),
        })),
        sponsors: filteredSponsors,
        relatedContent: filteredRelatedContent,
        imageUrlGallery: filteredImageUrls,
      };

      let url = "";

      if (id) {
        // 🔐 Admin is updating
        const adminData = localStorage.getItem("adminData");
        let adminemail = null;
        let adminpassword = null;

        try {
          const parsedData = JSON.parse(adminData);
          if (parsedData?.admin) {
            adminemail = parsedData.admin.email;
            adminpassword = parsedData.admin.password;
          }
        } catch (error) {
          console.error("Failed to parse adminData:", error);
        }

        submitData = {
          ...submitData,
          email: adminemail,
          password: adminpassword,
        };

        url = "http://localhost:5000/admin/update/data";
      } else {
        // 🧑‍ Athlete is updating
        submitData = {
          ...submitData,
          DUPRID,
          password,
        };

        url = "http://localhost:5000/playerlogin/update/data";
      }

      const response = await axios.put(url, { submitData });

      setSubmitMessage({
        type: "success",
        message: `Athlete updated successfully!`,
      });

      console.log("Server response:", response.data);
    } catch (error: any) {
      console.error("Submit error:", error);
      setSubmitMessage({
        type: "error",
        message: `Failed to update athlete. ${
          error?.response?.data?.message || "Please try again."
        }`,
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
          <CardContent className="pt-6">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800">
            {formData.id ? "Edit" : "Add"} Athlete Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {submitMessage.message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitMessage.message}
            </div>
          )}

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
              handleImageUrlChange={handleImageUrlGalleryChange}
              removeImageUrl={removeImageUrlGallery}
              formErrors={formErrors}
              addImageUrl={addImageUrlGallery}
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

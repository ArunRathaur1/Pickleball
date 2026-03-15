const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  singles: { type: String, default: "NR" },
  singlesVerified: { type: String, default: "NR" },
  singlesProvisional: { type: Boolean, default: false },
  singlesReliabilityScore: { type: Number, default: 0 },
  doubles: { type: String, default: "NR" },
  doublesVerified: { type: String, default: "NR" },
  doublesProvisional: { type: Boolean, default: false },
  doublesReliabilityScore: { type: Number, default: 0 },
  defaultRating: { type: String, default: "DOUBLES" },
  provisionalRatings: {
    singlesRating: { type: Number, default: null },
    doublesRating: { type: Number, default: null },
    coach: { type: String, default: null },
  },
});

const rankingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  shortAddress: { type: String, default: "" },
  gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], default: "OTHER" },
  age: { type: Number, default: null },
  height: { type: Number }, // in cm

  playerlogoimage: { type: String },
  playerid: { type: String, unique: true, sparse: true },
  imageUrl: { type: String, default: "" },
  singlerank: { type: Number, default: 0 },
  doublerank: { type: Number, default: 0 },
  ratings: { type: ratingSchema, default: () => ({}) },
  enablePrivacy: { type: Boolean, default: false },
  isPlayer1: { type: Boolean, default: false },
  verifiedEmail: { type: Boolean, default: false },
  registered: { type: Boolean, default: false },
  duprId: { type: String, required: true, unique: true },

  showRatingBanner: { type: Boolean, default: false },
  status: { type: String, default: "False" }, // Can be boolean or enum as needed
  sponsor: { type: mongoose.Schema.Types.Mixed, default: {} },
  sponsors: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  lucraConnected: { type: Boolean, default: false },

  instagramPage: { type: String },
  youtubeHandle: { type: String },
  twitterHandle: { type: String },
  about: { type: String, trim: true },

  titlesWon: [
    {
      title: { type: String, required: true },
      year: { type: Number, required: true },
      venue: { type: String, required: true },
      positon: { type: String, required: true },
    },
  ],
  relatedContent: [
    {
      imageUrl: { type: String, required: true },
      title: { type: String, required: true },
      youtubeLink: { type: String, required: true },
    },
  ],
  imageUrlGallery: [
    {
      image: { type: String },
      text: { type: String },
    },
  ],

  Continent: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ranking", rankingSchema);

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
  imageUrl: { type: String, default: "" },
  ratings: { type: ratingSchema, default: () => ({}) },
  enablePrivacy: { type: Boolean, default: false },
  isPlayer1: { type: Boolean, default: false },
  verifiedEmail: { type: Boolean, default: false },
  registered: { type: Boolean, default: false },
  duprId: { type: String, required: true, unique: true },
  showRatingBanner: { type: Boolean, default: false },
  status: { type: String, default: "INACTIVE" },
  sponsor: { type: mongoose.Schema.Types.Mixed, default: {} },
  lucraConnected: { type: Boolean, default: false },
  Continent: { type: String, default: null }, // Added for your logic
});

module.exports = mongoose.model("Ranking", rankingSchema);

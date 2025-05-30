const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  maxPlayer: {
    type: Number,
  },
  gender: {
    type: String,
  },
  fee: {
    type: Number,
  },
});

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
  },
  format: {
    type: String,
  },
  registrationEnd: {
    type: Date,
  },
  categories: [categorySchema],
  prizeMoney: {
    type: Number,
    required: true,
  },
  tier: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locationCoords: {
    type: [Number],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message: "Location must be an array with exactly 2 elements [latitude, longitude]",
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  brandId: {
    type: String, // Refers to the model defined by playerLoginSchema
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tournamentSchema.index({ name: "text", description: "text", location: "text" });

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;

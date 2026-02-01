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
  
    trim: true,
  },
  organizer: {
    type: String,
  
  },
  location: {
    type: String,
  
  },
  city: {
    type: String,
  
  },
  state: {
    type: String,
  
  },
  country: {
    type: String,
  
  },
  continent: {
    type: String,
  
  },
  registrationLink: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  emailId: {
    type: String,
  
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
  
  },
  tier: {
    type: Number,
  
  },
  startDate: {
    type: Date,
  
  },
  endDate: {
    type: Date,
  
  },
  imageUrl: {
    type: String,
  
  },
  description: {
    type: String,
  
  },
  locationCoords: {
    type: [Number],
  
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
  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tournamentSchema.index({ name: "text", description: "text", location: "text" });

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;

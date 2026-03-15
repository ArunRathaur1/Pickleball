const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  playerlogoimage: {
    type: String,
  },
  playerid: {
    type: String,
    unique: true,
  },
  identifier: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    min: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  height: {
    type: Number, // Height in cm
    required: true,
  },
  status:{
    type: Boolean,
    default:false,
    required:true
  },
  DUPRIDSINGLES: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: [/^[A-Z0-9]{6,12}$/, "DUPRID must be a combination of letters and numbers (6-12 characters)."],
  },
  DUPRIDDOUBLES: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: [/^[A-Z0-9]{6,12}$/, "DUPRID must be a combination of letters and numbers (6-12 characters)."],
  },
  sponsors: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  instagramPage: {
    type: String,
    // match: [/^https:\/\/www\.instagram\.com\/[A-Za-z0-9_.]+\/?$/, "Invalid Instagram URL format"],
  },
  youtubeHandle: {
    type: String,
    // match: [/^https:\/\/(www\.)?youtube\.com\/(c|channel|@)[A-Za-z0-9_-]+\/?$/, "Invalid YouTube handle URL"],
  },
  twitterHandle: {
    type: String,
    // match: [/^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/, "Invalid Twitter handle URL"],
  },
  about: {
    type: String,
    trim: true,
  },
  titlesWon: [
    {
      title: { type: String, required: true },
      year: { type: Number, required: true },
      venue:{type:String,required:true},
      positon:{type:String,required:true},
    },
  ],
  relatedContent: [
    {
      imageUrl: { type: String, required: true },
      title: { type: String, required: true },
      youtubeLink: {
        type: String,
        required: true,
        // match: [/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/, "Invalid YouTube URL format"],
      },
    },
  ],
  imageUrl: [
    {
      image: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;

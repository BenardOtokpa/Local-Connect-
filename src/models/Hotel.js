import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    hotelName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },

    locationText: {
      type: String,
      required: true,
      trim: true,
    },

    peakDays: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      default: [],
    },

    category: {
      type: String,
      enum: [
        "Restaurant / Cafe",
        "Tours & Experiences",
        "Shopping & Artisan",
        "Wellness & Beauty",
        "Transport & Convenience",
        "Others",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);

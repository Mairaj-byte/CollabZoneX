import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true
    },
    username: String,
    bio: String,
    niche: String,

    profileImage: {
      type: String 
    },

    socialLinks: {
      instagram: String,
      youtube: String
    },
    followersCount: Number,
    engagementRate: Number,
    location: String,
    pricePerPost: Number
  },
  { timestamps: true }
);

export default mongoose.model("Creator", profileSchema);

import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    brandName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    logo: {
      type: String, 
    },

    budgetRange: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);

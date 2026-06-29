import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    totalBudget: {
      type: Number,
      required: true,
    },

    advanceAmount: {
      type: Number,
      required: true,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "requested",         
        "accepted",         
        "rejected",         
        "advance_pending",  
        "advance_paid",     
        "completed"
      ],
      default: "requested",
    },

    paymentId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Payment"
      },

    chatUnlocked: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
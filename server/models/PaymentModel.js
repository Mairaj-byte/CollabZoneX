import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    totalAmount: {
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

    advancePaid: {
      type: Boolean,
      default: false,
    },

    finalPaid: {
      type: Boolean,
      default: false,
    },

    commissionAmount: Number,
    creatorAmount: Number,

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "advance_paid",
        "final_paid",
        "completed"
      ],
      default: "pending",
    },

    transactions: [
      {
        type: {
          type: String,
          enum: ["advance", "final"],
        },
        amount: Number,
        paymentId: String,
        status: String,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
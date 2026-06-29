import { razorpay } from "../config/razorpay.js";
import Payment from "../models/PaymentModel.js";
import crypto from "crypto";
import Campaign from "../models/CampaignModel.js";

export const createAdvanceOrder = async (req, res) => {
  try {
    const { campaignId, amount } = req.body;

    if (!campaignId || !amount) {
      return res.status(400).json({
        success: false,
        message: "campaignId and amount are required",
      });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `adv_${campaignId}`,
    };

    const order = await razorpay.orders.create(options);

    

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};





export const verifyAdvancePayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaignId,
      amount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await Payment.findOneAndUpdate(
      { campaignId },
      {
        campaignId,
        advancePaid: true,
        paymentStatus: "advance_paid",
        $push: {
          transactions: {
            type: "advance",
            amount,
            paymentId: razorpay_payment_id,
            status: "success",
            paidAt: new Date(),
          },
        },
      },
      { new: true, upsert: true }
    );


    await Campaign.findByIdAndUpdate(campaignId, {
      status: "advance_paid",
      paymentId: payment._id,
      chatUnlocked: true, // optional
    });

    res.json({ success: true, payment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFinalOrder = async (req, res) => {
  try {
    const { campaignId, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `final_${campaignId}`,
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyFinalPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaignId,
      totalAmount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const commission = totalAmount * 0.1;

    const payment = await Payment.findOneAndUpdate(
      { campaignId },
      {
        finalPaid: true,
        paymentStatus: "completed",
        commissionAmount: commission,
        creatorAmount: totalAmount - commission,
        $push: {
          transactions: {
            type: "final",
            amount: totalAmount,
            paymentId: razorpay_payment_id,
            status: "success",
            paidAt: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
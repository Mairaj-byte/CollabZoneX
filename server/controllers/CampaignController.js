import Campaign from "../models/CampaignModel.js";


export const createCampaign = async (req, res) => {
  try {
    const {
      influencerId,
      title,
      description,
      platform,
      totalBudget,
      advanceAmount,
      finalAmount,
    } = req.body;

    // Basic validation
    if (!influencerId || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const campaign = await Campaign.create({
      brandId: req.user.id, // ✅ Corrected
      influencerId,
      title,
      description,
      platform,
      totalBudget,
      advanceAmount,
      finalAmount,
    });

    

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCreatorCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      influencerId: req.params.id,
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrandCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      brandId: req.params.id,
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const updateCampaignStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "requested",
      "accepted",
      "rejected",
      "advance_pending",
      "advance_paid",
      "completed"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    campaign.status = status;

    // Auto unlock chat after advance payment
    if (status === "advance_paid") {
      campaign.advancePaid = true;
      campaign.chatUnlocked = true;
    }

    await campaign.save();

    res.status(200).json({
      message: "Campaign status updated successfully",
      campaign,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
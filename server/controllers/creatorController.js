import Creator from "../models/CreatorModel.js";


export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      username,
      bio,
      niche,
      location,
      instagram,
      youtube,
      followersCount,
      engagementRate,
      pricePerPost,
    } = req.body;

    let profile = await Creator.findOne({ userId });

    // Handle Image
    let imageUrl = profile?.profileImage || "";

    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const profileData = {
      userId,
      username,
      bio,
      niche,
      location,
      profileImage: imageUrl,
      socialLinks: {
        instagram,
        youtube,
      },
      followersCount: Number(followersCount),
      engagementRate: Number(engagementRate),
      pricePerPost: Number(pricePerPost),
    };

    if (profile) {
      profile = await Creator.findOneAndUpdate(
        { userId },
        profileData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated",
        profile,
      });
    }

    profile = await Creator.create(profileData);

    res.status(201).json({
      success: true,
      message: "Profile created",
      profile,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




export const getMyProfile = async (req, res) => {
  try {
    // 🔹 ADDED .populate() HERE
    const profile = await Creator.findOne({ userId: req.user.id }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// function for list product
export const listProfiles = async (req, res) => {
    try {
        
        const profiles = await Creator.find({});
        res.json({success:true, profiles })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// export const singleProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const profile = await Creator.findById(userId);

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     res.json({ success: true, profile });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




export const getCreatorProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Creator.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Creator profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("Error fetching creator profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
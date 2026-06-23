import Brand from "../models/brandModel.js";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
      error: error.message,
    });
  }
};

export const getOneBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch brand",
      error: error.message,
    });
  }
};


export const getMyBrandProfile = async (req, res) => {
  try {
    const brand = await Brand.findOne({ userId: req.user.id }).populate("userId", "name email");

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    console.error("GET BRAND ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { brandName, industry, website, budgetRange } = req.body;

    const logo = req.file ? req.file.path : null;

    let brand = await Brand.findOne({ userId: req.user.id });

    if (brand) {
      brand.brandName = brandName || brand.brandName;
      brand.industry = industry || brand.industry;
      brand.website = website || brand.website;
      brand.budgetRange = budgetRange || brand.budgetRange;

      if (logo) {
        brand.logo = logo;
      }

      await brand.save();

      return res.status(200).json({
        success: true,
        message: "Brand profile updated successfully",
        data: brand,
      });
    }

    brand = await Brand.create({
      userId: req.user.id,
      brandName,
      industry,
      website,
      budgetRange,
      logo,
    });

    res.status(201).json({
      success: true,
      message: "Brand profile created successfully",
      data: brand,
    });

  } catch (error) {
    console.error("CREATE/UPDATE BRAND ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

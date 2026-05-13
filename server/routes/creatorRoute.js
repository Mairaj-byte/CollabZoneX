import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  listProfiles,
  getCreatorProfileByUserId,
} from "../controllers/creatorController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import Creator from "../models/CreatorModel.js";
const creatorRouter = express.Router();
creatorRouter.post( "/",
  authMiddleware,
  upload.single("profileImage"),
  createOrUpdateProfile
);
creatorRouter.get("/me",authMiddleware , getMyProfile);
creatorRouter.get("/list", listProfiles);
creatorRouter.get("/:userId", getCreatorProfileByUserId);
export default creatorRouter;

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import brandRouter from "./routes/brandRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import campaignRouter from "./routes/campaignRoute.js";
import collaborationRouter from "./routes/collaborationRoute.js";
import creatorRouter from "./routes/creatorRoute.js";
import { resetPassword, sendResetOtp } from './controllers/PasswordReset.js'

const app = express();
const port = process.env.PORT || 4000;

// Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/creator", creatorRouter);
app.use("/api/brand", brandRouter);

app.use("/api/campaign", campaignRouter);
app.use("/api/collaboration", collaborationRouter);
app.use("/api/payment", paymentRouter);

app.post('/api/send-reset-otp', sendResetOtp);
app.post('/api/reset-password', resetPassword);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});

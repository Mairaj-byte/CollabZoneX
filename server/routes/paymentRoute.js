import express from "express";
import {
  createAdvanceOrder,
  verifyAdvancePayment,
  createFinalOrder,
  verifyFinalPayment,
} from "../controllers/PaymentController.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/advance/order", createAdvanceOrder);
PaymentRouter.post("/advance/verify", verifyAdvancePayment);

PaymentRouter.post("/final/order", createFinalOrder);
PaymentRouter.post("/final/verify", verifyFinalPayment);

export default PaymentRouter;
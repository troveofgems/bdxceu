import express from "express";
import {
  handleFetchPaypalClientId,
  handlePayWithStripe,
} from "../../controllers/payment.method.controller.js";

const paymentMethodRouter = express.Router();

// Paypal
paymentMethodRouter.route("/config/paypal").get(handleFetchPaypalClientId);

// Stripe
paymentMethodRouter
  .route("/stripe/create-checkout-session")
  .post(handlePayWithStripe);

export default paymentMethodRouter;

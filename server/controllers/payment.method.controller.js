import Stripe from "stripe";

import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";

export const handleFetchPaypalClientId = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/payment-method/config/paypal");

  apiResponse.success = true;

  // Return Data
  apiResponse.data = {
    client_id: process.env.PAYPAL_CLIENT_ID,
  };

  return res.status(200).json(apiResponse);
};

export const handlePayWithStripe = async (req, res, next) => {
  const YOUR_DOMAIN = "http://localhost:3000";

  const stripe = new Stripe(process.env.STRIPE_SK, {
    apiVersion: "2020-08-27",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1QP4SeCXhULtBQvaEdmleWP9",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  return res.redirect(303, session.url);
};

/*export const handlePaypalRefundRequest = async(req, res, next) => {

}

export const handleStripeRefundRequest = async(req, res, next) => {

}*/

import express from "express";
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  handleForgotPassword,
  handleChangePassword,
} from "../../controllers/auth.controller.js";

import {
  validateChangePasswordData,
  validateForgotPasswordData,
  validateLoginData,
  validateSignupData,
} from "../../validators/auth/auth.validators.js";

import { asyncWrapper } from "../../libs/dev/async.wrapper.utils.js";
import { passThroughToken } from "../../middleware/jwt.route.auth.middleware.js";

const authRouter = express.Router();

// Registration
authRouter
  .route("/sign-up")
  .post(validateSignupData, asyncWrapper(handleRegistration));

// Login
authRouter.route("/sign-in").post(validateLoginData, handleLogin);

// Logout
authRouter.route("/sign-out").post(passThroughToken, handleLogout);

// Forgot Password
authRouter
  .route("/forgot-password")
  .post(validateForgotPasswordData, handleForgotPassword);

// Change Password
authRouter
  .route("/change-password/:resetToken")
  .put(validateChangePasswordData, handleChangePassword);

export default authRouter;

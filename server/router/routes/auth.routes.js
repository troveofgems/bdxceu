import express from "express";
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  handleForgotPassword,
  handleChangePassword,
  handleGoogleOAuth,
} from "../../controllers/auth.controller.js";

import {
  validateChangePasswordData,
  validateForgotPasswordData,
  validateLoginData,
  validateSignupData,
} from "../../validators/auth/auth.validators.js";

import { asyncWrapper } from "../../libs/dev/async.wrapper.utils.js";

const authRouter = express.Router();

// Create User
authRouter
  .route("/sign-up")
  .post(validateSignupData, asyncWrapper(handleRegistration));

// Login
authRouter.route("/sign-in").post(validateLoginData, asyncWrapper(handleLogin));

// Logout
authRouter.route("/sign-out").post(handleLogout);

// Forgot Password
authRouter
  .route("/forgot-password")
  .get(validateForgotPasswordData, handleForgotPassword);

// Change Password
authRouter
  .route("/change-password/:resetToken")
  .post(validateChangePasswordData, handleChangePassword);

// Google OAuth
/*authRouter
    .route("/oauth-google")
    .post(oAuthWithGoogle);*/

export default authRouter;

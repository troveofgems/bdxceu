import User from "../db/models/User.model.js";
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import { matchedData } from "express-validator";
import { sendEmail } from "../libs/thirdParty/email-mailtrap/send.email.routine.js";
import * as crypto from "node:crypto";

export const handleRegistration = async (req, res, next) => {
  let user = null,
    apiResponse = buildAPIBodyResponse("/auth/sign-up"),
    registrationData = matchedData(req);

  // Create User
  await User.create(registrationData, null); // Create The User

  // Fetch Newly Created User
  user = await User.where("email", registrationData.email)
    .select("firstName lastName email createdAt")
    .findOne();

  registrationData.today = formatDate();
  registrationData.year = new Date().getFullYear();

  apiResponse.success = true;
  apiResponse.data = user;

  // Send Registration Email
  await sendEmail("register", registrationData);

  return res.status(201).json(apiResponse);
};

export const handleLogin = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/auth/sign-in"),
    loginData = matchedData(req),
    user = await User.where("email", loginData.email) // Search & Return User Data
      .findOne();

  if (!user) {
    apiResponse.success = true;
    apiResponse.error = "Invalid Credentials";
    return res.status(400).json(apiResponse);
  }

  let userSuccessfullyVerified = await user.verifyCredentials(
    loginData.password,
  );

  if (!userSuccessfullyVerified || user.accountIsLocked) {
    if (user.loginAttempts === 3 || user.accountIsLocked) {
      if (!user.accountIsLocked) {
        await User.findByIdAndUpdate(
          { _id: user._id },
          {
            accountIsLocked: true,
          },
          { upsert: true },
        );
        user.today = formatDate();
        user.year = new Date().getFullYear();
        await sendEmail("lockout", user);
      }

      user.today = formatDate();
      user.year = new Date().getFullYear();
      await sendEmail("lockout", user);

      apiResponse.success = true;
      apiResponse.error =
        "Your Account Has Been Locked. Please Contact Support For Assistance.";

      return res.status(403).json(apiResponse);
    } else {
      if (user.loginAttempts <= 3) {
        await User.findByIdAndUpdate(
          { _id: user._id },
          {
            loginAttempts: user.loginAttempts + 1,
          },
          { upsert: true },
        );
      }
      let attemptCountsLeft = 3 - user.loginAttempts;
      apiResponse.success = true;
      apiResponse.error = `Invalid Credentials. ${attemptCountsLeft} ${attemptCountsLeft === 1 ? "Try" : "Tries"} Left.`;
      return res.status(401).json(apiResponse);
    }
  } else {
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        loginAttempts: 0,
        lastLoggedIn: Date.now(),
      },
      { upsert: true },
    );
  }

  apiResponse.success = true;

  // Create JWT For User
  res.cookie(process.env.JWT_COOKIE_NAME, await user.getSignedJwt(), {
    maxAge: 900000,
    httpOnly: true,
  });

  // Return Data
  apiResponse.data = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    authLevel: user.authLevel,
  };

  return res.status(200).json(apiResponse);
};

export const handleLogout = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/auth/logout");
  res.clearCookie(process.env.JWT_COOKIE_NAME, {
    domain: process.env.JWT_DOMAIN,
    path: process.env.JWT_PATH,
  });

  apiResponse.success = true;

  return res.status(200).json(apiResponse);
};

export const handleForgotPassword = async (req, res, next) => {
  const userData = matchedData(req),
    apiResponse = buildAPIBodyResponse("/auth/forgot-password"),
    user = await User.where("email", userData.email).findOne();

  if (!user) {
    apiResponse.success = true;
    apiResponse.data = {
      message:
        "Password Reset Successfully Requested. If the email address exists, you should see an email within the next 10 minutes. Remember to check your spam and junk folders!",
    };
    return res.status(200).json(apiResponse);
  }

  // Get Reset Token
  const resetToken = await user.getResetPasswordToken(user);

  console.log("Constructed Reset Token: ", resetToken);

  let dtp = {
    firstName: user.firstName,
    resetUrl_backend: `${req.protocol}://${req.get("host")}/api/v0.0.0-alpha/auth/change-password/${resetToken}`,
    resetUrl_frontend: `https://www.bdxceu.com/auth/change-password/${resetToken}`,
    email: user.email,
  };

  dtp.today = formatDate();
  dtp.year = new Date().getFullYear();

  await sendEmail("passwordReset", dtp);

  apiResponse.success = true;
  apiResponse.data = dtp;

  return res.status(200).json(apiResponse);
};

export const handleChangePassword = async (req, res, next) => {
  const userData = matchedData(req),
    apiResponse = buildAPIBodyResponse("/auth/change-password/:resetToken");

  const user = await User.findOne({
    resetPasswordToken: req.params.resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next();
  }

  // Set New Password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  user.today = formatDate();
  user.year = new Date().getFullYear();

  await sendEmail("accountUpdate", user);

  apiResponse.success = true;
  apiResponse.data = user;

  return res.status(200).json(apiResponse);
};

export const handleGoogleOAuth = async (req, res, next) => {};

function formatDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentTS = new Date(),
    formattedDate = currentTS.toLocaleString("en-US", options);

  // Extract month abbreviation and day
  const [dayName, day] = formattedDate.split(", ");

  // Function to add ordinal suffix
  function addOrdinalSuffix() {
    const suffixes = ["st", "nd", "rd", "th"];
    const lastDigit = currentTS.getDate() % 10;

    if (lastDigit < 5) {
      return suffixes[lastDigit - 1];
    } else if (lastDigit === 0 || lastDigit >= 5) {
      return suffixes[3];
    }
  }

  // Combine month abbreviation, formatted day, and "ND"
  console.log("Returning: ", `${dayName} ${day}${addOrdinalSuffix()}`);
  return `${dayName} ${day}${addOrdinalSuffix()}`;
}

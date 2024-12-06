import jwt from "jsonwebtoken";
import User from "../db/models/User.model.js";
import { ErrorResponse } from "./Error/error.class.js";

const GENERIC_AUTH_ERROR_MESSAGE = "Invalid Auth Token Provided.";

// Student Level Authorizer
export const level1Protection = async (req, res, next) => {
  let loggedInUser = await validateUserToken(req, res, next);
  console.log("Is user logged in? ", loggedInUser);
  return next();
};

// Admin Level Authorizer
export const level2Protection = async (req, res, next) => {
  await validateUserToken(req, res, next);
  if (req.user && req.user.authType === "admin") {
    next();
  } else {
    if (!req.user) {
    } else if (!!req.user) {
      return next(
        new ErrorResponse(
          null,
          401,
          "Forbidden: You are not an Administrator. This attempt has been logged. " +
            "If you attempt this again your account will be locked. If you should be an Administrator, please" +
            " contact SportsAcademy/BDXCEU Support.",
        ),
      );
    }
  }
};

// Auditor Level Authorizer
export const level3Protection = async (req, res, next) => {
  if (req.user && req.user.authType === "auditor") {
    next();
  } else {
    return next(
      new ErrorResponse(
        null,
        401,
        "Forbidden: You are not an Auditor. This attempt has been logged. " +
          "If you attempt this again your account will be locked. If you should be an Auditor, please" +
          " contact SportsAcademy/BDXCEU Support.",
      ),
    );
  }
};

// Token Pass-through Authorizer
export const passThroughToken = async (req, res, next) => {
  const token = req.cookies[`${process.env.APP_AUTH_COOKIE_NAME}`];

  if (token === undefined) return next();

  await validateUserToken(req, res, next);
  return next();
};

// Helpers
export const setUserType = (authLevel) => {
  let authType = null;
  switch (authLevel) {
    case 100:
      authType = "admin";
      break;
    case 500:
      authType = "team-member";
      break;
    case 750:
      authType = "auditor";
      break;
    case 1500:
      authType = "student";
      break;
    default:
      authType = "unknown";
      break;
  }
  return authType;
};
const validateUserToken = async (req, res, next) => {
  const token = req.cookies[`${process.env.APP_AUTH_COOKIE_NAME}`];

  if (token === undefined)
    return next(
      new ErrorResponse(
        GENERIC_AUTH_ERROR_MESSAGE,
        401,
        GENERIC_AUTH_ERROR_MESSAGE,
      ),
    );

  const decodedToken = jwt.verify(token, process.env.APP_AUTH_TOKEN_KEY);

  if (!decodedToken)
    return next(new ErrorResponse(GENERIC_AUTH_ERROR_MESSAGE, 401));

  let userFound = await User.findById(decodedToken.id, null, null).select(
    "-password",
  );

  // No User Found
  if (!userFound)
    return next(new ErrorResponse(GENERIC_AUTH_ERROR_MESSAGE, 400));

  req.user = {
    id: userFound._id,
    fullName: `${userFound.firstName} ${userFound.lastName}`,
    email: userFound.email,
    authType: setUserType(userFound.authLevel),
  };

  return req;
};

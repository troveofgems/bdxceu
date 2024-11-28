import { v4 as uuidv4 } from "uuid";
import { discoverObject, logTheError } from "./probe.middleware.js";

//  NOT FOUND HANDLER
/////////////////////
export const notFound = (req, res, next) => {
  let error = { message: `Not Found: ${req.originalUrl}` };

  return res.status(404).json({
    success: false,
    error,
    errorMessage: error.message || "Server Error",
  });
};

//  SERVER ERROR HANDLER
////////////////////////
export const errorHandler = (err, req, res, next) => {
  let error = {};
  if (process.env.NODE_ENV === "dev") {
    console.error(err);
  }

  const { overrideErrorFromServer } = err;
  if (overrideErrorFromServer) {
    // Override All Errors From The Server To The Front End.
    const { overrideFrom, overrideMessage, statusCode } = err;

    error = { statusCode };

    if (overrideFrom === "login") {
      // Security Point - Prevent Server Probes: Failed Logins get generic error messages.
      error = {
        ...error,
        emitErrorFrom: overrideFrom,
        message: overrideMessage,
      };
    }
  } else if (err.name === "MongoServerError") {
    switch (err.code) {
      case 11000:
        if (err.keyPattern["email"]) {
          let message =
            `The email address you've attempted to register with is taken: [${err.keyValue.email}].` +
            "\nIf you've forgotten your password, please reset it";
          error = {
            statusCode: 400,
            message,
          };
        }
        break;
      default:
        return "Some Yet Uncatered-To Mongo Error.";
    }
  } else if (err.statusCode === 401) {
    // Any 401s should just reflect the server response message and status.
    console.log("Inside the 401...", error, err.stack);
    error = { ...err, ...error };
  } else {
    let logId = uuidv4();
    logId = logId.split("-")[4];
    discoverObject(err);
    logTheError(err, "", null, 4, logId);
    error = {
      message: `Server Error - Contact Support And Reference the Log Id: ${logId}`,
      statusCode: err.statusCode,
    };
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error,
    errorMessage: error.message || "Server Error",
  });
};

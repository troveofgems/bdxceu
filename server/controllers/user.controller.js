// User Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import { matchedData } from "express-validator";
import User from "../db/models/User.model.js";
import Team from "../db/models/Team.model.js";
import Product from "../db/models/Product.model.js";
import mongoose from "mongoose";

export const handleFetchUserProfile = async (req, res, next) => {
  console.log("Inside Fetch User Profile...", req.user, req.cookies);
  let isAdminOrTeamMember =
      req.user.authType === "admin" || req.user.authType === "teamMember",
    apiResponse = buildAPIBodyResponse("/user/profile"),
    user = await User.findById(req.user.id).populate(
      "subscribedModules.product",
      "courseTitle",
      "Product",
    );

  console.log(isAdminOrTeamMember, user);

  if (!user) {
    apiResponse.success = true;
    apiResponse.error = "User Profile Not Found";
    return res.status(400).json(apiResponse);
  }

  // Return Data
  apiResponse.data = {
    _id: user._id,
    firstName: user.firstName,
    middleInitial: user.middleInitial,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    subscribedModules: user.subscribedModules,
    authLevel: setReadOnlyAuthLevel(user.authLevel),
  };

  // Provide Team Members and Admins With A Full List of Products Regardless if they're signed up or not.
  if (isAdminOrTeamMember) {
    apiResponse.data.subscribedModules = await Product.aggregate(
      [
        {
          $project: {
            product: "$_id",
            courseTitle: "$courseTitle",
          },
        },
      ],
      null,
    );
    console.log("Api Response: ", apiResponse.data.subscribedModules);
  }

  apiResponse.success = true;
  return res.status(200).json(apiResponse);
};

export const handleUpdateUserProfile = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/user/profile");

  console.log("Inside Update User Profile: ", req.params, req.body, req.user);

  let filterByUserAccountId = {
    _id: new mongoose.Types.ObjectId(req.user.id),
  };

  try {
    let userAccountUpdated = await User.findOneAndUpdate(
      filterByUserAccountId,
      req.body,
      null,
    );

    apiResponse.success = true;
    apiResponse.data = {
      userAccountUpdated: true,
    };
  } catch (err) {
    apiResponse.error = err.errorResponse.errmsg;
    apiResponse.success = false;
    return res.status(400).json(apiResponse);
  }

  return res.status(200).json(apiResponse);
};

export const handleUpdateUserById = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/users/:userId/edit"),
    filterByUserAccountId = {
      _id: new mongoose.Types.ObjectId(req.params.userId),
    };

  console.log("Make updates for: ", req.params, req.body);

  try {
    let userAccountUpdated = await User.findOneAndUpdate(
      filterByUserAccountId,
      req.body,
      null,
    );

    apiResponse.success = true;
    apiResponse.data = {
      userAccountUpdated: true,
    };
  } catch (err) {
    apiResponse.error = err.errorResponse.errmsg;
    apiResponse.success = false;
    return res.status(400).json(apiResponse);
  }

  return res.status(200).json(apiResponse);
};

export const handleFetchAllUsers = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/users"),
    userList = await User.find(),
    teamList = await Team.find();

  console.log("User List? ", userList);

  if (!userList) {
    apiResponse.success = true;
    apiResponse.error = "No Users Found";
    return res.status(400).json(apiResponse);
  }

  apiResponse.success = true;

  // Return Data
  apiResponse.data = {
    adminList: userList.filter((user) => user.authLevel === 100),
    teamList,
    studentList: userList.filter((user) => user.authLevel === 1500),
  };

  return res.status(200).json(apiResponse);
};

export const handleFetchUserById = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/users"),
    user = await User.findById(
      new mongoose.Types.ObjectId(req.params.userId),
      {
        password: 0,
      },
      null,
    ).populate("subscribedModules.product", "courseTitle createdAt", "Product");

  console.log("User? ", user);

  if (!user) {
    apiResponse.success = true;
    apiResponse.error = "No User Found";
    return res.status(400).json(apiResponse);
  }

  apiResponse.success = true;

  // Return Data
  apiResponse.data = user;

  return res.status(200).json(apiResponse);
};

export const handleDeleteUser = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/users/:userId");

  // Delete User
  await User.findByIdAndDelete(req.params.userId);

  apiResponse.success = true;

  // Return Data
  apiResponse.data = {
    userIdDeleted: req.params.userId,
    completed: true,
  };

  return res.status(200).json(apiResponse);
};

export const handleUpdateAccountLockStatus = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse(
    "/admin/users/:userId/updateAccountLockStatus",
  );

  let unlockForTeamMember = req.body.isTeamMember && req.body.unlockAccount,
    lockForTeamMember = req.body.isTeamMember && !req.body.unlockAccount,
    unlockForUser = !req.body.isTeamMember && req.body.unlockAccount,
    lockForUser = !req.body.isTeamMember && !req.body.unlockAccount,
    filter = null,
    updates = null,
    options = null;
  if (unlockForTeamMember) {
    filter = { email: req.body.email };

    updates = {
      accountIsLocked: false,
      loginAttempts: 0,
    };

    apiResponse.data = {
      accountUnlocked: true,
    };
  } else if (lockForTeamMember) {
    filter = { email: req.body.email };
    updates = {
      accountIsLocked: true,
    };
    apiResponse.data = {
      accountLocked: true,
    };
  } else if (unlockForUser) {
    filter = { _id: new mongoose.Types.ObjectId(req.params.userId) };

    updates = {
      accountIsLocked: false,
      loginAttempts: 0,
    };

    apiResponse.data = {
      accountUnlocked: true,
    };
  } else if (lockForUser) {
    filter = { _id: new mongoose.Types.ObjectId(req.params.userId) };

    updates = {
      accountIsLocked: true,
    };

    apiResponse.data = {
      accountLocked: true,
    };
  }

  let user = await User.findOneAndUpdate(filter, updates, options);

  console.log("User Updated? ", user);

  apiResponse.success = true;

  return res.status(200).json(apiResponse);
};

// Move to Helper Later
const setReadOnlyAuthLevel = (authLevel) => {
  let readonlyAuthLevel = null;

  switch (authLevel) {
    case 100:
      readonlyAuthLevel = "admin";
      break;
    case 500:
      readonlyAuthLevel = "team-member";
      break;
    case 750:
      readonlyAuthLevel = "auditor";
      break;
    case 1500:
      readonlyAuthLevel = "student";
      break;
    default:
      readonlyAuthLevel = "unknown";
  }

  return readonlyAuthLevel;
};

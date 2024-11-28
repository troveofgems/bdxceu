// User Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import { matchedData } from "express-validator";
import Team from "../db/models/Team.model.js";
import User from "../db/models/User.model.js";
import Product from "../db/models/Product.model.js";
import { sendEmail } from "../libs/thirdParty/email-mailtrap/send.email.routine.js";
import { formatDate } from "../libs/dev/printing.utils.js";
import mongoose from "mongoose";

export const handleFetchTeam = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/team"),
    bdxceuTeam = await Team.find({ showOnHomepage: true }, null, null);

  apiResponse.success = true;
  apiResponse.data = bdxceuTeam;

  return res.status(200).json(apiResponse);
};

export const handleFetchTeamForAdmin = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/team"),
    bdxceuTeam = await Team.find({}, null, null);

  apiResponse.success = true;
  apiResponse.data = bdxceuTeam;

  return res.status(200).json(apiResponse);
};

export const handleFetchTeamMemberById = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/team/:teamMemberId"),
    bdxceuTeamMember = await Team.findById(req.params.teamMemberId, null, null);

  // Attach Account Data From User Table
  let userAccount = await User.find(
    { email: bdxceuTeamMember.email },
    "loginAttempts authLevel accountIsLocked subscribedModules _id",
    null,
  );

  apiResponse.success = true;
  apiResponse.data = {
    ...bdxceuTeamMember._doc,
    loginAttempts: userAccount[0].loginAttempts,
    authLevel: userAccount[0].authLevel,
    accountIsLocked: userAccount[0].accountIsLocked,
    subscribedModules: userAccount[0].subscribedModules,
    userId: userAccount[0]._id,
  };

  // Add Taught Classes
  let taughtClasses = await Product.find(
    {
      courseInstructor: bdxceuTeamMember._doc._id,
    },
    "courseTitle _id courseEnrollments",
    null,
  );

  apiResponse.data.taughtCourses = taughtClasses;

  console.log("To Send Back: ", apiResponse);

  return res.status(200).json(apiResponse);
};

export const handleCreateTeamMember = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/team");

  console.log(req.body);

  let newTeamMember = {
    firstName: req.body.firstName,
    middleInitial: req.body.middleInitial,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    certificationList: req.body.certificationList || [],
    showOnHomepage: req.body.showOnHomepage,
  };

  let teamMemberAdded = null,
    randomPassword = null;

  try {
    randomPassword = generateRandomPassword();

    await User.create(
      {
        firstName: req.body.firstName,
        middleInitial: req.body.middleInitial,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: randomPassword,
        authLevel: req.body.roleEscalation === true ? 100 : 500,
      },
      null,
    );

    teamMemberAdded = await Team.create(newTeamMember, null);

    apiResponse.success = true;
    apiResponse.data = teamMemberAdded;
  } catch (err) {
    apiResponse.error = err.errorResponse.errmsg;
    apiResponse.success = false;
    return res.status(400).json(apiResponse);
  }

  // Fetch Newly Created Team Member
  let emailData = {
    year: new Date().getFullYear(),
    today: formatDate(),
    password: randomPassword,
    email: req.body.email,
    firstName: req.body.firstName,
  };

  // Send Registration Email
  await sendEmail("addTeamMember", emailData);

  return res.status(201).json(apiResponse);
};

export const handleUpdateTeamMember = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/team/:teamMemberId/edit");

  console.log("Update Team Member Data: ", req.body, req.params);

  let updatesToTeamMember = {
    ...req.body.teamModelUpdates,
  };

  let updatesToTeamMemberUserAccount = {
    ...req.body.userModelUpdates,
  };

  if (req.body.sharedUpdates.phone === null) {
    delete req.body.sharedUpdates.phone;
    updatesToTeamMember = {
      ...updatesToTeamMember,
      ...req.body.sharedUpdates,
    };
    updatesToTeamMemberUserAccount = {
      ...updatesToTeamMemberUserAccount,
      ...req.body.sharedUpdates,
    };
  } else {
    updatesToTeamMember = {
      ...updatesToTeamMember,
      ...req.body.sharedUpdates,
    };
    updatesToTeamMemberUserAccount = {
      ...updatesToTeamMemberUserAccount,
      ...req.body.sharedUpdates,
    };
  }

  console.log("Push Update to Team Model: ", updatesToTeamMember);
  console.log("Push Update to User Account: ", updatesToTeamMemberUserAccount);

  let filterByTeamMemberId = {
      _id: new mongoose.Types.ObjectId(req.params.teamMemberId),
    },
    filterByTeamMemberUserAccountId = {
      _id: new mongoose.Types.ObjectId(req.body.userProfileId),
    };

  try {
    let teamMemberUpdated = await Team.findOneAndUpdate(
        filterByTeamMemberId,
        updatesToTeamMember,
        null,
      ),
      teamMemberUserAccountUpdated = await User.findOneAndUpdate(
        filterByTeamMemberUserAccountId,
        updatesToTeamMemberUserAccount,
        null,
      );

    apiResponse.success = true;
    apiResponse.data = {
      teamMemberUpdated: true,
      teamMemberUserAccountUpdated: true,
    };
  } catch (err) {
    apiResponse.error = err.errorResponse.errmsg;
    apiResponse.success = false;
    return res.status(400).json(apiResponse);
  }

  return res.status(200).json(apiResponse);
};

export const handleDeleteTeamMember = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/team");

  let teamMemberToDelete = await Team.findById(
    req.params.teamMemberId,
    null,
    null,
  );

  // Delete the associated user account for the team member, then delete the team member
  await User.where("email", teamMemberToDelete.email).findOneAndDelete();
  await Team.findByIdAndDelete(req.params.teamMemberId, null);

  apiResponse.success = true;
  apiResponse.data = null;

  return res.status(200).json(apiResponse);
};

const generateRandomPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!:)";
  let password = "";

  // Generate 13 random characters
  for (let i = 0; i < 13; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

import mongoose from "mongoose";
import {
  encryptPassword,
  getResetPasswordToken,
  getSignedJwt,
  verifyCredentials,
} from "../../libs/dev/schema.utils.js";

const timestamps = {
  timestamps: true,
};

const UserModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleInitial: {
      type: String,
      maxLength: 1,
      required: false,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    awaitingEmailVerification: {
      type: Boolean,
      default: false,
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      maximum: 3,
    },
    accountIsLocked: {
      type: Boolean,
      default: false,
    },
    authLevel: {
      type: Number,
      required: true,
      default: 1500,
    },
    lastLoggedIn: {
      type: Date,
    },
    subscribedModules: {
      type: [String],
      default: [],
    },
    resetPasswordToken: {
      type: String,
      default: null,
      optional: true,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
      optional: true,
    },
  },
  timestamps,
);

UserModel.pre("save", encryptPassword);
UserModel.methods.getSignedJwt = getSignedJwt;
UserModel.methods.verifyCredentials = verifyCredentials;
UserModel.methods.getResetPasswordToken = getResetPasswordToken;

export default mongoose.model("User", UserModel);

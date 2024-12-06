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
    phone: {
      type: String,
      default: null,
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
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          studentRecord: {
            type: {
              courseCompletedAt: { type: Date, default: null },
              courseGrade: { type: String, default: "Exam Not Yet Taken" },
              examAttempts: {
                type: [
                  {
                    examId: {
                      type: String,
                      default: null,
                    },
                    examName: {
                      type: String,
                      default: null,
                    },
                    examGrade: {
                      type: mongoose.Schema.Types.ObjectId,
                      required: false,
                      ref: "AmericanGradeScale",
                    },
                    nrTimesExamTaken: {
                      type: Number,
                      default: 0,
                    },
                    examRef: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Exam",
                      required: false,
                    },
                    attempt: {
                      type: mongoose.Schema.Types.Mixed,
                      default: null,
                    },
                  },
                ],
              },
            },
          },
          createdAt: { type: Date, default: Date.now },
          _id: false,
        },
      ],
      default: [],
    },
    ip: {
      type: String,
      default: "0.0.0.0",
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

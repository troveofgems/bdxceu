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
          createdAt: { type: Date, default: Date.now },
          _id: false,
        },
      ],
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
//UserModel.methods.clearJwt = getClearedJwt;
UserModel.methods.verifyCredentials = verifyCredentials;
UserModel.methods.getResetPasswordToken = getResetPasswordToken;

export default mongoose.model("User", UserModel);

/*
ip: {
    type: String,
    default: null
},
statistics: {
    type: {
        courseCompletedAt: { type: Date, default: null },
        courseGrade: { type: String, default: null },
        examGrades: {
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
                        required: true,
                        ref: "AmericanGradeScale",
                    },
                    examRef: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Exam",
                        required: true,
                    },
                },
            ],
        },
    },
},*/

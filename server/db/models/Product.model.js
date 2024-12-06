import mongoose from "mongoose";
const timestamps = {
  timestamps: true,
};

const ProductModel = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      maxLength: 1000,
      required: true,
    },
    courseCost: {
      type: Number,
      required: true,
    },
    courseIsPublished: {
      type: Boolean,
      default: false,
    },
    courseInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    courseEnrollments: {
      type: Number,
      default: 0,
    },
    coursePassingGrade: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AmericanGradeScale",
    },
    courseCertificateLink: {
      type: String,
      default: "https://www.bdxceu.com/users/certificate",
    },
    courseCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    coursePublishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    courseVideoList: {
      type: [{ name: { type: String, required: true } }],
      default: [],
    },
    courseExamList: {
      type: [
        {
          examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
          },
          name: {
            type: String,
          },
        },
      ],
      default: [],
    },
    courseDiscountCodeList: {
      type: [String],
      default: [],
    },
    courseOfferingsList: {
      type: [{ name: { type: String, required: true } }],
      default: [],
    },
    courseReviewsList: {
      type: [String],
      default: [],
    },
  },
  timestamps,
);

export default mongoose.model("Product", ProductModel);

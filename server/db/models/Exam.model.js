import mongoose from "mongoose";
const timestamps = {
  timestamps: true,
};

const ExamModel = new mongoose.Schema(
  {
    examTitle: {
      type: String,
      maxLength: 500,
      required: true,
    },
    examSynopsis: {
      type: String,
      maxLength: 1000,
      required: true,
    },
    progressBarColor: {
      type: String,
      required: true,
      default: "#9de1f6",
    },
    nrOfQuestions: {
      type: Number,
      required: true,
      default: 0,
    },
    questions: {
      type: [
        {
          question: { type: String, required: true },
          questionType: { type: String, required: true },
          answerSelectionType: { type: String, required: true },
          answers: [
            {
              type: String,
              required: true,
            },
          ],
          correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
          messageForCorrectAnswer: { type: String },
          messageForIncorrectAnswer: { type: String },
          explanation: { type: String },
        },
      ],
      required: true,
      default: [],
    },
    shuffleQuestions: {
      type: Boolean,
      default: false,
    },
    shuffleAnswers: {
      type: Boolean,
      default: false,
    },
    continueAnsweringUntilCorrect: {
      type: Boolean,
      default: true,
    },
    examPassingGrade: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AmericanGradeScale",
    },
    associatedProduct: {
      type: {
        productRef: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "AmericanGradeScale",
        },
        productName: {
          type: String,
        },
        productId: {
          type: String,
        },
      },
    },
  },
  timestamps,
);

export default mongoose.model("Exam", ExamModel);

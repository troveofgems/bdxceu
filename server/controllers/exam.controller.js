// Exam Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
//import { matchedData } from "express-validator";
import Exam from "../db/models/Exam.model.js";
import User from "../db/models/User.model.js";
import Product from "../db/models/Product.model.js";
import mongoose from "mongoose";
import AmericanGradeScale from "../db/models/AmericanGradeScale.model.js";

export const handleFetchExamList = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse(req.originalUrl),
    examList = await Exam.find({}, null, null);

  apiResponse.success = true;
  apiResponse.data = examList;

  return res.status(200).json(apiResponse);
};

export const handleFetchExamById = async (req, res, next) => {
  console.log("Inside handleFetchExamById? ", req.body, req.params);
  let apiResponse = buildAPIBodyResponse(req.originalUrl),
    exam = await Exam.findById(
      new mongoose.Types.ObjectId(req.params.examId),
      null,
      null,
    );

  apiResponse.success = true;
  apiResponse.data = exam;

  return res.status(200).json(apiResponse);
};

export const handleCreateExam = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse(req.originalUrl);

  let product = await Product.find(
    {
      _id: new mongoose.Types.ObjectId(req.body.productLink),
    },
    "courseTitle",
    null,
  );

  let examToCreate = {
    examTitle: req.body.examTitle,
    examSynopsis: req.body.examSynopsis,
    nrOfQuestions: req.body.nrOfQuestions,
    questions: req.body.questions,
    shuffleQuestions: req.body.options.shuffleQuestions,
    shuffleAnswers: req.body.options.shuffleAnswers,
    continueAnsweringUntilCorrect:
      req.body.options.continueAnsweringUntilCorrect,
    associatedProduct: {
      productRef: new mongoose.Types.ObjectId(req.body.productLink),
      productName: product[0].courseTitle,
      productId: req.body.productLink,
    },
    examPassingGrade: new mongoose.Types.ObjectId(req.body.examPassingGrade),
  };

  let examAdded = await Exam.create(examToCreate, null);

  apiResponse.success = true;
  apiResponse.data = examAdded;

  return res.status(201).json(apiResponse);
};

export const handleUpdateExam = async (req, res, next) => {
  console.log("Inside update exam: ", req.body);
  let apiResponse = buildAPIBodyResponse(req.originalUrl);

  let product = await Product.find(
    {
      _id: new mongoose.Types.ObjectId(req.body.productLink),
    },
    "courseTitle courseExamList",
    null,
  );

  console.log("Product: ", product, product[0].courseExamList);

  let updates = {
    examTitle: req.body.examTitle,
    examSynopsis: req.body.examSynopsis,
    nrOfQuestions: req.body.nrOfQuestions,
    questions: req.body.questions,
    shuffleQuestions: req.body.options.shuffleQuestions,
    shuffleAnswers: req.body.options.shuffleAnswers,
    continueAnsweringUntilCorrect:
      req.body.options.continueAnsweringUntilCorrect,
    associatedProduct: {
      productRef: new mongoose.Types.ObjectId(req.body.productLink),
      productName: product[0].courseTitle,
      productId: req.body.productLink,
    },
    examPassingGrade: new mongoose.Types.ObjectId(req.body.examPassingGrade),
  };

  console.log("Update Exam: ", updates);

  let examUpdated = await Exam.findOneAndUpdate(
    { _id: req.params.examId },
    updates,
    null,
  );

  // Exam Updated, But Now We Need to Update the Product's courseExamList Value
  console.log("Update Product Exam List Now...", examUpdated);
  let updatesToCourseExamListForProduct = {
    courseExamList: [
      {
        examId: examUpdated._id,
        name: examUpdated.examTitle,
      },
    ],
  };

  console.log("Updates to push? ", updatesToCourseExamListForProduct);

  let productUpdated = await Product.findOneAndUpdate(
    { _id: req.body.productLink },
    updatesToCourseExamListForProduct,
    null,
  );

  console.log("Product Updated? ", productUpdated);

  apiResponse.success = true;
  apiResponse.data = examUpdated;

  return res.status(200).json(apiResponse);
};

export const handleDeleteExam = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse(req.originalUrl);

  await Exam.findByIdAndDelete(req.params.examId, null);

  apiResponse.success = true;
  apiResponse.data = null;

  return res.status(200).json(apiResponse);
};

export const handleProcessExamResultsForStudent = async (req, res, next) => {
  /*  console.log(
    "Inside handleProcessExamResultsForStudent ",
    req.params,
    req.body,
  );*/
  let apiResponse = buildAPIBodyResponse(req.originalUrl),
    classroom = await Exam.findById(
      req.params.examId,
      "examTitle associatedProduct",
      null,
    ),
    student = await User.findById(
      req.params.studentId,
      "subscribedModules",
      null,
    ),
    calculatedRawScore =
      (req.body.correctPoints / req.body.totalPoints).toFixed(2) * 100,
    scoreFetch = await findGradeScale(calculatedRawScore);

  // Make an update to the subscribed Module
  let subscribedModuleUpdated = student.subscribedModules.map((module) => {
    let moduleFoundForUpdate =
      module.product.toString() ===
      classroom.associatedProduct.productRef.toString();

    if (moduleFoundForUpdate) {
      if (!!module.studentRecord) {
        let examAttempts = [...module.studentRecord.examAttempts],
          latestAttempt = {
            examId: req.params.examId,
            examName: classroom.examTitle,
            examGrade: new mongoose.Types.ObjectId(scoreFetch._id),
            nrTimesExamTaken:
              module.studentRecord.examAttempts[
                module.studentRecord.examAttempts.length - 1
              ].nrTimesExamTaken + 1,
            examRef: new mongoose.Types.ObjectId(req.params.examId),
            attempt: req.body,
          };

        examAttempts.push(latestAttempt);

        return {
          ...module._doc,
          studentRecord: {
            courseCompletedAt: new Date(module.studentRecord.courseCompletedAt),
            courseGrade:
              examAttempts[examAttempts.length - 1].attempt.correctPoints <
              req.body.correctPoints
                ? `${scoreFetch.letterGrade} - ${scoreFetch.description}`
                : module.studentRecord.courseGrade,
            examAttempts: examAttempts,
          },
        };
      } else {
        return {
          ...module._doc,
          studentRecord: {
            courseCompletedAt: new Date(),
            courseGrade: `${scoreFetch.letterGrade} - ${scoreFetch.description}`,
            examAttempts: [
              {
                examId: req.params.examId,
                examName: classroom.examTitle,
                examGrade: new mongoose.Types.ObjectId(scoreFetch._id),
                nrTimesExamTaken: 1,
                examRef: new mongoose.Types.ObjectId(req.params.examId),
                attempt: req.body,
              },
            ],
          },
        };
      }
    }
    return module;
  });

  // Update Student Record
  let updatedStudentRecord = await User.findOneAndUpdate(
    { _id: req.params.studentId },
    { subscribedModules: subscribedModuleUpdated },
    null,
  );

  apiResponse.success = true;
  apiResponse.data = updatedStudentRecord;

  return res.status(200).json(apiResponse);
};

async function findGradeScale(number) {
  const query = {
    "gradeRange.min": { $lte: number },
    "gradeRange.max": { $gte: number },
  };

  try {
    return await AmericanGradeScale.findOne(query, null, null);
  } catch (error) {
    console.error("Error finding grade scale:", error);
    throw error;
  }
}

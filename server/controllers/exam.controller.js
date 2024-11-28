// Exam Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
//import { matchedData } from "express-validator";
import Exam from "../db/models/Exam.model.js";
import Product from "../db/models/Product.model.js";
import mongoose from "mongoose";

export const handleFetchExamList = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/exams"),
    examList = await Exam.find({}, null, null);

  apiResponse.success = true;
  apiResponse.data = examList;

  return res.status(200).json(apiResponse);
};

export const handleFetchExamById = async (req, res, next) => {
  console.log("Inside handleFetchExamById? ", req.body, req.params);
  let apiResponse = buildAPIBodyResponse("/admin/exam"),
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
  console.log("Inside create exam: ", req.body);
  let apiResponse = buildAPIBodyResponse("/admin/exam");

  let product = await Product.find(
    {
      _id: new mongoose.Types.ObjectId(req.body.productLink),
    },
    "courseTitle",
    null,
  );

  console.log("Product: ", product);

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

  console.log("Create Exam: ", examToCreate);

  let examAdded = await Exam.create(examToCreate, null);

  apiResponse.success = true;
  apiResponse.data = examAdded;

  return res.status(201).json(apiResponse);
};

export const handleUpdateExam = async (req, res, next) => {
  console.log("Inside update exam: ", req.body);
  let apiResponse = buildAPIBodyResponse("/admin/exam");

  let product = await Product.find(
    {
      _id: new mongoose.Types.ObjectId(req.body.productLink),
    },
    "courseTitle",
    null,
  );

  console.log("Product: ", product);

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

  apiResponse.success = true;
  apiResponse.data = examUpdated;

  return res.status(200).json(apiResponse);
};

export const handleDeleteExam = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/exam");

  await Exam.findByIdAndDelete(req.params.examId, null);

  apiResponse.success = true;
  apiResponse.data = null;

  return res.status(200).json(apiResponse);
};

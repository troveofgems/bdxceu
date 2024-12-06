import express from "express";

import { asyncWrapper } from "../../libs/dev/async.wrapper.utils.js";
import { level1Protection } from "../../middleware/jwt.route.auth.middleware.js";
import {
  handleFetchExamById,
  handleProcessExamResultsForStudent,
} from "../../controllers/exam.controller.js";

const examRouter = express.Router();

// Fetch Exam By ID
examRouter.route("/:examId").get(asyncWrapper(handleFetchExamById));

// Process Exam Results For Student
examRouter
  .use(level1Protection)
  .route("/:examId/processExamResultsForStudent/:studentId")
  .put(handleProcessExamResultsForStudent);

export default examRouter;

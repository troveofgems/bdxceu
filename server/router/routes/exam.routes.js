import express from "express";

import { asyncWrapper } from "../../libs/dev/async.wrapper.utils.js";
import {
  level1Protection,
  level2Protection,
} from "../../middleware/jwt.route.auth.middleware.js";
import { handleFetchExamById } from "../../controllers/exam.controller.js";

const examRouter = express.Router();

// Fetch Exam By Id
examRouter.route("/:examId").get(asyncWrapper(handleFetchExamById));

export default examRouter;

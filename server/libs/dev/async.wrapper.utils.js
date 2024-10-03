import asyncHandler from "express-async-handler";
import {customAsyncHandler} from "../../middleware/async-handler.middleware.js";

export const asyncWrapper = (fn) => asyncHandler(customAsyncHandler(fn));
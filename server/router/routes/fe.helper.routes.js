import express from "express";
import { handleFetchAmericanGradeScale } from "../../controllers/fe.helper.controller.js";

const feHelperRouter = express.Router();

feHelperRouter.route("/usgs").get(handleFetchAmericanGradeScale);

export default feHelperRouter;
